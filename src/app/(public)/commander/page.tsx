"use client";

import * as React from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { ChevronUp, Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { CommanderForm } from "@/components/booking/commander-form";
import { CommanderMap } from "@/components/booking/commander-map";
import type { AddressValue } from "@/components/booking/address-input";

// ─── Google Maps Loader ────────────────────────────────────────────────────

function useMapsLoader() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey || apiKey === "your_google_maps_api_key") {
      // Graceful degradation : la carte restera vide mais la page fonctionnera
      setLoaded(true);
      return;
    }

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr&region=SN`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setLoaded(true);
      window.dispatchEvent(new Event("google-maps-loaded"));
    };
    document.head.appendChild(script);
  }, []);

  return loaded;
}

// ─── Bottom sheet states (mobile) ─────────────────────────────────────────

type SheetState = "collapsed" | "half" | "expanded";

const SHEET_HEIGHTS: Record<SheetState, string> = {
  collapsed: "80px",
  half: "55vh",
  expanded: "90vh",
};

// ─── Page Component ────────────────────────────────────────────────────────

export default function CommanderPage() {
  useMapsLoader();

  const [pickup, setPickup] = React.useState<AddressValue>({ address: "" });
  const [dropoff, setDropoff] = React.useState<AddressValue>({ address: "" });
  const [sheetState, setSheetState] = React.useState<SheetState>("half");
  const [isMobile, setIsMobile] = React.useState(false);
  const dragControls = useDragControls();
  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-expand sheet when user starts typing
  const handlePickupChange = (val: AddressValue) => {
    setPickup(val);
    if (isMobile && val.address && sheetState === "collapsed") {
      setSheetState("half");
    }
  };

  const handleDropoffChange = (val: AddressValue) => {
    setDropoff(val);
    if (isMobile && val.address && sheetState !== "expanded") {
      setSheetState("expanded");
    }
  };

  const cycleSheet = () => {
    setSheetState((s) => {
      if (s === "collapsed") return "half";
      if (s === "half") return "expanded";
      return "half";
    });
  };

  // ── Desktop : split screen layout ───────────────────────────────────────
  if (!isMobile) {
    return (
      <div className="flex h-screen w-full overflow-hidden pt-[68px]">
        {/* Left panel — form */}
        <div className="relative z-10 flex h-full w-[55%] flex-col overflow-y-auto border-r border-grey-100 bg-white shadow-2xl">
          <div className="flex-1 px-10 py-10 xl:px-14 xl:py-12">
            <CommanderForm
              onPickupChange={handlePickupChange}
              onDropoffChange={handleDropoffChange}
            />
          </div>
        </div>

        {/* Right panel — map */}
        <div className="relative h-full flex-1 bg-[#0d1117]">
          <CommanderMap pickup={pickup} dropoff={dropoff} className="h-full" />

          {/* Empty state hint */}
          <AnimatePresence>
            {!pickup.latitude && !dropoff.latitude && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0d1117]/80 px-8 py-6 backdrop-blur-sm text-center">
                  <p className="font-sans text-xl font-bold text-white">
                    Saisissez vos adresses
                  </p>
                  <p className="mt-1 font-sans text-sm text-white/50">
                    Le trajet apparaîtra ici en temps réel
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── Mobile : map background + bottom sheet ───────────────────────────────
  return (
    <div className="relative h-screen w-full overflow-hidden pt-[68px]">
      {/* Map — full screen background */}
      <div className="absolute inset-0 top-[68px]">
        <CommanderMap pickup={pickup} dropoff={dropoff} className="h-full" />
      </div>

      {/* Gradient fade at bottom for readability */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/10 to-transparent" />

      {/* Bottom sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden rounded-t-[24px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.2)]"
        animate={{ height: SHEET_HEIGHTS[sheetState] }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_e, info) => {
          if (info.velocity.y < -400 || info.offset.y < -60) {
            setSheetState((s) => (s === "half" ? "expanded" : "expanded"));
          } else if (info.velocity.y > 400 || info.offset.y > 60) {
            setSheetState((s) =>
              s === "expanded" ? "half" : "collapsed"
            );
          }
        }}
      >
        {/* Drag handle */}
        <button
          type="button"
          className="flex w-full flex-col items-center pt-3 pb-2 focus:outline-none"
          onClick={cycleSheet}
          onPointerDown={(e) => dragControls.start(e)}
          aria-label={sheetState === "expanded" ? "Réduire" : "Agrandir"}
        >
          <div className="h-1 w-10 rounded-full bg-grey-200" />
        </button>

        {/* Collapsed state : teaser */}
        <AnimatePresence mode="wait">
          {sheetState === "collapsed" ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between px-5 pb-4"
            >
              <p className="font-sans text-xl font-bold text-grey-900">
                Où allez-vous ?
              </p>
              <button
                type="button"
                onClick={() => setSheetState("half")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent"
                aria-label="Ouvrir le formulaire"
              >
                <ChevronUp className="h-5 w-5 text-brand" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={formRef}
              className="overflow-y-auto px-5 pb-8"
              style={{ maxHeight: "calc(90vh - 48px)" }}
            >
              <CommanderForm
                onPickupChange={handlePickupChange}
                onDropoffChange={handleDropoffChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
