import { Suspense } from "react";
import ReservationClientPage from "@/components/booking/reservation-client-page";

export const metadata = {
  title: "Réservation - SCOD VTC",
  description:
    "Réservez votre chauffeur privé au Sénégal en 5 étapes simples. Tarif fixe garanti, annulation gratuite jusqu'à 24h.",
};

function ReservationFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grey-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-grey-200 border-t-accent" />
        <p className="mt-4 font-sans text-sm text-grey-500">
          Chargement de la réservation…
        </p>
      </div>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<ReservationFallback />}>
      <ReservationClientPage />
    </Suspense>
  );
}
