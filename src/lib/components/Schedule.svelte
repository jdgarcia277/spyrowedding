<script lang="ts">
    export let title_gap: string = '';
    export let title_class: string = 'dancing-script_bold font_large'; //default value
    export let list_class: string = 'dancing-script_regular font_med'; //default value

</script>

<div class="schedule_container">
    <div class="schedule_title" style={`margin-bottom: ${title_gap};`}>
        <h1 class={title_class}>Order of Events</h1>
    </div>
    <div class="schedule_body">
        <ul>
            <li class={list_class}>7:00pm - Ceremony</li>
        </ul>
    </div>
</div>

<style>

</style>