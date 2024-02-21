<script lang='ts'>
    import { onMount } from "svelte";

    let isSmallScreen: boolean = false;

    function checkScreenSize() {
        if (typeof window !== "undefined") {
            isSmallScreen = window.innerWidth < 768;
        }
    }

    onMount(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    });

</script>

<div class={isSmallScreen ? 'home_container_small' : 'home_container_large'}>
    {#if isSmallScreen}
    <nav class="mobile_navbar"></nav>
    {:else}
    <nav class="navbar"></nav>
    {/if}
</div>