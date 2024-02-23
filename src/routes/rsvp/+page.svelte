<script lang="ts">
    //import { isSmallScreen } from "$lib/scripts/screenSizeStore";
    import Navbar from "$lib/components/Navbar.svelte"; //props are logoColor, listColor

</script>

<div class="rsvp_page_container">
    <Navbar logoColor={'var(--color_logo'} listColor={'var(--color_text'}/>
    <div class="rsvp_title_container">
        <h1 class="dancing-script_bold font_large">RSVP</h1>
    </div>
    <div class="rsvp_form_container">
        <form action=""></form>
    </div>
</div>

<style>
    .rsvp_page_container {
        max-width: 2400px;
    }
    .rsvp_title_container {
        margin-top: 50px;
    }
    .rsvp_title_container h1 {
        text-align: center;
    }
</style>