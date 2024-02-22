<script lang="ts">
    import { isSmallScreen } from '$lib/scripts/screenSizeStore';
    import MenuIcon from '$lib/items/MenuIcon.svelte';

    let isMenuClicked: boolean = false;

    function toggleMenuClick(): void{
        isMenuClicked = !isMenuClicked;
    }

    function handleKeydown(event: any) {
        if (event.key === 'Enter') {
            toggleMenuClick();
        }
    }
</script>

{#if $isSmallScreen}
    <nav class="mobile_navbar">
        <div on:click={toggleMenuClick} on:keydown={handleKeydown} class="menuIcon_wrapper {isMenuClicked ? 'clicked' : ''}" role="button" tabindex="0" aria-label="Toggle Menu Size">
            <MenuIcon height={'75px'} width={'75px'} color={'white'} outlined={true} backgroundColor={'var(--color_primary)'} svgBgColor={'var(--color_primary'}/>
        </div>
        {#if isMenuClicked}
            <ul class="dropdown_menu">
                <li><a href="#/">Home</a></li>
                <li><a href="#/rsvp">RSVP</a></li>
                <li><a href="#/our-story">Our Story</a></li>
                <li><a href="#/wedding-party">Wedding Party</a></li>
            </ul>
        {/if}
    </nav>
{:else}
    <nav class="navbar"></nav>
    
{/if}

<style>
    .mobile_navbar {
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Adjust this to align the dropdown menu as needed */
        position: relative; /* Establishes a positioning context */
        gap: 10px;
    }
    .menuIcon_wrapper {
        transition: transform 0.3s ease;
        display: inline-block;
        cursor: pointer;
    }
    .menuIcon_wrapper.clicked {
        transform: scale(0.85);
    }
    .dropdown_menu {
        list-style-type: none;
        margin: 0;
        padding: 0;
        background: var(--color_primary);
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        position: absolute; /* Positions the menu absolutely within its relative parent */
        top: 100%; /* Positions the dropdown right below the toggle button */
        right: 0; /* Aligns the dropdown to the right; adjust as necessary */
        width: auto; /* Adjust width as needed, or use 'auto' for content width */
    }
    .dropdown_menu li {
        padding: 10px 15px;
    }
    .dropdown_menu li a {
        text-decoration: none;
        color: var(--color_text);
        display: block;
    }
    .dropdown_menu li a:hover,
    .dropdown_menu li a:focus {
        background-color: rgba(255,255,255,0.2);
    }
</style>