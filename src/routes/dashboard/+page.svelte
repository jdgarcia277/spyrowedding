<script lang="ts">
    import DateSummary from "$lib/components/DateSummary.svelte";
import ToDoSummary from "$lib/components/ToDoSummary.svelte";
    import VendorSummary from "$lib/components/VendorSummary.svelte";

    
    function daysUntilDecember7th2024(): number {
    const today: Date = new Date();
    const targetDate: Date = new Date('2024-12-07T00:00:00'); //wedding date

    //calculate the difference in milliseconds
    const differenceInMilliseconds: number = targetDate.getTime() - today.getTime();

    //convert milliseconds to days
    const differenceInDays: number = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
  }

  let daysUntil = daysUntilDecember7th2024();


</script>

<div class="dashboard_home_content">
    <div class="dashboard_home_grid_container">
        <div class="grid_item date_countdown">
            <div class="date_countdown_container">
                <div style={'display: flex; gap: 20px; align-items: center;'}>
                    <h3 class="dancing-script_bold font_xl2">{daysUntil}</h3>
                    {#if daysUntil > 1}
                        <p class="dancing-script_bold font_med">days</p>
                    {:else}
                        <p class="dancing-script_bold font_med">day</p>
                    {/if}
                </div>
                <p class="dancing-script_bold font_med">till</p>
                <p class="dancing-script_bold font_med_large">Mr. & Mrs. Spyropolous</p>
            </div>
        </div>
        <div class="grid_item rsvp_summary">
            <p>RSVP Summary // todo</p>
        </div>
        <div class="grid_item date_reminders">
            <DateSummary />
        </div>
        <div class="grid_item todo_list">
            <ToDoSummary />
        </div>
        <div class="grid_item vendor_summary">
            <VendorSummary />
        </div>
    </div>
</div>

<style>
    .dashboard_home_content {
        color: black;
    }
    .dashboard_home_grid_container {
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    }
    .grid_item {
        min-height: 350px;
        max-height: 350px;
        /* min-width: 400px; */
        background-color: var(--color_white);
        border-radius: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    .date_countdown_container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
    }
    .vendor_summary {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }

</style>