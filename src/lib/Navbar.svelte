<script lang="ts">
    import { isSmallScreen } from '$lib/screenSizeStore';
    import MenuIcon from '$lib/MenuIcon.svelte';
</script>

{#if $isSmallScreen}
    <nav class="mobile_navbar">
        <MenuIcon height={'75px'} width={'75px'} color={'white'} outlined={true} backgroundColor={'var(--primaryColor)'} svgBgColor={'var(--primaryColor'}/>
    </nav>
{:else}
    <nav class="navbar"></nav>
    
{/if}

<style>
    .mobile_navbar {
        padding: 25px;
        display: flex;
        justify-content: end;
        gap: 10px;
    }
</style>