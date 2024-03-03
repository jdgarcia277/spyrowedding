<script lang="ts">
    import { onMount } from 'svelte';
    import DashboardIcons from '$lib/items/DashboardIcons.svelte';

    //type for database list
    type date_list = {
    id: number;
    time: string;
    item: string;
    clicked: boolean | undefined;
    }

    //init database variables
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
    //calls fetch for when component is mounted
    onMount(() => {
        loadDates();
    });

    //html variables
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

<main>
    <h1 class="font_xl">Important Dates:</h1>
    <ul class="font_med">
        {#each dateList as dateItem}
            <div class="item_container">
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
                            <input name="item" type="text" autocomplete="off" value={dateItem.item}>
                        </form>
                    {/if}
                    <div class="icons_container">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={() => clickEdit(dateItem)}>
                            <DashboardIcons iconName={'pencil_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'yellow'}/>
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={async () => {
                            deleteDate(dateItem.id);
                            loadDates();}}>
                            <DashboardIcons iconName={'trash_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'red'} />
                        </div>
                    </div>
            </div>
        {/each}
    </ul>
    <button class="add_new font_small_med" on:click={() => displayAddDate = !displayAddDate}>Add New Date</button>
    {#if displayAddDate}
        <form class = "form_add font_med" on:submit|preventDefault={async (e) => {
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
            <input name="item" type="text" autocomplete="off" placeholder="Enter Event" required>
            <button class="add_new font_small" type='submit'>Sumbit</button>
        </form>
    {/if}
    <a href="/dashboard"><button class="add_new font_small_med" style="margin-left: 25px;">Return home</button></a>
</main>

<style>
    main {
        margin: 50px;
        padding: 50px;
        border-radius: 15px;
        background-color: var(--color_white);
        color: black;
    }
    h1 {
        text-decoration: underline;
        margin-bottom: 25px;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        max-height: 12em;
        flex-wrap: wrap;
        gap: 0.5em;
    }
    input {
        background-color: var(--color_white);
        color: black;
    }
    .add_new {
        background-color: var(--color_third);
        border: none;
        border-radius: 0.25em;
        width: 8em;
        padding: 0.5em;
        margin: 1em 0 1em 0;
    }
    .add_new:hover {
        background-color: var(--color_third_light);
    }
    .item_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 30%;
    }
    .icons_container {
        display: flex;
        gap: 0.5em;
    }
</style>