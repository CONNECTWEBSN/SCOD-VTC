"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  parseISO,
  startOfDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plane, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReservationData } from "../reservation-types";

// ─── Time slot generation ─────────────────────────────────────────────────────

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 6; h <= 23; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 23 && m > 0) break;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// ─── Custom date picker ───────────────────────────────────────────────────────

interface DatePickerProps {
  selected: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
}

function DatePicker({ selected, onSelect }: DatePickerProps) {
  const [viewDate, setViewDate] = React.useState(() => {
    const today = new Date();
    return startOfMonth(today);
  });

  const today = startOfDay(new Date());

  // Days grid with Monday-first alignment
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Offset: getDay returns 0=Sunday. Convert to Monday-first (0=Monday).
  const firstDayOffset = (getDay(monthStart) + 6) % 7;
  const paddingDays = Array.from({ length: firstDayOffset });

  const selectedDate = selected ? parseISO(selected) : null;

  return (
    <div className="rounded-card border border-grey-100 bg-white p-4 shadow-sm">
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-500 transition-colors hover:bg-grey-100 hover:text-grey-900"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <motion.p
          key={format(viewDate, "yyyy-MM")}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-sm font-bold capitalize text-grey-900"
        >
          {format(viewDate, "MMMM yyyy", { locale: fr })}
        </motion.p>

        <button
          type="button"
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-500 transition-colors hover:bg-grey-100 hover:text-grey-900"
          aria-label="Mois suivant"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="py-1 text-center font-sans text-[10px] font-semibold uppercase tracking-wide text-grey-400"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format(viewDate, "yyyy-MM")}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {/* Empty padding cells */}
          {paddingDays.map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {/* Actual days */}
          {days.map((day) => {
            const isPast = isBefore(day, today);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isTodayDay = isToday(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
                className={cn(
                  "relative flex h-9 w-full items-center justify-center rounded-lg font-sans text-sm transition-all duration-150",
                  isPast && "cursor-not-allowed text-grey-200",
                  !isPast && !isSelected && "text-grey-800 hover:bg-accent/10 hover:text-brand",
                  isTodayDay && !isSelected && "font-bold text-brand",
                  isSelected &&
                    "bg-accent font-bold text-brand shadow-[0_2px_8px_rgba(255,195,0,0.4)]"
                )}
                aria-label={format(day, "d MMMM yyyy", { locale: fr })}
                aria-pressed={isSelected}
              >
                {format(day, "d")}
                {isTodayDay && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Time slot picker ─────────────────────────────────────────────────────────

interface TimeSlotPickerProps {
  selected: string;
  onSelect: (time: string) => void;
}

function TimeSlotPicker({ selected, onSelect }: TimeSlotPickerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll to selected slot on mount
  React.useEffect(() => {
    if (!scrollRef.current || !selected) return;
    const idx = TIME_SLOTS.indexOf(selected);
    if (idx !== -1) {
      const btn = scrollRef.current.querySelectorAll("button")[idx];
      btn?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-wrap gap-2 overflow-y-auto"
      style={{ maxHeight: 200 }}
      role="group"
      aria-label="Créneaux horaires"
    >
      {TIME_SLOTS.map((slot) => {
        const isSelected = slot === selected;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={cn(
              "h-9 min-w-[64px] rounded-lg border px-3 font-sans text-sm font-semibold transition-all duration-150",
              isSelected
                ? "border-accent bg-accent text-brand shadow-[0_2px_8px_rgba(255,195,0,0.35)]"
                : "border-grey-200 bg-white text-grey-700 hover:border-accent/50 hover:bg-accent/5 hover:text-brand"
            )}
            aria-pressed={isSelected}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

// ─── Step component ───────────────────────────────────────────────────────────

interface StepDatetimeProps {
  data: ReservationData;
  onUpdate: (fields: Partial<ReservationData>) => void;
  errors: Partial<Record<"date" | "time", string>>;
}

export function StepDatetime({ data, onUpdate, errors }: StepDatetimeProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900 md:text-3xl">
          Quand souhaitez-vous partir ?
        </h2>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Réservez jusqu&apos;à 1 an à l&apos;avance
        </p>
      </div>

      {/* "Au plus tôt" option */}
      <motion.button
        type="button"
        onClick={() => onUpdate({ isEarliest: !data.isEarliest, date: "", time: "" })}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-4 rounded-card border p-4 text-left transition-all duration-200",
          data.isEarliest
            ? "border-accent bg-accent-soft shadow-[0_0_0_1px_#FFC300]"
            : "border-grey-200 bg-white hover:border-grey-300"
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
            data.isEarliest ? "bg-accent text-brand" : "bg-grey-100 text-grey-500"
          )}
        >
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <p
            className={cn(
              "font-sans text-base font-bold",
              data.isEarliest ? "text-brand" : "text-grey-900"
            )}
          >
            Au plus tôt
          </p>
          <p className="font-sans text-sm text-grey-500">
            Le prochain chauffeur disponible vous est assigné
          </p>
        </div>
        <div className="ml-auto">
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 transition-all",
              data.isEarliest
                ? "border-accent bg-accent"
                : "border-grey-300 bg-white"
            )}
          >
            {data.isEarliest && (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-brand" />
              </div>
            )}
          </div>
        </div>
      </motion.button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-grey-100" />
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-grey-400">
          ou choisissez une date
        </span>
        <div className="h-px flex-1 bg-grey-100" />
      </div>

      {/* Date picker */}
      <AnimatePresence>
        {!data.isEarliest && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-6"
          >
            {/* Date picker calendar */}
            <div>
              <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-grey-500">
                Date
              </p>
              <DatePicker
                selected={data.date}
                onSelect={(date) => onUpdate({ date })}
              />
              {errors.date && (
                <p className="mt-1.5 font-sans text-sm text-error">{errors.date}</p>
              )}
            </div>

            {/* Time slot picker */}
            {data.date && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-grey-500">
                  Heure de départ
                </p>
                <TimeSlotPicker
                  selected={data.time}
                  onSelect={(time) => onUpdate({ time })}
                />
                {errors.time && (
                  <p className="mt-1.5 font-sans text-sm text-error">{errors.time}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flight number (optional) */}
      <div>
        <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-grey-500">
          Numéro de vol{" "}
          <span className="font-400 normal-case text-grey-400">(optionnel)</span>
        </p>
        <div className="relative">
          <Plane className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-400" />
          <input
            type="text"
            value={data.flightNumber}
            onChange={(e) => onUpdate({ flightNumber: e.target.value.toUpperCase() })}
            placeholder="ex: AF 718 / DT 501"
            maxLength={10}
            className="h-[52px] w-full rounded-input border border-grey-200 bg-white pl-11 pr-4 font-sans text-[15px] tracking-wider text-grey-900 placeholder:text-grey-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
          />
        </div>
        <p className="mt-1.5 flex items-start gap-1.5 font-sans text-xs text-grey-400">
          <span className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 text-accent">ℹ</span>
          Renseignez votre numéro de vol pour que votre chauffeur suive les retards
          AIBD automatiquement.
        </p>
      </div>
    </div>
  );
}
