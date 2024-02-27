<script lang="ts">
    export let size: string = '50px';
    export let color: string = 'currentColor';
    export let iconName: string = '';

    let height: string = size;
    let width: string = size;
</script>

{#if iconName == 'profile_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
{:else if iconName == 'notification_default_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,
        2 0 0,1 12,23A2,2 0 0,1 10,21" />
    </svg>
{:else if iconName == 'notification_alert_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,
        2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,
        3.19C2.16,5.25 1,8.07 1,11Z" />
    </svg>
{:else if iconName == 'home_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </svg>
{:else if iconName == 'rsvp_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
    </svg>
{:else if iconName == 'schedule_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
    </svg>
{:else if iconName == 'party_icon'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
        <path d="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66
        3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91
        6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89
        6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39
            12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z" />
    </svg>
{/if}
