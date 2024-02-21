import { readable } from 'svelte/store';

function isScreenSmall() {
  // This function now safely checks for window's existence.
  return typeof window !== "undefined" ? window.innerWidth < 768 : false;
}

export const isSmallScreen = readable(isScreenSmall(), (set) => {
  // Ensure we're in a browser environment before accessing window
  if (typeof window !== "undefined") {
    const updateSize = () => {
      set(isScreenSmall());
    };

    window.addEventListener('resize', updateSize);

    // Return a cleanup function
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }
});