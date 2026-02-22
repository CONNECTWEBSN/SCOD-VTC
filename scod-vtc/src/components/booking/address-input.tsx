"use client";

import * as React from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PlacePrediction {
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
}

export interface AddressValue {
  address: string;
  placeId?: string;
  latitude?: number;
  longitude?: number;
}

interface AddressInputProps {
  label?: string;
  placeholder: string;
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  iconVariant?: "pin" | "circle";
  showMyLocation?: boolean;
  onMyLocation?: () => void;
  isLocating?: boolean;
  error?: string;
  className?: string;
}

export function AddressInput({
  label,
  placeholder,
  value,
  onChange,
  iconVariant = "pin",
  showMyLocation = false,
  onMyLocation,
  isLocating = false,
  error,
  className,
}: AddressInputProps) {
  const [query, setQuery] = React.useState(value.address);
  const [predictions, setPredictions] = React.useState<PlacePrediction[]>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const autocompleteServiceRef =
    React.useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = React.useRef<google.maps.Geocoder | null>(null);

  // Sync external value → local query
  React.useEffect(() => {
    setQuery(value.address);
  }, [value.address]);

  // Init Google Maps services once Maps API is loaded
  React.useEffect(() => {
    const init = () => {
      if (
        window.google?.maps?.places &&
        !autocompleteServiceRef.current
      ) {
        autocompleteServiceRef.current =
          new google.maps.places.AutocompleteService();
        geocoderRef.current = new google.maps.Geocoder();
      }
    };
    if (window.google?.maps) {
      init();
    } else {
      window.addEventListener("google-maps-loaded", init);
      return () => window.removeEventListener("google-maps-loaded", init);
    }
  }, []);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = (input: string) => {
    if (!autocompleteServiceRef.current || input.trim().length < 3) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    autocompleteServiceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "sn" },
        types: ["geocode", "establishment"],
      },
      (
        results: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        setIsLoading(false);
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPredictions(
            results.map((r) => ({
              placeId: r.place_id,
              mainText: r.structured_formatting.main_text,
              secondaryText: r.structured_formatting.secondary_text ?? "",
              description: r.description,
            }))
          );
          setShowDropdown(true);
        } else {
          setPredictions([]);
          setShowDropdown(false);
        }
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange({ address: val });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(val), 300);
  };

  const handleSelectPrediction = async (prediction: PlacePrediction) => {
    setQuery(prediction.description);
    setShowDropdown(false);
    setPredictions([]);

    if (!geocoderRef.current) {
      onChange({ address: prediction.description, placeId: prediction.placeId });
      return;
    }

    geocoderRef.current.geocode(
      { placeId: prediction.placeId },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          onChange({
            address: prediction.description,
            placeId: prediction.placeId,
            latitude: loc.lat(),
            longitude: loc.lng(),
          });
        } else {
          onChange({ address: prediction.description, placeId: prediction.placeId });
        }
      }
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1.5 block font-sans text-sm font-medium text-grey-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Icon */}
        <div className="pointer-events-none absolute left-4 z-10">
          {iconVariant === "pin" ? (
            <MapPin className="h-5 w-5 text-accent" />
          ) : (
            <div className="h-4 w-4 rounded-full border-2 border-brand bg-white" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className={cn(
            "h-[52px] w-full rounded-input border bg-white pl-11 pr-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400",
            "border-grey-200 transition-all duration-200",
            "focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15",
            error && "border-error focus:border-error focus:ring-error/15",
            showMyLocation && "pr-32"
          )}
          aria-invalid={!!error}
          aria-autocomplete="list"
          autoComplete="off"
        />

        {/* My Location button */}
        {showMyLocation && (
          <button
            type="button"
            onClick={onMyLocation}
            disabled={isLocating}
            className="absolute right-2 flex h-8 items-center gap-1.5 rounded-md bg-grey-100 px-2.5 font-sans text-xs font-semibold text-grey-700 transition-colors hover:bg-brand hover:text-white disabled:opacity-50"
          >
            {isLocating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Navigation className="h-3.5 w-3.5" />
            )}
            Ma position
          </button>
        )}

        {/* Loading indicator */}
        {isLoading && !showMyLocation && (
          <div className="absolute right-4">
            <Loader2 className="h-4 w-4 animate-spin text-grey-400" />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1 font-sans text-sm text-error">{error}</p>
      )}

      {/* Dropdown */}
      {showDropdown && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-grey-200 bg-white shadow-xl"
        >
          {predictions.map((pred, i) => (
            <button
              key={pred.placeId}
              type="button"
              onClick={() => handleSelectPrediction(pred)}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-grey-50",
                i !== predictions.length - 1 && "border-b border-grey-100"
              )}
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-grey-400" />
              <span>
                <span className="block font-sans text-sm font-semibold text-grey-900">
                  {pred.mainText}
                </span>
                <span className="block font-sans text-xs text-grey-500">
                  {pred.secondaryText}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
