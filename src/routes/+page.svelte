<script lang='ts'>
    import { isSmallScreen } from '$lib/scripts/screenSizeStore';
    import Navbar from '$lib/components/Navbar.svelte'; //props are logoColor, listColor
    import Schedule from '$lib/components/Schedule.svelte'; //props are title_gap, list_gap, title_class, list_class

</script>

{#if $isSmallScreen}
    <div class="mobile_home_banner">
        <Navbar logoColor={'var(--color_white'}/>
    </div>
    <div class="mobile_home_schedule">
        <Schedule title_gap={'25px'} list_gap={'20px'} />
    </div>
{:else}
    <div class="home_banner">
        <Navbar logoColor={'var(--color_white'}/>
    </div>
    <div class="home_schedule">
        <Schedule title_gap={'50px'} list_gap={'40px'} title_class={'dancing-script_bold font_xl'} list_class={'dancing-script_regular font_med_large'}/>
        <img src="/images/desktop/city-zoomed-ringshow-9-16.webp" alt="hannah and john showing off ring">
    </div>
    
{/if}

<style>
    .mobile_home_banner {
        height: 100vh;
        width: 100vw;
        background-image: 
        linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), 
        url('/images/mobile/city-zoomed-ringshow-9-16.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .mobile_home_schedule {
        margin-top: 25px;
        display: flex;
        justify-content: center;

    }
    .home_banner {
        height: 100vh;
        max-height: 1350px;
        max-width: 2400px;
        background-image: 
            linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), 
            url('/images/desktop/sitting-on-rock-16-9.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .home_schedule {
        margin: 75px 0;
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        align-items: center;
        justify-content: center;
    }
    .home_schedule img {
        width: 350px;
        margin: auto;
    }
</style>