<script lang="ts">
    import { isSmallScreen } from '$lib/scripts/screenSizeStore';
    import MenuIcon from '$lib/items/MenuIcon.svelte'; //props are width, height, color, backgroundColor, outlined, svgBgColor
    import Logo from '$lib/items/Logo.svelte'; //props are width, height, color, outlined

    export let logoColor: string = 'currentColor';
    export let listColor: string = 'var(--color_white)';
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
        <div class="logo_container">
            <Logo height={'100px'} width={'100px'} color={logoColor} />
        </div>
        <div class="mobile_navbar_menu_container">
            <div on:click={toggleMenuClick} on:keydown={handleKeydown} class="menuIcon_wrapper {isMenuClicked ? 'clicked' : ''}" role="button" tabindex="0" aria-label="Toggle Menu Size">
                <MenuIcon height={'60px'} width={'60px'} color={'var(--color_dark)'} outlined={true} backgroundColor={'var(--color_white)'} svgBgColor={'var(--color_primary'}/>
            </div>
            {#if isMenuClicked}
                <ul class="dropdown_menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/rsvp">RSVP</a></li>
                    <li><a href="/our-story">Our Story</a></li>
                    <li><a href="/wedding-party">Wedding Party</a></li>
                </ul>
            {/if}
        </div>
    </nav>
{:else}
    <nav class="navbar">
        <div class="logo_container">
            <Logo height={'175px'} width={'175px'} color={logoColor}/>
        </div>
        <div class="navbar_right">
            <ul class="navbar_list">
                <li><a class="font_med" style={`color: ${listColor}`} href="/">Home</a></li>
                <li><a class="font_med" style={`color: ${listColor}`} href="/rsvp">RSVP</a></li>
                <li><a class="font_med" style={`color: ${listColor}`} href="/our-story">Our Story</a></li>
                <li><a class="font_med" style={`color: ${listColor}`} href="/wedding-party">Wedding Party</a></li>
            </ul>
        </div>
    </nav>
    
{/if}

<style>
    .mobile_navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mobile_navbar_menu_container {
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
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px 0 50px;
    }
    .navbar_list {
        list-style-type: none;
        display: flex;
        gap: 40px;
    }
    .navbar_list a {
        text-decoration: none;
    }
    .dropdown_menu {
        list-style-type: none;
        margin: 0;
        padding: 0;
        background: var(--color_white);
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        position: absolute; /* Positions the menu absolutely within its relative parent */
        top: 100%; /* Positions the dropdown right below the toggle button */
        right: 25px; /* Aligns the dropdown to the right; adjust as necessary */
        width: auto; /* Adjust width as needed, or use 'auto' for content width */
    }
    .dropdown_menu li {
        padding: 10px 15px;
    }
    .dropdown_menu li a {
        font-size: 1.25rem;
        text-decoration: none;
        color: var(--color_dark);
        display: block;
    }
    .dropdown_menu li a:hover,
    .dropdown_menu li a:focus {
        background-color: rgba(255,255,255,0.2);
    }
</style>