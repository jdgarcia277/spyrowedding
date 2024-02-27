<script lang="ts">
    import { isSmallScreen } from "$lib/scripts/screenSizeStore";
    import { page } from '$app/stores';
    import Logo from '$lib/items/Logo.svelte'
    import DashboardIcons from "$lib/items/DashboardIcons.svelte";
    import LayoutH1 from '$lib/items/LayoutH1.svelte';

    let gridClassName: string = 'grid_container_min'; //default value
    let gridboolean: boolean = false; //false for minimized
    let topNavigation: string = 'dashboard_top_nav'; //default value
    const sideHover = () => {
        gridboolean = !gridboolean;

        gridboolean ? gridClassName = 'grid_container_full' : gridClassName = 'grid_container_min';
        gridboolean ? topNavigation = 'dashboard_top_nav_min' : topNavigation = 'dashboard_top_nav';
    }

    let pageName: string = 'Home'; //default value

    $: {
        if($page.url.pathname.endsWith('/dashboard')) {
            pageName = 'Home';
        }
        else if($page.url.pathname.endsWith('/dashboard/rsvp')) {
            pageName = 'RSVP';
        }
        else if($page.url.pathname.endsWith('/dashboard/edit')) {
            pageName = 'Edit Site';
        }
    }
</script>

{#if $isSmallScreen}
    <div class="dashboard_rejectMobile">
        <h1 class="font_small_med">Please use desktop or larger window... <br>no mobile view available for dashboard</h1>
    </div>
{:else}
    <div class="dashboard_page_container">
        <div class={gridClassName}>
            <div class={topNavigation}>
                <div class="dashboard_top_nav_left">
                    <LayoutH1 page={pageName} className={'font_small_med'}/>
                </div>
                <div class="dashboard_top_nav_right">
                    <div class="notifications_icon_container">
                        <DashboardIcons iconName={'notification_default_icon'} size={'30px'}/>
                    </div>
                    <div class="profile_icon_group">
                        <div class="profile_icon_container">
                            <DashboardIcons iconName={'profile_icon'} size={'40px'} />
                        </div>
                        <h3 class="font_small_med">Name</h3>
                    </div>
                </div>
            </div>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div class="dashboard_side_nav" on:mouseenter={sideHover} on:mouseleave={sideHover}>
                <div class="side_nav_title">
                    <Logo height={'75px'} width={'75px'}/>
                </div>
                <div class="side_nav_menu_item">
                    <a href="/dashboard">
                        <DashboardIcons iconName={'home_icon'} size={'30px'} />
                        {#if gridboolean}
                            <h3 class="font_small_med">Home</h3>
                        {/if}</a>
                </div>
                <div class="side_nav_menu_item">
                    <a href="/dashboard/rsvp">
                        <DashboardIcons iconName={'rsvp_icon'} size={'30px'} />
                        {#if gridboolean}
                            <h3 class="font_small_med">RSVP's</h3>
                        {/if}</a>
                </div>
                <div class="side_nav_menu_item">
                    <a href="/dashboard/edit">
                        <DashboardIcons iconName={'pencil_icon'} size={'30px'} />
                        {#if gridboolean}
                            <h3 class="font_small_med">Edit Site</h3>
                        {/if}</a>
                </div>
            </div>
            <div class="dashboard_main">
                <slot />
            </div>
        </div>
       
    </div>
{/if}

<style>
    .dashboard_rejectMobile {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .grid_container_full {
        display: grid;
        height: 100vh;
        width: 100vw;
        grid-template-columns: 75px 75px repeat(6, 1fr);
        grid-template-rows: 30px 30px repeat(10, 1fr);
        grid-template-areas: 
            "sidebar sidebar header header header header header header"
            "sidebar sidebar header header header header header header"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main"
            "sidebar sidebar main main main main main main";
    }
    .grid_container_min {
        display: grid;
        height: 100vh;
        width: 100vw;
        grid-template-columns: 65px 65px repeat(6, 1fr);
        grid-template-rows: 30px 30px repeat(10, 1fr);
        grid-template-areas: 
            "sidebar header header header header header header header"
            "sidebar header header header header header header header"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main"
            "sidebar main main main main main main main";
    }
    .dashboard_top_nav {
        grid-area: header;
        background: linear-gradient(to right, #384b36 0%, #50694f 100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: calc(100vw - 65px);
        height: 60px;
        right: 0;
    }
    .dashboard_top_nav_min {
        grid-area: header;
        background: linear-gradient(to right, #384b36 0%, #50694f 100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        width: calc(100vw - 150px);
        height: 60px;
        right: 0;
    }
    .dashboard_top_nav_left {
        padding-left: 50px;
    }
    .dashboard_top_nav_right {
        padding-right: 50px;
        display: flex;
        align-items: center;
        gap: 50px;
    }
    .profile_icon_group {
        display: flex;
        align-items: center;
        gap: 25px;
        cursor: default;
    }
    .notifications_icon_container {
        position: relative;
    }
    .dashboard_side_nav {
        grid-area: sidebar;
        background: linear-gradient(to bottom, #384b36 0%, #50694f 100%);
        position: fixed;
        height: 100vh;
        width: 65px;

    }
    .dashboard_side_nav:hover {
        width: 150px;
    }
    .side_nav_title {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    .side_nav_menu_item {
        margin: 50px 0 50px 0;
        padding: 15px 0 15px 0;
        cursor: default;
    }
    .side_nav_menu_item a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        text-decoration: none;
        color: var(--color_text)
    }
    .side_nav_menu_item:hover,
    .side_nav_menu_item:focus {
        background-color: rgba(255,255,255,0.2);
    }
    .dashboard_main {
        grid-area: main;
    }
    
    @media (prefers-color-scheme: light) {
        .dashboard_top_nav {
            background: white;
        }
        .dashboard_side_nav {
            background: white;
        }
        .dashboard_main {
            background: #edeff7;
        }
        .side_nav_menu_item:hover,
        .side_nav_menu_item:focus {
        background-color: #dce0ef;
    }
    }

    @media only screen and (min-width: 1600px) {
        .side_nav_menu_item {
            margin: 65px 0 65px 0;
        }
    }
</style>