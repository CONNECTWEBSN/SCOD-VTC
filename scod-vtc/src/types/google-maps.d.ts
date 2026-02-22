/// <reference types="@types/google.maps" />

/**
 * Extends Window to expose the google namespace loaded by the Maps JS SDK.
 * The SDK is loaded asynchronously via a <script> tag, so the property
 * may be undefined before the script finishes loading.
 */
declare global {
  interface Window {
    google: typeof google;
  }
}

export {};
