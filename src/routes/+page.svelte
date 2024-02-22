<script lang='ts'>
    import { isSmallScreen } from '$lib/screenSizeStore';
    import MenuIcon from '$lib/MenuIcon.svelte';

</script>

{#if $isSmallScreen}
    <div class="mobile_home_container">
        <nav class="mobile_navbar">
            <MenuIcon height={'75px'} width={'75px'} color={'white'} outlined={true} backgroundColor={'var(--primaryColor)'} svgBgColor={'var(--primaryColor'}/>
        </nav>
    </div>
    
{:else}
    <div class="home_container">
        <nav class="navbar"></nav>
    </div>
    
{/if}

<style>
    .mobile_home_container {
        height: 100vh;
        width: 100vw;
        background-image: 
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url('/images/city-zoomed-ringshow-bw-9-16.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .mobile_navbar {
        padding: 25px;
        display: flex;
        justify-content: end;
        gap: 10px;
    }
</style>