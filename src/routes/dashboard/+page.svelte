<script lang="ts">
    import ToDoSummary from "$lib/components/ToDoSummary.svelte";

    
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
            <h3 class="font_med_large">Important Dates:</h3>
            <p>//Todo Database date connection</p>
        </div>
        <div class="grid_item todo_list">
            <ToDoSummary />
        </div>
        <div class="grid_item vendor_contact_info">
            <h3 class="font_med_large">Vendors:</h3>
            <div class="vendor_contact_info_container">
                <div>
                    <p>Vendor Name-</p>
                </div>
                <div style={'display: flex; flex-direction: column; gap: 5px;'}>
                    <p>Vendor number</p>
                    <p>Vendor email</p>
                </div>
            </div>
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
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
    .grid_item {
        min-height: 300px;
        min-width: 400px;
        background-color: var(--color_white);
        border-radius: 15px;
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
    .vendor_contact_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }
    .vendor_contact_info_container {
        display: flex;
        gap: 50px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
    }

</style>