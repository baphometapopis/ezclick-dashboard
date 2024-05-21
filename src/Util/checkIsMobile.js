
export function isMobile() {
    // Get the viewport width and height
    const viewportWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  
    const viewportHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  
    // Define threshold values for mobile devices
    const mobileWidthThreshold = 768; // Example threshold for mobile width
    const mobileHeightThreshold = 600; // Example threshold for mobile height
  
    // Check if the viewport width or height is less than the threshold
    if (viewportWidth < mobileWidthThreshold || viewportHeight < mobileHeightThreshold) {
      return true; // It's a mobile device
    } else {
      return false; // It's not a mobile device
    }
  }
  