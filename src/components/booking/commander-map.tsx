"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AddressValue } from "./address-input";

// Thème sombre personnalisé SCOD VTC
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0d1117" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0d1117" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#1a2235" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca3af" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d1d5db" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b7280" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#0f1923" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a2235" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0d1117" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca3af" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#1f3044" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0d1117" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d1d5db" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1a2235" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b7280" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#07111b" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#374151" }],
  },
];

// Dakar, Sénégal par défaut
const DAKAR_CENTER = { lat: 14.6937, lng: -17.4441 };

interface CommanderMapProps {
  pickup: AddressValue;
  dropoff: AddressValue;
  className?: string;
}

export function CommanderMap({ pickup, dropoff, className }: CommanderMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<google.maps.Map | null>(null);
  const pickupMarkerRef = React.useRef<google.maps.Marker | null>(null);
  const dropoffMarkerRef = React.useRef<google.maps.Marker | null>(null);
  const polylineRef = React.useRef<google.maps.Polyline | null>(null);
  const directionsRendererRef = React.useRef<google.maps.DirectionsRenderer | null>(null);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isRouting, setIsRouting] = React.useState(false);

  // Initialiser la carte
  React.useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: DAKAR_CENTER,
        zoom: 13,
        styles: DARK_MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        gestureHandling: "greedy",
        clickableIcons: false,
        backgroundColor: "#0d1117",
      });

      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#FFC300",
          strokeOpacity: 0.9,
          strokeWeight: 4,
        },
      });
      directionsRendererRef.current.setMap(mapInstanceRef.current);

      setIsLoaded(true);
    };

    if (window.google?.maps) {
      initMap();
    } else {
      window.addEventListener("google-maps-loaded", initMap);
      return () => window.removeEventListener("google-maps-loaded", initMap);
    }
  }, []);

  // Helpers : créer un marqueur SVG
  const makeMarkerIcon = (type: "pickup" | "dropoff") => ({
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: type === "pickup" ? "#FFC300" : "#110E40",
    fillOpacity: 1,
    strokeColor: type === "pickup" ? "#E6B000" : "#1C1870",
    strokeWeight: 3,
    scale: 10,
  });

  // Mettre à jour les marqueurs et le trajet quand les adresses changent
  React.useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const hasPickup =
      pickup.latitude !== undefined && pickup.longitude !== undefined;
    const hasDropoff =
      dropoff.latitude !== undefined && dropoff.longitude !== undefined;

    // Marqueur départ
    if (hasPickup) {
      if (pickupMarkerRef.current) {
        pickupMarkerRef.current.setPosition({
          lat: pickup.latitude!,
          lng: pickup.longitude!,
        });
      } else {
        pickupMarkerRef.current = new google.maps.Marker({
          position: { lat: pickup.latitude!, lng: pickup.longitude! },
          map,
          icon: makeMarkerIcon("pickup"),
          zIndex: 2,
        });
      }
    } else {
      pickupMarkerRef.current?.setMap(null);
      pickupMarkerRef.current = null;
    }

    // Marqueur arrivée
    if (hasDropoff) {
      if (dropoffMarkerRef.current) {
        dropoffMarkerRef.current.setPosition({
          lat: dropoff.latitude!,
          lng: dropoff.longitude!,
        });
      } else {
        dropoffMarkerRef.current = new google.maps.Marker({
          position: { lat: dropoff.latitude!, lng: dropoff.longitude! },
          map,
          icon: makeMarkerIcon("dropoff"),
          zIndex: 2,
        });
      }
    } else {
      dropoffMarkerRef.current?.setMap(null);
      dropoffMarkerRef.current = null;
    }

    // Tracer le trajet si les 2 points sont définis
    if (hasPickup && hasDropoff) {
      setIsRouting(true);
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickup.latitude!, lng: pickup.longitude! },
          destination: { lat: dropoff.latitude!, lng: dropoff.longitude! },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (
          result: google.maps.DirectionsResult | null,
          status: google.maps.DirectionsStatus
        ) => {
          setIsRouting(false);
          if (status === "OK" && result && directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(result);
          }
        }
      );

      // Zoom pour contenir les 2 points
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: pickup.latitude!, lng: pickup.longitude! });
      bounds.extend({ lat: dropoff.latitude!, lng: dropoff.longitude! });
      map.fitBounds(bounds, { top: 60, right: 40, bottom: 60, left: 40 });
    } else if (hasPickup) {
      map.panTo({ lat: pickup.latitude!, lng: pickup.longitude! });
      map.setZoom(15);
      // Clear the route by detaching and re-attaching the renderer
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current.setMap(map);
      }
    } else if (hasDropoff) {
      map.panTo({ lat: dropoff.latitude!, lng: dropoff.longitude! });
      map.setZoom(15);
    } else {
      map.panTo(DAKAR_CENTER);
      map.setZoom(13);
    }
  }, [isLoaded, pickup.latitude, pickup.longitude, dropoff.latitude, dropoff.longitude]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Map canvas */}
      <div ref={mapRef} className="h-full w-full bg-[#0d1117]" />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d1117]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="font-sans text-sm text-grey-500">
            Chargement de la carte…
          </p>
        </div>
      )}

      {/* Route computing indicator */}
      {isRouting && (
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <Loader2 className="h-4 w-4 animate-spin text-accent" />
          <span className="font-sans text-xs text-white">Calcul du trajet…</span>
        </div>
      )}

      {/* Legend */}
      {(pickup.latitude ?? dropoff.latitude) && (
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0d1117]/90 p-3 backdrop-blur-sm">
          {pickup.latitude && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="font-sans text-xs text-white/70">Départ</span>
            </div>
          )}
          {dropoff.latitude && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-brand border border-brand-hover" />
              <span className="font-sans text-xs text-white/70">Arrivée</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
