<script lang="ts">
    import DashboardIcons from "$lib/items/DashboardIcons.svelte";
    import { onMount } from "svelte";

    //type for database
    type vendor_list = {
    id: number;
    name: string;
    number: string;
    email: string;
    clicked: boolean | undefined;
    }

    //database variables
    let vendorList: vendor_list[] = [];

    //database functions
    async function loadVendors(): Promise<void> {
        try {
            const response = await fetch('/api/vendor');
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            vendorList = await response.json();
        } catch (error) {
            console.error('Failed to fetch vendors', error);
        }
    }
    async function createVendor(newName: string, newNumber: string, newEmail: string) : Promise<void> {
        try {
            const response = await fetch('/api/vendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: newName, number: newNumber, email: newEmail}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function editVendor(vendor: vendor_list): Promise<void> {
        try {
            const response = await fetch(`/api/vendor?id=${vendor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'id': vendor.id, 'name': vendor.name, 'number': vendor.number, 'email': vendor.email })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to update Vendor', error);
        }
    }

    async function deleteVendor(vendorId: number): Promise<void> {
        try {
            const response = await fetch(`/api/vendor?id=${vendorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to delete Vendor', error);
        }
    }

    //ensures that the content is loaded from DB when mounted
    onMount(() => {
        loadVendors();
    });

    //html variables
    let displayEditVendor: boolean = false;
    let displayAddVendor: boolean = false;

    //html functions
    function clickEdit(vendor: vendor_list): void {
        vendor['clicked'] = !vendor.clicked;
        vendorList = [...vendorList]; //trigger svelte reactivity
    }
</script>

<section>
    <h3 class="font_med">Vendors:</h3>
    <ul class="font_smallish">
        {#each vendorList as vendor}
            <div class="list_item">
                {#if !vendor.clicked}
                    <li><div class="flex_item">
                        <p>{vendor.name}:</p>
                        <div class="flex_stack">
                            <p>{vendor.number}</p>
                            <p>{vendor.email}</p>
                        </div>
                    </div></li>
                    {:else if vendor.clicked}
                        <form class="font_smallish" on:submit|preventDefault={async (e) => {
                            const formData = new FormData(e.currentTarget);
                            const newName = formData.get('name');
                            const newNumber = formData.get('number');
                            const newEmail = formData.get('email');

                            if ((typeof newName === 'string') && (typeof newNumber === 'string') && (typeof newEmail === 'string')) {
                                vendor.name = newName;
                                vendor.number = newNumber;
                                vendor.email = newEmail;
                                await editVendor(vendor);
                                vendor.clicked = false //close the edit screen
                                loadVendors(); //Refresh vendor list
                            }
                        }}>
                            <div class="form_flex_item">
                                <label for="name">Vendor Name: </label>
                                <input type="text" name="name" id="name" autocomplete="off" value={vendor.name}>
                            </div>
                            <div class="form_flex_item">
                                <label for="number">Vendor Number: </label>
                                <input type="tel" name="number" id="number" autocomplete="off" value={vendor.number}>
                            </div>
                            <div class="form_flex_item">
                                <label for="email">Vendor Email: </label>
                                <input type="email" name="email" id="email" autocomplete="off" value={vendor.email}>
                            </div>
                            <button class="addButton font_small" type="submit">Submit</button>
                        </form>
                {/if}
                {#if displayEditVendor}
                    <div class="icons_container">
                        <button class="clear_button" on:click={() => clickEdit(vendor)}>
                            <DashboardIcons iconName={'pencil_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'yellow'} />
                        </button>
                        <button class="clear_button" on:click={async () => {
                            deleteVendor(vendor.id);
                            loadVendors();}}>
                            <DashboardIcons iconName={'trash_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'red'} />
                        </button>
                    </div>
                {/if}
            </div>
        {/each}
    </ul>
    {#if !displayEditVendor}
        <button class="addButton" on:click={() => displayEditVendor = !displayEditVendor}>Edit Vendors</button>
    {:else}
        {#if !displayAddVendor}
            <button class="addButton green" on:click={() => displayAddVendor = true}>Add Vendor</button>
        {:else}
        <form class="font_smallish" on:submit|preventDefault={async (e) => {
            const formData = new FormData(e.currentTarget);
            const newName = formData.get('name');
            const newNumber = formData.get('number');
            const newEmail = formData.get('email');

            if ((typeof newName === 'string') && (typeof newNumber === 'string') && (typeof newEmail === 'string')) {
                await createVendor(newName, newNumber, newEmail);
                displayAddVendor = false;
                loadVendors(); //Refresh vendor list
            }
        }}>
            <div class="form_flex_item">
                <label for="name">Vendor Name: </label>
                <input type="text" name="name" id="name" autocomplete="off" required>
            </div>
            <div class="form_flex_item">
                <label for="number">Vendor Number: </label>
                <input type="tel" name="number" id="number" autocomplete="off" required>
            </div>
            <div class="form_flex_item">
                <label for="email">Vendor Email: </label>
                <input type="email" name="email" id="email" autocomplete="off" required>
            </div>
            <button class="addButton font_small" type="submit">Submit</button>
        </form>
        {/if}
        <button class="addButton" on:click={() => {
            displayAddVendor = false;
            displayEditVendor = false;
        }}>Finish Editing</button>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 25px 0 25px 0;
        height: calc(100% - 25px);
        padding-bottom: 25px;
    }
    h3 {
        margin-bottom: 20px;
    }
    ul {
        list-style: square;
        margin-bottom: 20px;
    }
    li {
        width: 100%;
    }
    input {
        background-color: var(--color_white);
        color: black;
    }
    .list_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2em;
        margin: 10px 0;
    }
    .icons_container {
        display: flex;
        gap: 0.5em;
    }
    .flex_item {
        /* display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em; */
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto;
        align-items: center;
    }
    .flex_stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .form_flex_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .addButton:hover {
        background-color: var(--color_third_light);
        box-shadow: 3px 3px 3px black;
    }
    .green {
        background-color: var(--color_bold_green);
        color: black;
    }
    .green:hover {
        background-color: var(--color_bold_green_light);
    }
    .clear_button {
        background: none;
        border: none;
    }
</style>