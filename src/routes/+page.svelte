<script lang='ts'>
    import { isSmallScreen } from '$lib/scripts/screenSizeStore';
    import Navbar from '$lib/components/Navbar.svelte'; //no props
    import Schedule from '$lib/components/Schedule.svelte'; //props are title_gap, list_gap, title_class, list_class

</script>

{#if $isSmallScreen}
    <div class="mobile_home_container">
        <Navbar />
    </div>
    <div class="mobile_home_schedule">
        <Schedule title_gap={'25px'} list_gap={'20px'} />
    </div>
{:else}
    <div class="home_container">
        <Navbar />
    </div>
    <Schedule />
{/if}

<style>
    .mobile_home_container {
        height: 100vh;
        width: 100vw;
        background-image: 
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url('/images/mobile/city-zoomed-ringshow-bw-9-16.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .mobile_home_schedule {
        margin-top: 25px;
        display: flex;
        justify-content: center;

    }
</style>