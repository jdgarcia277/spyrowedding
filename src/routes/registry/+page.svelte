<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";


</script>

<div class="registry_page_container">
    <Navbar logoColor={'var(--color_logo)'} listColor={'var(--color_text)'}/>
    <div class="registry_title_container">
        <h1 class="dancing-script_bold font_large">Registry</h1>
    </div>
</div>

<style>
    .registry_page_container {
        max-width: 2400px;
    }
    .registry_title_container {
        margin-top: 50px;
    }
    .registry_title_container h1 {
        text-align: center;
    }
</style>