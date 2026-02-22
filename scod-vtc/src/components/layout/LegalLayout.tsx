import type { ReactNode } from "react";

interface LegalLayoutProps {
  title:      string;
  updatedAt:  string;
  children:   ReactNode;
}

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <div className="bg-white">
      {/* Hero band */}
      <div className="bg-brand-dark py-16">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            Légal
          </p>
          <h1
            className="font-sans font-bold text-balance text-white"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          <p className="mt-4 font-sans text-[13px] font-normal text-white/40">
            Mis à jour le{" "}
            <time className="font-semibold text-white/60">{updatedAt}</time>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="legal-content">{children}</div>
      </div>

      <style>{`
        .legal-content {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.8;
          color: #374151;
        }
        .legal-content h2 {
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #110E40;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content p {
          margin-bottom: 1rem;
        }
        .legal-content ul {
          margin-bottom: 1rem;
          padding-left: 0;
          list-style: none;
        }
        .legal-content ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.4rem;
        }
        .legal-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFC300;
        }
        .legal-content a {
          color: #FFC300;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-content strong {
          color: #111827;
          font-weight: 600;
        }
        .legal-content .note {
          border-left: 3px solid #FFC300;
          background: rgba(255,195,0,0.06);
          padding: 0.875rem 1.25rem;
          border-radius: 0 10px 10px 0;
          margin-bottom: 1rem;
          font-size: 14px;
        }
        .legal-content hr {
          border: none;
          border-top: 1px solid #F3F4F6;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
