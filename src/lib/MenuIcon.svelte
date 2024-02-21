<script lang="ts">
    export let width: string = '50px';
    export let height: string = '50px';
    export let color: string = 'currentColor';
    export let backgroundColor: string = 'transparent';
    export let outlined: boolean = false;
    export let svgBgColor: string = 'black';
    let className: string = 'menuIcon_default'

    $: className = outlined ? 'menuIcon_outlined' : 'menuIcon_default';

</script>

<div class={className} style={`width: ${width}; height: ${height}; background-color: ${backgroundColor}; --svgBgColor: ${svgBgColor};`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
</div>

<style>
    .menuIcon_default{
        padding: 15px;
    }
    .menuIcon_outlined{
        padding: 15px;
        border: 1px solid var(--svgBgColor);
        border-radius: 2px;
    }
</style>