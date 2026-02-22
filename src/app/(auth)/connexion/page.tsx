"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft, RefreshCw } from "lucide-react";
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

const emailSchema = z.object({
  email:    z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

type PhoneData = z.infer<typeof phoneSchema>;
type EmailData = z.infer<typeof emailSchema>;

/* ─────────────────────────────────────────────────────────
   Shared styles
───────────────────────────────────────────────────────── */

const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border-2 bg-white px-4 text-[15px] text-grey-900",
    "placeholder:text-grey-400 outline-none transition-all duration-200",
    "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
    err ? "border-red-400" : "border-grey-200"
  );

const fadeSlide = {
  initial:  { opacity: 0, x: 20 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: -20 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

/* ─────────────────────────────────────────────────────────
   OTP Input (6 digits)
───────────────────────────────────────────────────────── */

function OTPInput({ onComplete }: { onComplete: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null)); // eslint-disable-line react-hooks/rules-of-hooks

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
      const next = pasted.split("");
      setDigits(next);
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
        <blockquote className="mb-6">
          <p className="font-sans text-[22px] font-bold leading-snug text-white">
            "Chauffeur professionnel,{" "}
            <span className="text-accent">tarif fixe garanti.</span>
            <br />
            Partout au Sénégal."
          </p>
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-sans font-bold text-brand">
            M
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white">Moussa Diallo</p>
            <p className="text-[12px] text-white/50">Client fidèle · Dakar</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-accent">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

type Step = "phone" | "otp" | "email";

export default function ConnexionPage() {
  const [step, setStep]         = useState<Step>("phone");
  const [phone, setPhone]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [otpKey, setOtpKey]     = useState(0);
  const [otpError, setOtpError] = useState("");

  /* Phone form */
  const phoneForm = useForm<PhoneData>({ resolver: zodResolver(phoneSchema) });
  const onSendOTP = async (data: PhoneData) => {
    await new Promise((r) => setTimeout(r, 800));
    setPhone(data.phone);
    setStep("otp");
  };

  /* Email form */
  const emailForm = useForm<EmailData>({ resolver: zodResolver(emailSchema) });
  const onEmailLogin = async (_data: EmailData) => {
    await new Promise((r) => setTimeout(r, 1000));
    // redirect → /mon-compte
  };

  /* OTP complete */
  const onOTPComplete = useCallback(async (code: string) => {
    await new Promise((r) => setTimeout(r, 600));
    if (code === "000000") {
      setOtpError("Code incorrect. Vérifiez votre SMS.");
      return;
    }
    // redirect → /mon-compte
  }, []);

  const resendOTP = () => {
    setOtpKey((k) => k + 1);
    setOtpError("");
  };

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
          <div className="mx-auto w-full max-w-[400px]">

            <AnimatePresence mode="wait">

              {/* ── Step: phone ─────────────────────────── */}
              {step === "phone" && (
                <motion.div key="phone" {...fadeSlide}>
                  <h1 className="mb-1 font-sans text-[32px] font-bold text-brand">
                    Bon retour
                  </h1>
                  <p className="mb-8 text-[15px] text-grey-500">
                    Connectez-vous pour gérer vos réservations
                  </p>

                  <form onSubmit={phoneForm.handleSubmit(onSendOTP)} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Numéro de téléphone
                      </label>
                      <div className="flex gap-2">
                        {/* Country code */}
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

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">
                    <span className="h-px flex-1 bg-grey-200" />
                    <span className="text-[12px] font-medium text-grey-400">ou</span>
                    <span className="h-px flex-1 bg-grey-200" />
                  </div>

                  {/* Email / password */}
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-grey-200 bg-white text-[14px] font-semibold text-grey-700 transition-all hover:border-grey-300 hover:bg-grey-50"
                  >
                    Continuer avec un email
                  </button>

                  {/* Google */}
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-grey-200 bg-white text-[14px] font-semibold text-grey-700 transition-all hover:border-grey-300 hover:bg-grey-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </button>
                </motion.div>
              )}

              {/* ── Step: OTP ───────────────────────────── */}
              {step === "otp" && (
                <motion.div key="otp" {...fadeSlide}>
                  <button
                    onClick={() => { setStep("phone"); setOtpError(""); }}
                    className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-grey-500 hover:text-grey-800 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Modifier le numéro
                  </button>

                  <h1 className="mb-1 font-sans text-[28px] font-bold text-brand">
                    Entrez votre code
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

              {/* ── Step: email ─────────────────────────── */}
              {step === "email" && (
                <motion.div key="email" {...fadeSlide}>
                  <button
                    onClick={() => setStep("phone")}
                    className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-grey-500 hover:text-grey-800 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Autres méthodes
                  </button>

                  <h1 className="mb-1 font-sans text-[28px] font-bold text-brand">
                    Connexion par email
                  </h1>
                  <p className="mb-8 text-[14px] text-grey-500">
                    Entrez votre email et mot de passe
                  </p>

                  <form onSubmit={emailForm.handleSubmit(onEmailLogin)} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Email
                      </label>
                      <input
                        {...emailForm.register("email")}
                        type="email"
                        placeholder="vous@email.com"
                        className={inputCls(!!emailForm.formState.errors.email)}
                      />
                      {emailForm.formState.errors.email && (
                        <p className="mt-1 text-[12px] text-red-500">
                          {emailForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="text-[13px] font-semibold text-grey-700">
                          Mot de passe
                        </label>
                        <button
                          type="button"
                          className="text-[12px] font-medium text-accent hover:underline underline-offset-4"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          {...emailForm.register("password")}
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          className={cn(inputCls(!!emailForm.formState.errors.password), "pr-12")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((s) => !s)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-400 transition-colors hover:text-grey-700"
                        >
                          {showPass ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                      {emailForm.formState.errors.password && (
                        <p className="mt-1 text-[12px] text-red-500">
                          {emailForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={emailForm.formState.isSubmitting}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl",
                        "bg-accent font-bold text-[15px] text-brand",
                        "shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-light",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {emailForm.formState.isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      ) : (
                        "Se connecter"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer link */}
            <p className="mt-10 text-center text-[13px] text-grey-500">
              Pas encore de compte ?{" "}
              <Link
                href="/inscription"
                className="font-semibold text-accent hover:underline underline-offset-4"
              >
                Créez-en un
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
