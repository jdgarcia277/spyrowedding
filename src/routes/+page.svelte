<script lang='ts'>
    import { isSmallScreen } from '$lib/screenSizeStore';
    import Navbar from '$lib/Navbar.svelte';

</script>

{#if $isSmallScreen}
    <div class="mobile_home_container">
        <Navbar />
    </div>
    
{:else}
    <div class="home_container">
        <Navbar />
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
</style>