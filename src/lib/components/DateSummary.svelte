<script lang="ts">
    import { onMount } from "svelte";

    type date_list = {
    id: number;
    time: string;
    item: string;
    }

    let dateList: date_list[] = []

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

    onMount(() => {
        loadDates();
    });

</script>

<section>
    <h3 class="font_med">Important Dates:</h3>
    <ul class="font_smallish">
        {#each dateList as dateItem}
            <li>{dateItem.time}: {dateItem.item}</li>
        {/each}
    </ul>
    <a href="/dashboard/dates"><button class="addButton">Add Dates</button></a>
</section>

<style>
    h3 {
        margin-bottom: 20px;
    }
    ul {
        list-style: none;
        margin-bottom: 20px;
    }
    .addButton {
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
</style>