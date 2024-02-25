<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";


</script>

<div class="our-story_page_container">
    <Navbar logoColor={'var(--color_logo)'} listColor={'var(--color_text)'}/>
    <div class="our-story_title_container">
        <h1 class="dancing-script_bold font_large">Our Story</h1>
    </div>
</div>

<style>
    .our-story_page_container {
        max-width: 2400px;
    }
    .our-story_title_container {
        margin-top: 50px;
    }
    .our-story_title_container h1 {
        text-align: center;
    }
</style>