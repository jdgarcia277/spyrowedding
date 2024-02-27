<script lang="ts">
    
</script>

<div class="dashboard_home_content">
    <div class="dashboard_home_grid_container">
        <div class="grid_item date_countdown"></div>
        <div class="grid_item rsvp_summary"></div>
        <div class="grid_item date_reminders"></div>
        <div class="grid_item todo_list"></div>
        <div class="grid_item vendor_contact_info"></div>
    </div>
</div>

<style>
    .dashboard_home_content {
        margin: 50px;
    }
    .dashboard_home_grid_container {
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
    .grid_item {
        min-height: 300px;
        background-color: var(--color_white);
        border-radius: 15px;
    }
</style>