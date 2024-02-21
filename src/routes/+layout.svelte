<script lang="ts">
    import { isSmallScreen } from '$lib/screenSizeStore';
    import MenuIcon from '$lib/MenuIcon.svelte';
</script>

{#if $isSmallScreen}
    <nav class="mobile_navbar">
        <MenuIcon />
    </nav>
{:else}
    <nav class="navbar"></nav>
{/if}

<slot />

<style>
    .mobile_navbar {
        display: flex;
        justify-content: end;
    }
    .navbar {
        display: flex;
    }
</style>