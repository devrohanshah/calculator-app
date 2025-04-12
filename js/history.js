/**
 * NeoCalc - History Module
 * Manages calculation history and related functionality
 */

// This file is separated from the main calculator logic to improve maintainability
// Note: This would typically be imported/used by calc.js, but for simplicity in implementation,
// we've included all necessary functionality directly in calc.js

console.log(
  "NeoCalc - Advanced Calculator\nEnhanced version of Rohan Shah's original calculator\nhttps://www.rohanshah.com.np/"
);

// Service worker registration for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
