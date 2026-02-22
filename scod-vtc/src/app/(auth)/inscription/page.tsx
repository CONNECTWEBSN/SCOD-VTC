"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Schemas
───────────────────────────────────────────────────────── */

const phoneSchema = z.object({
  phone: z
    .string()
    .min(8, "Numéro invalide")
    .regex(/^\d+$/, "Chiffres uniquement"),
});

const profileSchema = z.object({
  firstName: z.string().min(2, "Requis"),
  lastName:  z.string().min(2, "Requis"),
  email:     z.string().email("Email invalide").or(z.literal("")),
  terms:     z.literal(true, { errorMap: () => ({ message: "Veuillez accepter les CGV" }) }),
});

type PhoneData    = z.infer<typeof phoneSchema>;
type ProfileData  = z.infer<typeof profileSchema>;

/* ─────────────────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────────────────── */

const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border-2 bg-white px-4 text-[15px] text-grey-900",
    "placeholder:text-grey-400 outline-none transition-all duration-200",
    "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
    err ? "border-red-400" : "border-grey-200"
  );

const fadeSlide = {
  initial:    { opacity: 0, x: 20 },
  animate:    { opacity: 1, x: 0 },
  exit:       { opacity: 0, x: -20 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

/* ─────────────────────────────────────────────────────────
   OTP Input (6 digits)
───────────────────────────────────────────────────────── */

function OTPInput({ onComplete }: { onComplete: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleChange = (idx: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    if (char && idx < 5) refs[idx + 1].current?.focus();
    if (next.every((d) => d !== "")) onComplete(next.join(""));
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      refs[5].current?.focus();
      onComplete(pasted);
    }
    e.preventDefault();
  };

  useEffect(() => { refs[0].current?.focus(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "h-13 w-full rounded-xl border-2 text-center font-sans text-[22px] font-bold text-grey-900",
            "outline-none transition-all duration-200 caret-transparent",
            "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
            d ? "border-accent bg-accent/5" : "border-grey-200 bg-white"
          )}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Countdown
───────────────────────────────────────────────────────── */

function Countdown({ seconds, onResend }: { seconds: number; onResend: () => void }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  return remaining > 0 ? (
    <p className="text-center text-[13px] text-grey-400">
      Renvoyer le code dans{" "}
      <span className="font-semibold text-grey-700">{remaining}s</span>
    </p>
  ) : (
    <button
      type="button"
      onClick={onResend}
      className="mx-auto flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline underline-offset-4"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      Renvoyer le code
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Progress indicator
───────────────────────────────────────────────────────── */

const STEP_LABELS = ["Téléphone", "Vérification", "Profil"];

function StepProgress({ current }: { current: number }) {
  return (
    <div className="mb-10 flex items-center gap-0">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="relative flex w-full items-center">
            {/* left bar */}
            {i > 0 && (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-colors duration-500",
                  i <= current ? "bg-accent" : "bg-grey-200"
                )}
              />
            )}
            {/* dot */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-sans text-[13px] font-bold transition-all duration-300",
                i < current
                  ? "border-accent bg-accent text-brand"
                  : i === current
                  ? "border-accent bg-white text-accent shadow-lg shadow-accent/20"
                  : "border-grey-200 bg-white text-grey-400"
              )}
            >
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            {/* right bar */}
            {i < STEP_LABELS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-colors duration-500",
                  i < current ? "bg-accent" : "bg-grey-200"
                )}
              />
            )}
          </div>
          <span
            className={cn(
              "text-[11px] font-semibold transition-colors",
              i === current ? "text-accent" : "text-grey-400"
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Right panel (decorative)
───────────────────────────────────────────────────────── */

function AuthPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2">
      <Image
        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80"
        alt="Véhicule premium SCOD VTC"
        fill
        priority
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,9,32,0.92) 0%, rgba(10,9,32,0.70) 50%, rgba(10,9,32,0.45) 100%)",
        }}
      />
      <div className="relative flex flex-col justify-end p-12">
        {/* Features list */}
        <div className="mb-8 space-y-3">
          {[
            "Réservation en 30 secondes",
            "Tarif fixe garanti en FCFA",
            "Chauffeur confirmé immédiatement",
            "Suivi en temps réel",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                <CheckCircle2 className="h-3 w-3 text-brand" />
              </span>
              <span className="text-[14px] font-medium text-white/80">{f}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["O", "F", "I"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-dark bg-accent font-sans text-[13px] font-bold text-brand"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-white/60">
              <span className="font-semibold text-white">2 000+ clients</span> nous font déjà confiance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

type Step = 0 | 1 | 2 | 3;

export default function InscriptionPage() {
  const [step, setStep]       = useState<Step>(0);
  const [phone, setPhone]     = useState("");
  const [otpKey, setOtpKey]   = useState(0);
  const [otpError, setOtpError] = useState("");
  const [done, setDone]       = useState(false);

  /* Phone form */
  const phoneForm = useForm<PhoneData>({ resolver: zodResolver(phoneSchema) });

  const onSendOTP = async (data: PhoneData) => {
    await new Promise((r) => setTimeout(r, 800));
    setPhone(data.phone);
    setStep(1);
  };

  /* OTP verification */
  const onOTPComplete = async (code: string) => {
    await new Promise((r) => setTimeout(r, 600));
    if (code === "000000") {
      setOtpError("Code incorrect. Vérifiez votre SMS.");
      return;
    }
    setOtpError("");
    setStep(2);
  };

  /* Profile form */
  const profileForm = useForm<ProfileData>({ resolver: zodResolver(profileSchema) });

  const onCreateAccount = async (_data: ProfileData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setDone(true);
  };

  const resendOTP = () => {
    setOtpKey((k) => k + 1);
    setOtpError("");
  };

  if (done) {
    return (
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col items-center justify-center px-5 lg:w-1/2 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="font-sans text-[28px] font-bold text-brand">
              Compte créé !
            </h1>
            <p className="max-w-sm text-[14px] leading-relaxed text-grey-500">
              Bienvenue chez SCOD VTC. Votre compte est prêt. Réservez votre première course dès maintenant.
            </p>
            <Link
              href="/commander"
              className="mt-2 flex h-12 items-center gap-2 rounded-xl bg-accent px-8 font-bold text-[15px] text-brand shadow-lg shadow-accent/25 transition-colors hover:bg-accent-light"
            >
              Réserver maintenant
            </Link>
          </motion.div>
        </div>
        <AuthPanel />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Left: form ────────────────────────────────── */}
      <div className="flex w-full flex-col px-5 py-10 sm:px-10 lg:w-1/2 lg:px-16">
        {/* Logo */}
        <Link href="/" className="mb-10 block">
          <span className="font-sans text-[22px] font-bold tracking-tight text-brand">
            SCOD <span className="text-accent">VTC</span>
          </span>
        </Link>

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-[420px]">

            {/* Progress */}
            <StepProgress current={step > 2 ? 2 : step} />

            <AnimatePresence mode="wait">

              {/* ── Step 0: phone ──────────────────────── */}
              {step === 0 && (
                <motion.div key="phone" {...fadeSlide}>
                  <h1 className="mb-1 font-sans text-[30px] font-bold text-brand">
                    Créez votre compte
                  </h1>
                  <p className="mb-8 text-[14px] text-grey-500">
                    Réservez votre premier trajet en 30 secondes
                  </p>

                  <form onSubmit={phoneForm.handleSubmit(onSendOTP)} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Numéro de téléphone
                      </label>
                      <div className="flex gap-2">
                        <div className="flex h-12 shrink-0 items-center gap-2 rounded-xl border-2 border-grey-200 bg-grey-50 px-3">
                          <span className="text-[18px] leading-none">🇸🇳</span>
                          <span className="text-[14px] font-semibold text-grey-700">+221</span>
                        </div>
                        <input
                          {...phoneForm.register("phone")}
                          type="tel"
                          placeholder="77 000 00 00"
                          className={inputCls(!!phoneForm.formState.errors.phone)}
                        />
                      </div>
                      {phoneForm.formState.errors.phone && (
                        <p className="mt-1 text-[12px] text-red-500">
                          {phoneForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={phoneForm.formState.isSubmitting}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl",
                        "bg-accent font-bold text-[15px] text-brand",
                        "shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-light",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {phoneForm.formState.isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      ) : (
                        "Recevoir le code"
                      )}
                    </motion.button>
                  </form>

                  {/* Google */}
                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-grey-200" />
                    <span className="text-[12px] font-medium text-grey-400">ou</span>
                    <span className="h-px flex-1 bg-grey-200" />
                  </div>

                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-grey-200 bg-white text-[14px] font-semibold text-grey-700 transition-all hover:border-grey-300 hover:bg-grey-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84z"/>
                    </svg>
                    Continuer avec Google
                  </button>
                </motion.div>
              )}

              {/* ── Step 1: OTP ────────────────────────── */}
              {step === 1 && (
                <motion.div key="otp" {...fadeSlide}>
                  <button
                    onClick={() => { setStep(0); setOtpError(""); }}
                    className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-grey-500 hover:text-grey-800 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Modifier le numéro
                  </button>

                  <h1 className="mb-1 font-sans text-[28px] font-bold text-brand">
                    Vérifiez votre numéro
                  </h1>
                  <p className="mb-8 text-[14px] text-grey-500">
                    Code envoyé au{" "}
                    <span className="font-semibold text-grey-800">+221 {phone}</span>
                  </p>

                  <OTPInput key={otpKey} onComplete={onOTPComplete} />

                  {otpError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-center text-[13px] text-red-500"
                    >
                      {otpError}
                    </motion.p>
                  )}

                  <div className="mt-6">
                    <Countdown key={otpKey} seconds={30} onResend={resendOTP} />
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: profile ────────────────────── */}
              {step === 2 && (
                <motion.div key="profile" {...fadeSlide}>
                  <h1 className="mb-1 font-sans text-[28px] font-bold text-brand">
                    Complétez votre profil
                  </h1>
                  <p className="mb-8 text-[14px] text-grey-500">
                    Dernière étape — quelques informations pour personnaliser votre expérience.
                  </p>

                  <form onSubmit={profileForm.handleSubmit(onCreateAccount)} className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                          Prénom *
                        </label>
                        <input
                          {...profileForm.register("firstName")}
                          placeholder="Moussa"
                          className={inputCls(!!profileForm.formState.errors.firstName)}
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="mt-1 text-[12px] text-red-500">
                            {profileForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                          Nom *
                        </label>
                        <input
                          {...profileForm.register("lastName")}
                          placeholder="Sarr"
                          className={inputCls(!!profileForm.formState.errors.lastName)}
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="mt-1 text-[12px] text-red-500">
                            {profileForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Email{" "}
                        <span className="font-normal text-grey-400">(optionnel)</span>
                      </label>
                      <input
                        {...profileForm.register("email")}
                        type="email"
                        placeholder="moussa@email.com"
                        className={inputCls(!!profileForm.formState.errors.email)}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="mt-1 text-[12px] text-red-500">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div>
                      <label className="flex cursor-pointer items-start gap-3">
                        <div className="relative mt-0.5">
                          <input
                            {...profileForm.register("terms")}
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-grey-300 bg-white transition-colors checked:border-accent checked:bg-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                          />
                          <CheckCircle2 className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-brand opacity-0 transition-opacity peer-checked:opacity-100" />
                        </div>
                        <span className="text-[13px] leading-relaxed text-grey-600">
                          J&apos;accepte les{" "}
                          <Link
                            href="/legal/cgv"
                            className="font-semibold text-accent underline underline-offset-4"
                            target="_blank"
                          >
                            Conditions Générales de Vente
                          </Link>{" "}
                          et la{" "}
                          <Link
                            href="/legal/confidentialite"
                            className="font-semibold text-accent underline underline-offset-4"
                            target="_blank"
                          >
                            Politique de Confidentialité
                          </Link>
                        </span>
                      </label>
                      {profileForm.formState.errors.terms && (
                        <p className="mt-2 text-[12px] text-red-500">
                          {profileForm.formState.errors.terms.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={profileForm.formState.isSubmitting}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl",
                        "bg-accent font-bold text-[15px] text-brand",
                        "shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-light",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {profileForm.formState.isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      ) : (
                        "Créer mon compte"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer link */}
            <p className="mt-10 text-center text-[13px] text-grey-500">
              Déjà un compte ?{" "}
              <Link
                href="/connexion"
                className="font-semibold text-accent hover:underline underline-offset-4"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: decorative panel ───────────────────── */}
      <AuthPanel />
    </div>
  );
}
