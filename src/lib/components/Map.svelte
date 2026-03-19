<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { Plane } from 'lucide-svelte';
  import 'leaflet/dist/leaflet.css';

  let mapContainer: HTMLElement;
  let L: any;
  let map: any;

  onMount(async () => {
    if (!browser) return;

    // Dynamically import Leaflet only on the client
    L = (await import('leaflet')).default;

    // Bole Medhanialem, Addis Ababa
    const lat = 9.0054;
    const lng = 38.7836;

    map = L.map(mapContainer, {
      center: [lat, lng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true
    });


    // Premium Dark Theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // GTA Style Marker (Small white arrow with blue stroke)
    const gtaIcon = L.divIcon({
      className: 'gta-marker',
      html: `
        <div class="gta-arrow">
          <svg viewBox="0 0 24 24" fill="white" stroke="#3b82f6" stroke-width="2">
            <path d="M12 2l8 18-8-4-8 4z" />
          </svg>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([lat, lng], { icon: gtaIcon }).addTo(map);
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<div class="map-wrapper">
  <div bind:this={mapContainer} class="map-element"></div>
  <div class="plane-container">
    <div class="plane-icon"><Plane size={32} /></div>
    <div class="contrail contrail-left"></div>
    <div class="contrail contrail-right"></div>
  </div>
  <div class="map-hud"></div>
</div>

<style>
  .map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .map-element {
    width: 100%;
    height: 100%;
    background: #000;
  }

  .plane-container {
    position: absolute;
    top: 70%;
    left: -40px;
    z-index: 2000;
    pointer-events: none;
    filter: drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.4));
    animation: fly-across 12s linear infinite;
    animation-delay: 2s;
    opacity: 0;
  }

  .plane-icon {
    color: rgba(255, 255, 255, 0.9);
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contrail {
    position: absolute;
    width: 120px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.1) 70%, transparent);
    filter: blur(1px);
    animation: trail-breathe 2s ease-in-out infinite alternate;
    right: 28px;
  }

  .contrail-left {
    top: 6px;
  }

  .contrail-right {
    top: 22px;
  }

  @keyframes trail-breathe {
    0%   { width: 120px; opacity: 0.9; filter: blur(1px); }
    100% { width: 100px; opacity: 0.7; filter: blur(1.5px); }
  }




  @keyframes fly-across {
    0% { left: -50px; top: 80%; transform: rotate(-21deg); opacity: 0; }
    5% { transform: rotate(-21deg); opacity: 1; }
    95% { transform: rotate(-21deg); opacity: 1; }
    100% { left: 110%; top: 20%; transform: rotate(-21deg); opacity: 0; }
  }


  .map-hud {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  :global(.gta-marker) {
    background: none !important;
    border: none !important;
  }

  :global(.gta-arrow) {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
    transform: rotate(0deg); /* Facing up by default */
  }

  /* GTA Vibrant Aesthetic */
  :global(.leaflet-tile-container) {
    filter: saturate(1.8) brightness(1.1) contrast(1.1) invert(0.1);
  }

  :global(.leaflet-control-zoom) {
    border: none !important;
    box-shadow: none !important;
  }

  :global(.leaflet-control-zoom-in, .leaflet-control-zoom-out) {
    background: rgba(0, 0, 0, 0.5) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 4px !important;
    margin-bottom: 4px !important;
  }
</style>

