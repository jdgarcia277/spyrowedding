<script lang='ts'>
    import { isSmallScreen } from '$lib/screenSizeStore';
    import MenuIcon from '$lib/MenuIcon.svelte';

</script>

{#if $isSmallScreen}
    <div class="mobile_home_container">
        <nav class="mobile_navbar">
            <MenuIcon />
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
    }
    .mobile_navbar {
        display: flex;
        justify-content: end;
        gap: 10px;
    }
</style>