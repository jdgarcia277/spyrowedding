import { readable } from 'svelte/store';

// Function to check if screen is small
function isScreenSmall() {
  return typeof window !== "undefined" ? window.innerWidth < 768 : false;
}

export const isSmallScreen = readable(isScreenSmall(), (set) => {
  const updateSize = () => {
    set(isScreenSmall());
  };

  window.addEventListener('resize', updateSize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', updateSize);
  };
});