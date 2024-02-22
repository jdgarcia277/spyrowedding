<script lang="ts">
    //import { isSmallScreen } from "$lib/scripts/screenSizeStore";
    import Navbar from "$lib/components/Navbar.svelte";

</script>

<div class="rsvp_page_container">
    <div class="rsvp_banner">
        <div class="rsvp_nav_container">
            <Navbar />
        </div>
        <div class="rsvp_banner_title">
            <h1 class="dancing-script_bold font_large">RSVP</h1>
        </div>
    </div>
    <div class="rsvp_form_container">
        <form action=""></form>
    </div>
</div>

<style>
    .rsvp_page_container {
        max-width: 2400px;
    }
    .rsvp_banner {
        height: 425px;
        background-image: 
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
            url('/images/mobile/castle-proposal-onknee-bw-9-16.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        gap: 10%;
    }
    .rsvp_banner_title {
        text-align: center;
    }
    @media (min-width: 768px) {
        .rsvp_banner {
            height: 60vh;
            max-height: 1350px;
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('/images/desktop/castle-proposal-onknee-bw-16-9.webp');
            gap: 30%;

        }
    }
</style>