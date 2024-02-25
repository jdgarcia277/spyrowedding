<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";


</script>

<div class="wedding-party_page_container">
    <Navbar logoColor={'var(--color_logo)'} listColor={'var(--color_text)'}/>
    <div class="wedding-party_title_container">
        <h1 class="dancing-script_bold font_large">The Wedding Party</h1>
    </div>
</div>

<style>
    .wedding-party_page_container {
        max-width: 2400px;
    }
    .wedding-party_title_container {
        margin-top: 50px;
    }
    .wedding-party_title_container h1 {
        text-align: center;
    }
</style>