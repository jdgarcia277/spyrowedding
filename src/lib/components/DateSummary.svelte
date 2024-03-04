<script lang="ts">
    import DashboardIcons from "$lib/items/DashboardIcons.svelte";
    import { onMount } from "svelte";

    //type for database variable
    type date_list = {
    id: number;
    time: string;
    item: string;
    clicked: boolean | undefined;
    }

    //database variables
    let dateList: date_list[] = []

    //database functions
    async function loadDates(): Promise<void> {
        try {
            const response = await fetch('/api/dates')
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            dateList = await response.json();
        } catch (error) {
            console.error('Failed to fetch dates', error);
        }
    }
    async function createDate(newTime: string, newItem: string) {
        try {
            const response = await fetch('/api/dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({time: newTime, item: newItem}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function editDate(dates: date_list) {
        try {
            const response = await fetch(`/api/dates?id=${dates.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'id': dates.id, 'time': dates.time, 'item': dates.item}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    }
    async function deleteDate(dateId: number) {
        try {
            const response = await fetch(`/api/dates?id=${dateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to delete todo', error);
        }
    }
    //ensures database call is made when mounted
    onMount(() => {
        loadDates();
    });

    //html variables
    let displayEditDate: boolean = false;
    let displayAddDate: boolean = false;

    //html functions
    function convertDateFormat(dateStr: string): string {
        const [year, month, day] = dateStr.split("-");
        return `${month}/${day}/${year}`;
    }
    function revertDateFormat(dateStr: string): string {
        const [month, day, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
    }
    function clickEdit(dateItem:date_list): void {
            dateItem['clicked'] = !dateItem.clicked;
            dateList = [...dateList]; //trigger svelte reactivity
    }

</script>

<section>
    <h3 class="font_med">Important Dates:</h3>
    <ul class="font_smallish">
        {#each dateList as dateItem}
            <div class="list_item">
            {#if !dateItem.clicked}
                <li>{dateItem.time}: {dateItem.item}</li>
                {:else if dateItem.clicked}
                    <form on:submit|preventDefault={async (e) => {
                        const formData = new FormData(e.currentTarget);
                        const newTime = formData.get('time');
                        const newItem = formData.get('item');
                        
                        if ((typeof newItem === 'string') && (typeof newTime === 'string')) {
                            let updatedTime = convertDateFormat(newTime);
                            dateItem.time = updatedTime;
                            dateItem.item = newItem;
                            await editDate(dateItem);
                            dateItem.clicked = false; // Optionally close the edit mode
                            loadDates(); // Refresh your todos list
                        }
                        }}>
                        <input type="date" name="time" autocomplete="off" value={revertDateFormat(dateItem.time)}>
                        <br>
                        <input name="item" type="text" autocomplete="off" value={dateItem.item}>
                    </form>
            {/if}
            {#if displayEditDate}
                <div class="icons_container">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="icon" on:click={() => clickEdit(dateItem)}>
                        <DashboardIcons iconName={'pencil_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'yellow'} />
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="icon" on:click={async () => {
                        deleteDate(dateItem.id);
                        loadDates();}}>
                        <DashboardIcons iconName={'trash_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'red'} />
                    </div>
                </div>
            {/if}
            </div>
        {/each}
    </ul>
    {#if !displayEditDate}
        <button class="addButton" on:click={() => displayEditDate = !displayEditDate}>Edit Dates</button>
    {:else}
            {#if !displayAddDate}
                <button class="addButton green" on:click={() => displayAddDate = !displayAddDate} >Add Date</button>
            {:else}
            <form class = "form_add font_smallish" on:submit|preventDefault={async (e) => {
                const formData = new FormData(e.currentTarget);
                const newTime = formData.get('time');
                const newItem = formData.get('item');
    
                if ((typeof newItem === 'string') && (typeof newTime === 'string')) {
                    let updatedTime = convertDateFormat(newTime);
                    await createDate(updatedTime, newItem);
                    displayAddDate = false;
                    loadDates();
                }
            }}>
                <input type="date" name="time" autocomplete="off" required>
                <br>
                <input name="item" type="text" autocomplete="off" placeholder="Enter Event" required>
                <br>
                <button class="addButton font_small" type='submit'>Sumbit</button>
            </form>
            {/if}
        <button class="addButton" on:click={() => {displayEditDate = !displayEditDate; displayAddDate = false;}} style="width: 70%;" >Finish Editing</button>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 25px 0 25px 0;
        height: calc(100% - 25px);
        padding-bottom: 25px;
    }
    h3 {
        margin-bottom: 20px;
    }
    ul {
        list-style: none;
        margin-bottom: 20px;
    }
    input {
        background-color: var(--color_white);
        color: black;
    }
    .addButton {
        width: 50%;
        align-self: center;
        background-color: var(--color_third);
        color: var(--color_white);
        border: none;
        box-shadow: 1px 1px 3px black;
        padding: 10px;
        margin-top: 25px;
        border-radius: 15px;
        text-align: center;
    }
    .green {
        background-color: var(--color_bold_green);
        color: black;
    }
    .addButton:hover {
        background-color: var(--color_third_light);
        box-shadow: 3px 3px 3px black;
    }
    .green:hover {
        background-color: var(--color_bold_green_light);
    }
    .list_item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }
    .icons_container {
        display: flex;
        gap: 0.5em;
    }
</style>