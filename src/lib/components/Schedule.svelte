<script lang="ts">
    import { onMount } from 'svelte';

    export let title_gap: string = '';
    export let list_gap: string = '';
    export let title_class: string = 'dancing-script_bold font_large'; //default value
    export let list_class: string = 'dancing-script_regular font_med'; //default value

    type schedule_list = {
        time: string;
        event: string
    }
    let schedules: schedule_list[] = [];

    async function loadSchedule() {
		const response = await fetch('api/schedule');
		schedules = await response.json();
	}

    onMount(() => {
        loadSchedule();
    });
</script>

<div class= 'schedule_container'>
    <div class="schedule_title" style={`margin-bottom: ${title_gap};`}>
        <h1 class={title_class}>Order of Events</h1>
    </div>
    <div class='schedule_body'>
        <ul>
            {#each schedules as schedule}
                <li class={list_class} style={`margin-bottom: ${list_gap}`}>{schedule.time + ': ' + schedule.event}</li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .schedule_container {
        text-align: center;
        width: 100%;
        padding: 25px;
        cursor: default;
    }
    .schedule_body ul {
        list-style: none;
    }
</style>