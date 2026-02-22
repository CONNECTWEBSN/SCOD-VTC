Tu es un senior product designer avec 10 ans d'experience chez Uber, Stripe et Linear.
Je te donne le code HTML de la page d'accueil actuelle du site SCOD VTC — un service de
chauffeur privé premium au Sénégal.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SCOD VTC — Réservez votre VTC partout au Sénégal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">

<style>
/* ─── Reset ──────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --brand:        #110e40;
  --brand-dark:   #0a0920;
  --brand-hover:  #1c1870;
  --accent:       #ffc300;
  --accent-light: #ffd440;
  --accent-soft:  rgba(255,195,0,0.10);
  --white:        #ffffff;
  --grey:         rgba(255,255,255,0.55);
  --ease:         cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Barlow', sans-serif;
  background: var(--brand);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 52px;
  height: 68px;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(17,14,64,0.08);
}

.nav__logo img {
  height: 38px;
  width: auto;
  display: block;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.nav__item { position: relative; }

.nav__links a {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--brand);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
}
.nav__links a:hover { color: var(--accent); }

/* Dropdown */
.nav__dropdown {
  position: absolute;
  top: calc(100% + 14px);
  left: 0;
  min-width: 260px;
  background: var(--brand);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 8px 0;
  box-shadow: 0 20px 48px rgba(0,0,0,0.35);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: all 0.2s var(--ease);
  z-index: 200;
}

.nav__dropdown::before {
  content: '';
  position: absolute;
  top: -6px; left: 20px;
  width: 12px; height: 12px;
  background: var(--brand);
  border-left: 1px solid rgba(255,255,255,0.08);
  border-top: 1px solid rgba(255,255,255,0.08);
  transform: rotate(45deg);
}

.nav__item:hover .nav__dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav__dropdown a {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px 18px;
  color: var(--white);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.15s;
  text-align: left;
}
.nav__dropdown a:last-child { border-bottom: none; }
.nav__dropdown a:hover { background: rgba(255,195,0,0.07); color: var(--white); }

.dd-title { font-size: 13.5px; font-weight: 600; color: var(--white); transition: color 0.15s; }
.dd-desc  { font-size: 11.5px; font-weight: 400; color: rgba(255,255,255,0.75); line-height: 1.4; }
.nav__dropdown a:hover .dd-title { color: var(--accent); }

.nav__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav__help,
.nav__login {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--brand);
  text-decoration: none;
  transition: color 0.2s;
}
.nav__help:hover,
.nav__login:hover { color: var(--accent); }

.nav__cta {
  padding: 9px 20px;
  background: var(--accent);
  color: var(--brand);
  font-size: 13.5px;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
}
.nav__cta:hover { background: var(--accent-light); }

/* Chevron SVG */
.chevron {
  display: inline;
  vertical-align: middle;
  margin-left: 3px;
  opacity: 0.6;
}

/* ════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  padding-top: 68px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Image BG plein écran */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* Overlay sombre premium — laisse respirer l'image à droite */
.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right,
      rgba(10,9,32,0.92) 0%,
      rgba(10,9,32,0.82) 35%,
      rgba(10,9,32,0.45) 60%,
      rgba(10,9,32,0.15) 100%
    );
}

/* Grain texture overlay */
.hero__grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.025;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Contenu positionné à gauche */
.hero__left {
  position: relative;
  z-index: 2;
  padding: 80px 72px 72px;
  width: 680px;
  max-width: 62%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(42px, 4.8vw, 66px);
  max-width: 560px;
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 16px;
}

.hero__headline .accent { color: var(--accent); }

.hero__sub {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255,255,255,0.72);
  margin-bottom: 32px;
  max-width: 440px;
}

/* ── Formulaire ── */
.hero__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
  max-width: 620px;
}

.hf__field {
  position: relative;
  display: flex;
  align-items: center;
}

.hf__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.hf__input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  font-family: 'Barlow', sans-serif;
  font-size: 14.5px;
  font-weight: 400;
  color: #ffffff;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  -webkit-appearance: none;
  backdrop-filter: blur(8px);
}

.hf__input::placeholder { color: rgba(255,255,255,0.38); }
.hf__input:focus {
  border-color: var(--accent);
  background: rgba(255,195,0,0.06);
  box-shadow: 0 0 0 3px rgba(255,195,0,0.15);
}

.hf__row {
  display: grid;
  grid-template-columns: 1fr 0.55fr 0.55fr;
  gap: 10px;
}

.hf__field--no-icon .hf__input { padding-left: 16px; }

.hf__btn {
  width: 100%;
  padding: 16px;
  background: var(--accent);
  color: var(--brand);
  font-family: 'Barlow', sans-serif;
  font-size: 15.5px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
  transition: background 0.2s, transform 0.15s;
  letter-spacing: 0.01em;
}
.hf__btn:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}

/* ── Badges réassurance ── */
.hero__badges {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px 20px;
  max-width: 620px;
}

.hbadge {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 400;
  color: rgba(255,255,255,0.72);
  line-height: 1.3;
}

.hbadge svg { flex-shrink: 0; }



/* Animations entrée */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero__headline { animation: fadeUp 0.7s var(--ease) 0.1s both; }
.hero__sub      { animation: fadeUp 0.7s var(--ease) 0.2s both; }
.hero__form     { animation: fadeUp 0.7s var(--ease) 0.3s both; }
.hero__badges   { animation: fadeUp 0.7s var(--ease) 0.45s both; }

/* ── Responsive ── */
@media (max-width: 960px) {
  .hero__left { padding: 60px 36px; max-width: 100%; width: 100%; }
  .navbar { padding: 0 28px; }
  .nav__links, .nav__right .nav__help, .nav__right .nav__login { display: none; }
}
@media (max-width: 600px) {
  .hero__left { padding: 48px 20px; }
  .hero__badges { grid-template-columns: 1fr; }
  .hf__row { grid-template-columns: 1fr 1fr; }
}

/* ── Custom Date + Time selects ─────────────────────────────────── */
.hf__select {
  width: 100%;
  padding: 14px 36px 14px 44px;
  font-family: 'Barlow', sans-serif;
  font-size: 14.5px;
  font-weight: 400;
  color: #ffffff;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  -webkit-appearance: none;
  backdrop-filter: blur(8px);
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.5)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.hf__select:focus {
  border-color: var(--accent);
  background-color: rgba(255,195,0,0.06);
  box-shadow: 0 0 0 3px rgba(255,195,0,0.15);
}

.hf__select option {
  background: #110e40;
  color: #ffffff;
  font-family: 'Barlow', sans-serif;
}

.hf__field--no-icon .hf__select {
  padding-left: 16px;
}

/* Limiter hauteur dropdown heure/minutes */
.hf__row .hf__select {
  max-height: 42px;
}
.hf__row select option {
  padding: 4px 8px;
  font-size: 13px;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--accent:#ffc300;--accent-glow:rgba(255,195,0,0.18);--bg:#070b14;--bg-card:#0d1322;--border:#1a2235;--ease:cubic-bezier(0.4,0,0.2,1)}
html{scroll-behavior:smooth}
body{font-family:'Barlow',sans-serif;background:var(--bg);color:#f8fafc;-webkit-font-smoothing:antialiased}

/* ── Gradient titre ── */
.gradient-text{background:linear-gradient(135deg,#ffc300 0%,#ff9500 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── Section ── */
.section{padding:100px 0}
.container{max-width:1200px;margin:0 auto;padding:0 48px}

/* ── Header ── */
.section-tag{font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px}
.tag-line{display:inline-block;width:36px;height:2px;background:var(--accent);border-radius:2px}
.section-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(38px,5vw,60px);font-weight:900;line-height:1.05;letter-spacing:-0.01em;color:#f8fafc;text-align:center;margin-bottom:18px}
.section-sub{font-size:17px;color:#ffffff;max-width:560px;margin:0 auto 64px;line-height:1.7;text-align:center;font-weight:400}

/* ── Filtres ── */
.filters{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-bottom:72px}
.pill{padding:11px 26px;border-radius:9999px;font-family:'Barlow',sans-serif;font-size:14px;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,0.1);background:transparent;color:#ffffff;transition:all 280ms ease;letter-spacing:0.01em}
.pill:hover{background:rgba(255,255,255,0.07);color:#fff;border-color:rgba(255,255,255,0.18)}
.pill.active{background:var(--accent);color:#0d1322;font-weight:700;border-color:transparent;box-shadow:0 0 0 1px var(--accent),0 6px 20px var(--accent-glow)}
.pill:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ── Grille ── */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

/* ── Card ── */
.vehicle-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform 450ms var(--ease),box-shadow 450ms var(--ease),border-color 280ms ease;display:flex;flex-direction:column}
.vehicle-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 20px 56px rgba(0,0,0,0.5),0 0 0 1px rgba(255,195,0,0.18);border-color:rgba(255,195,0,0.22)}
.vehicle-card:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ── Image zone ── */
.card-img-zone{height:200px;background:linear-gradient(145deg,#0d1322 0%,#111827 100%);position:relative;display:flex;align-items:center;justify-content:center;padding:20px;overflow:hidden;flex-shrink:0}
.card-img-zone::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(255,195,0,0.05) 0%,transparent 65%);pointer-events:none}
.card-img{width:100%;height:100%;object-fit:contain;transition:transform 450ms ease;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.6));position:relative;z-index:1}
.vehicle-card:hover .card-img{transform:translateY(-8px) scale(1.04)}

/* ── Badge ── */
.badge{position:absolute;top:12px;left:12px;padding:3px 9px;border-radius:5px;font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;z-index:2}
.badge-electric{background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.22)}
.badge-luxe{background:rgba(255,195,0,0.13);color:#ffc300;border:1px solid rgba(255,195,0,0.22)}
.badge-premium{background:rgba(139,92,246,0.15);color:#a78bfa;border:1px solid rgba(167,139,250,0.22)}
.badge-accessible{background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(96,165,250,0.22)}

/* ── Contenu ── */
.card-content{padding:22px 22px 20px;display:flex;flex-direction:column;flex:1}
.card-title{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;color:#f8fafc;margin-bottom:7px;letter-spacing:-0.01em}
.card-desc{font-size:13px;color:#ffffff;line-height:1.6;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1}
.card-meta{display:flex;gap:16px;margin-bottom:14px}
.meta-item{display:flex;align-items:center;gap:5px;font-size:12.5px;color:#ffffff}
.card-price{display:flex;align-items:baseline;gap:6px;margin-bottom:16px}
.price-from{font-size:11px;color:#ffffff}
.price-val{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;color:var(--accent);line-height:1}

/* ── CTA card ── */
.card-cta{position:relative;overflow:hidden;border:1px solid var(--accent);color:var(--accent);background:transparent;border-radius:8px;padding:12px 16px;font-family:'Barlow',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;letter-spacing:0.02em;transition:color 280ms ease}
.card-cta::before{content:'';position:absolute;inset:0;background:var(--accent);transform:translateX(-101%);transition:transform 280ms ease;z-index:0}
.card-cta:hover::before{transform:translateX(0)}
.card-cta:hover{color:#0d1322}
.card-cta span{position:relative;z-index:1}
.card-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ── Scroll reveal ── */
.reveal{opacity:0;transform:translateY(24px);transition:opacity 550ms ease,transform 550ms var(--ease)}
.reveal.visible{opacity:1;transform:translateY(0)}

/* ════════════════════════════════════════
   MODAL
════════════════════════════════════════ */
.modal-overlay{position:fixed;inset:0;background:rgba(5,8,18,0.88);backdrop-filter:blur(6px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease}
.modal-overlay.open{opacity:1;visibility:visible}
.modal-box{background:#ffffff;border-radius:18px;width:100%;max-width:660px;max-height:88vh;overflow-y:auto;position:relative;transform:translateY(18px) scale(0.97);transition:transform 0.35s cubic-bezier(0.22,1,0.36,1);scrollbar-width:thin;scrollbar-color:rgba(17,14,64,0.12) transparent}
.modal-overlay.open .modal-box{transform:translateY(0) scale(1)}
.modal-close{position:absolute;top:16px;right:16px;width:34px;height:34px;background:rgba(17,14,64,0.07);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#110e40;transition:background 0.2s;z-index:10}
.modal-close:hover{background:rgba(17,14,64,0.13)}
.modal-header{padding:26px 26px 18px;border-bottom:1px solid rgba(17,14,64,0.07)}
.modal-name{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;color:#110e40;letter-spacing:-0.01em;margin-bottom:3px;padding-right:40px}
.modal-type{font-size:13.5px;color:rgba(17,14,64,0.45);font-weight:500}
.modal-stats{display:flex;padding:18px 26px;border-bottom:1px solid rgba(17,14,64,0.07);flex-wrap:wrap}
.modal-stat{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:70px;padding:0 12px;border-right:1px solid rgba(17,14,64,0.07)}
.modal-stat:first-child{padding-left:0}
.modal-stat:last-child{border-right:none}
.modal-stat-icon{color:rgba(17,14,64,0.3)}
.modal-stat-val{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:800;color:#110e40;line-height:1}
.modal-stat-lbl{font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(17,14,64,0.38)}
.modal-sec{padding:18px 26px;border-bottom:1px solid rgba(17,14,64,0.07)}
.modal-sec-ttl{font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(17,14,64,0.45);margin-bottom:13px}
.chauffeur-row{display:flex;align-items:center;justify-content:space-between;gap:10px}
.chauffeur-info{display:flex;align-items:center;gap:11px}
.chauffeur-av{width:42px;height:42px;background:#110e40;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;color:#ffc300;flex-shrink:0}
.chauffeur-name{font-size:14.5px;font-weight:700;color:#110e40;display:flex;align-items:center;gap:6px}
.chauffeur-rating{font-size:12.5px;font-weight:600;color:#d97706}
.chauffeur-meta{font-size:11.5px;color:rgba(17,14,64,0.42);margin-top:2px}
.chauffeur-status{font-size:11.5px;font-weight:600;color:#16a34a;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.18);padding:4px 10px;border-radius:20px;flex-shrink:0}
.equip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px 12px}
.equip-item{display:flex;align-items:center;gap:6px;font-size:12.5px;color:rgba(17,14,64,0.72)}
.equip-check{width:15px;height:15px;flex-shrink:0;background:rgba(255,195,0,0.1);border-radius:3px;display:flex;align-items:center;justify-content:center}
.rules-wrap{margin:0 26px 18px;border:1px solid rgba(17,14,64,0.09);border-radius:10px;overflow:hidden}
.rules-hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;cursor:pointer;background:rgba(17,14,64,0.025);user-select:none}
.rules-hdr-title{display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;color:#110e40}
.rules-body{padding:0 15px;display:none}
.rules-body.open{display:block}
.rule-row{display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:1px solid rgba(17,14,64,0.05)}
.rule-row:last-child{border-bottom:none}
.rule-t{font-size:13px;color:#110e40;font-weight:500}
.rule-s{font-size:11.5px;color:rgba(17,14,64,0.48);margin-top:1px}
.suppl-row{display:flex;justify-content:space-between;font-size:12.5px;padding:5px 0;border-bottom:1px solid rgba(17,14,64,0.05);color:rgba(17,14,64,0.65)}
.suppl-row:last-child{border-bottom:none}
.suppl-val{font-weight:600;color:#110e40}
.modal-footer{padding:18px 26px 22px;position:sticky;bottom:0;background:#fff;border-top:1px solid rgba(17,14,64,0.07)}
.modal-reserve{width:100%;padding:15px;background:#110e40;color:#fff;font-family:'Barlow',sans-serif;font-size:15px;font-weight:700;border:none;border-radius:10px;cursor:pointer;transition:background 0.2s,transform 0.15s;letter-spacing:0.01em}
.modal-reserve:hover{background:#1c1870;transform:translateY(-1px)}

/* Grain */
.grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:160px}

@media(max-width:1024px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.grid{grid-template-columns:1fr}.container{padding:0 20px}.section{padding:72px 0}.equip-grid{grid-template-columns:repeat(2,1fr)}}


  /* ── Base ─────────────────────────────────────── */
  * { box-sizing: border-box; }
  body { font-family: 'Barlow', sans-serif; -webkit-font-smoothing: antialiased; }

  /* ── Gradient titre ── */
  .gradient-text {
    background: linear-gradient(135deg, #ffc300 0%, #ff9500 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Toggle ── */
  .toggle-wrap {
    display: inline-flex;
    background: #e5e7eb;
    padding: 5px;
    border-radius: 12px;
    gap: 4px;
  }
  .toggle-btn {
    padding: 10px 32px;
    border-radius: 8px;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    color: #6b7280;
    background: transparent;
    transition: all 200ms ease;
    white-space: nowrap;
  }
  .toggle-btn:hover { color: #111827; }
  .toggle-btn.active {
    background: #ffffff;
    color: #111827;
    font-weight: 600;
    box-shadow: 0 1px 6px rgba(0,0,0,0.12);
  }
  .toggle-btn:focus-visible { outline: 2px solid #ffc300; outline-offset: 2px; }

  /* ── Cards ── */
  .service-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 500ms cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,195,0,0.15);
    border-color: rgba(255,195,0,0.3);
  }
  .service-card.popular {
    border-color: rgba(255,195,0,0.5);
    box-shadow: 0 4px 16px rgba(255,195,0,0.12), 0 0 0 2px rgba(255,195,0,0.18);
  }
  .service-card:focus-visible { outline: 2px solid #ffc300; outline-offset: 3px; }

  /* ── Image zone ── */
  .card-img-wrap {
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;
  }
  .card-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 600ms ease;
  }
  .service-card:hover .card-img-wrap img { transform: scale(1.06); }

  /* ── Badge populaire ── */
  .badge-popular {
    position: absolute;
    top: 14px; left: 14px;
    background: #ffc300;
    color: #0d1322;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 9999px;
    z-index: 2;
  }

  /* ── Tag durée ── */
  .duration-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    padding: 4px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
    width: fit-content;
  }

  /* ── Feature list ── */
  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13.5px;
    color: #374151;
  }
  .feature-check {
    width: 18px; height: 18px;
    background: rgba(255,195,0,0.12);
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── CTA card ── */
  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 11px 22px;
    background: #110e40;
    color: #ffffff;
    font-family: 'Barlow', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 250ms ease, transform 250ms ease;
    white-space: nowrap;
    text-decoration: none;
  }
  .card-cta:hover {
    background: #ff9500;
    color: #0d1322;
    transform: scale(1.04);
  }
  .card-cta:focus-visible { outline: 2px solid #ffc300; outline-offset: 2px; }

  /* ── Scroll reveal ── */
  .reveal-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 550ms ease, transform 550ms cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Fade filter ── */
  .card-wrap {
    transition: opacity 280ms ease, transform 280ms ease;
  }
  .card-wrap.hidden-card {
    display: none !important;
  }

  /* ── Section label dot ── */
  .label-dot {
    display: inline-block;
    width: 7px; height: 7px;
    background: #ffc300;
    border-radius: 50%;
    margin-right: 7px;
    vertical-align: middle;
  }


@media (max-width: 1024px) {
  #services-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 640px) {
  #services-grid { grid-template-columns: 1fr !important; }
  section#solutions { padding: 80px 20px !important; }
}


* { box-sizing: border-box; }
body { font-family: 'Barlow', sans-serif; -webkit-font-smoothing: antialiased; }
.gradient-text { background: linear-gradient(135deg,#ffc300 0%,#ff9500 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.label-dot { display:inline-block; width:7px; height:7px; background:#ffc300; border-radius:50%; margin-right:6px; vertical-align:middle; }
.cta-contact { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; background:#110e40; color:#fff; font-family:'Barlow',sans-serif; font-size:15px; font-weight:600; border:none; border-radius:10px; cursor:pointer; text-decoration:none; transition:background 250ms ease,transform 200ms ease,box-shadow 200ms ease; }
.cta-contact:hover { background:#ff9500; color:#0d1322; transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,149,0,0.28); }
.cta-contact:focus-visible { outline:2px solid #ffc300; outline-offset:3px; }
.tel-link { display:block; margin-top:14px; font-size:13.5px; color:#6b7280; text-decoration:none; transition:color 200ms ease; }
.tel-link:hover { color:#ffc300; }
.stats-card { margin-top:44px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:14px; padding:4px 24px; }
.stat-row { display:flex; align-items:center; gap:14px; padding:16px 0; }
.stat-row + .stat-row { border-top:1px solid #e5e7eb; }
.stat-icon { width:38px; height:38px; background:rgba(255,195,0,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.faq-item { border-top:1px solid #e5e7eb; }
.faq-item:last-child { border-bottom:1px solid #e5e7eb; }
.faq-btn { width:100%; display:flex; justify-content:space-between; align-items:center; gap:16px; padding:24px 0; background:none; border:none; cursor:pointer; text-align:left; font-family:'Barlow',sans-serif; }
.faq-btn:focus-visible { outline:2px solid #ffc300; outline-offset:2px; border-radius:4px; }
.faq-q { font-size:17px; font-weight:600; color:#111827; line-height:1.4; flex:1; transition:color 200ms ease; text-align:left; }
.faq-btn:hover .faq-q { color:#110e40; }
.faq-icon { width:28px; height:28px; border-radius:8px; background:rgba(17,14,64,0.06); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform 320ms cubic-bezier(0.4,0,0.2,1),background 200ms ease; color:#6b7280; }
.faq-item.open .faq-icon { transform:rotate(180deg); background:rgba(255,195,0,0.12); color:#ffc300; }
.faq-answer { overflow:hidden; max-height:0; transition:max-height 400ms cubic-bezier(0.4,0,0.2,1); }
.faq-inner { padding-bottom:24px; font-size:15px; color:#4b5563; line-height:1.75; }
.faq-inner strong { color:#111827; font-weight:600; }
.faq-inner p { margin-bottom:10px; }
.faq-inner p:last-child { margin-bottom:0; }
.faq-block { background:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; padding:14px 18px; margin:10px 0; font-size:14px; }
.faq-block-title { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#110e40; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.faq-ol { padding-left:18px; display:flex; flex-direction:column; gap:5px; }
.faq-ol li { list-style:decimal; font-size:14px; }
.faq-ul { padding-left:0; display:flex; flex-direction:column; gap:5px; }
.faq-ul li { list-style:none; display:flex; align-items:flex-start; gap:8px; font-size:14px; }
.faq-ul li::before { content:''; display:block; width:6px; height:6px; background:#ffc300; border-radius:50%; margin-top:8px; flex-shrink:0; }
.faq-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:12px 0; }
.faq-tip { background:rgba(255,195,0,0.07); border:1px solid rgba(255,195,0,0.2); border-radius:8px; padding:11px 14px; font-size:13.5px; color:#92400e; margin-top:12px; display:flex; gap:9px; align-items:flex-start; }
.faq-gamme { background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px 16px; display:flex; gap:12px; align-items:flex-start; margin-bottom:8px; }
.gamme-tag { font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; letter-spacing:0.05em; flex-shrink:0; margin-top:1px; }
.reveal { opacity:0; transform:translateY(18px); transition:opacity 500ms ease,transform 500ms ease; }
.reveal.visible { opacity:1; transform:translateY(0); }
@media(max-width:1023px){#faq-sticky{position:static!important}#faq-left{width:100%!important}}
@media(max-width:767px){#faq-layout{flex-direction:column!important;gap:40px!important}section#faq{padding:80px 20px!important}.faq-grid-2{grid-template-columns:1fr!important}}

</style>
</head>
<body>

<!-- ════════════════════════════════════════════
     NAVBAR
════════════════════════════════════════════ -->
<nav class="navbar">

  <a href="#" class="nav__logo">
    <img src="https://vtc-senegal-2-d16o23d5j-ams-projects-0e97d1df.vercel.app/logo.png"
         alt="SCOD VTC" />
  </a>

  <ul class="nav__links">

    <!-- Commander -->
    <li class="nav__item">
      <a href="#">Commander
        <svg class="chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.3"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="nav__dropdown">
        <a href="#">
          <span class="dd-title">Commander une course</span>
          <span class="dd-desc">Trouvez un chauffeur disponible maintenant.</span>
        </a>
        <a href="#">
          <span class="dd-title">Réserver une course</span>
          <span class="dd-desc">Programmez votre trajet, tarif fixe garanti.</span>
        </a>
        <a href="#">
          <span class="dd-title">Louer un véhicule</span>
          <span class="dd-desc">Chauffeur à disposition demi-journée ou journée.</span>
        </a>
      </div>
    </li>

    <!-- Particuliers -->
    <li class="nav__item">
      <a href="#">Particuliers
        <svg class="chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.3"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="nav__dropdown">
        <a href="#">
          <span class="dd-title">Transfert aéroport</span>
          <span class="dd-desc">Prise en charge AIBD, retard de vol sans frais.</span>
        </a>
        <a href="#">
          <span class="dd-title">Transport événementiel</span>
          <span class="dd-desc">Mariages, baptêmes, cérémonies — réservé à l'avance.</span>
        </a>
      </div>
    </li>

    <!-- Entreprises -->
    <li class="nav__item">
      <a href="scod-vtc-hero__17_.html">Entreprises
        <svg class="chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.3"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="nav__dropdown">
        <a href="#">
          <span class="dd-title">Trajets professionnels</span>
          <span class="dd-desc">Gérez les déplacements de vos collaborateurs.</span>
        </a>
        <a href="#">
          <span class="dd-title">Chauffeur à disposition</span>
          <span class="dd-desc">Missions, accueil clients et partenaires.</span>
        </a>
      </div>
    </li>

    <li class="nav__item"><a href="#">Pourquoi SCOD VTC</a></li>
    <li class="nav__item"><a href="#">FAQ</a></li>

  </ul>

  <div class="nav__right">
    <a href="#" class="nav__help">Assistance</a>
    <a href="#" class="nav__login">Se connecter</a>
    <a href="#" class="nav__cta">Réserver maintenant</a>
  </div>

</nav>


<!-- ════════════════════════════════════════════
     HERO
════════════════════════════════════════════ -->
<section class="hero">

  <!-- Background image plein écran -->
  <div class="hero__bg">
    <img
      src="file:///C:/Users/wopal/Documents/Projets/SCOD%20VTC/public/cars/SCOD%20VTC.jpg"
      alt="SCOD VTC Sénégal"
    />
  </div>
  <div class="hero__grain"></div>

  <!-- Gauche : formulaire -->
  <div class="hero__left">

    <h1 class="hero__headline">
      Réservez votre VTC <span class="accent">partout au Sénégal</span>
    </h1>

    <p class="hero__sub">
      Aéroport AIBD, déplacements pro, événements familiaux —
      tarif fixe en FCFA, chauffeur confirmé dès la réservation.
    </p>

    <!-- Formulaire -->
    <div class="hero__form">

      <!-- Départ -->
      <div class="hf__field">
        <span class="hf__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="7" r="2.5" stroke="#ffc300" stroke-width="1.5"/>
            <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"
                  stroke="#ffc300" stroke-width="1.5"/>
          </svg>
        </span>
        <input type="text" class="hf__input" placeholder="Adresse de départ">
      </div>

      <!-- Arrivée -->
      <div class="hf__field">
        <span class="hf__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"/>
            <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.15)" stroke-width="1.2"/>
          </svg>
        </span>
        <input type="text" class="hf__input" placeholder="Adresse d'arrivée">
      </div>

      <!-- Date + Heure -->
      <div class="hf__row">
        <div class="hf__field">
          <span class="hf__icon">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1.5" y="2.5" width="12" height="11" rx="1.5"
                    stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
              <path d="M5 1v3M10 1v3M1.5 6.5h12"
                    stroke="rgba(255,255,255,0.45)" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <select class="hf__select">
            <option value="">Aujourd'hui</option>
<option value="2026-02-16">Lun 16 fév 2026</option>
<option value="2026-02-17">Mar 17 fév 2026</option>
<option value="2026-02-18">Mer 18 fév 2026</option>
<option value="2026-02-19">Jeu 19 fév 2026</option>
<option value="2026-02-20">Ven 20 fév 2026</option>
<option value="2026-02-21">Sam 21 fév 2026</option>
<option value="2026-02-22">Dim 22 fév 2026</option>
<option value="2026-02-23">Lun 23 fév 2026</option>
<option value="2026-02-24">Mar 24 fév 2026</option>
<option value="2026-02-25">Mer 25 fév 2026</option>
<option value="2026-02-26">Jeu 26 fév 2026</option>
<option value="2026-02-27">Ven 27 fév 2026</option>
<option value="2026-02-28">Sam 28 fév 2026</option>
<option value="2026-03-01">Dim 1 mar 2026</option>
<option value="2026-03-02">Lun 2 mar 2026</option>
<option value="2026-03-03">Mar 3 mar 2026</option>
<option value="2026-03-04">Mer 4 mar 2026</option>
<option value="2026-03-05">Jeu 5 mar 2026</option>
<option value="2026-03-06">Ven 6 mar 2026</option>
<option value="2026-03-07">Sam 7 mar 2026</option>
<option value="2026-03-08">Dim 8 mar 2026</option>
<option value="2026-03-09">Lun 9 mar 2026</option>
<option value="2026-03-10">Mar 10 mar 2026</option>
<option value="2026-03-11">Mer 11 mar 2026</option>
<option value="2026-03-12">Jeu 12 mar 2026</option>
<option value="2026-03-13">Ven 13 mar 2026</option>
<option value="2026-03-14">Sam 14 mar 2026</option>
<option value="2026-03-15">Dim 15 mar 2026</option>
<option value="2026-03-16">Lun 16 mar 2026</option>
<option value="2026-03-17">Mar 17 mar 2026</option>
<option value="2026-03-18">Mer 18 mar 2026</option>
<option value="2026-03-19">Jeu 19 mar 2026</option>
<option value="2026-03-20">Ven 20 mar 2026</option>
<option value="2026-03-21">Sam 21 mar 2026</option>
<option value="2026-03-22">Dim 22 mar 2026</option>
<option value="2026-03-23">Lun 23 mar 2026</option>
<option value="2026-03-24">Mar 24 mar 2026</option>
<option value="2026-03-25">Mer 25 mar 2026</option>
<option value="2026-03-26">Jeu 26 mar 2026</option>
<option value="2026-03-27">Ven 27 mar 2026</option>
<option value="2026-03-28">Sam 28 mar 2026</option>
<option value="2026-03-29">Dim 29 mar 2026</option>
<option value="2026-03-30">Lun 30 mar 2026</option>
<option value="2026-03-31">Mar 31 mar 2026</option>
<option value="2026-04-01">Mer 1 avr 2026</option>
<option value="2026-04-02">Jeu 2 avr 2026</option>
<option value="2026-04-03">Ven 3 avr 2026</option>
<option value="2026-04-04">Sam 4 avr 2026</option>
<option value="2026-04-05">Dim 5 avr 2026</option>
<option value="2026-04-06">Lun 6 avr 2026</option>
<option value="2026-04-07">Mar 7 avr 2026</option>
<option value="2026-04-08">Mer 8 avr 2026</option>
<option value="2026-04-09">Jeu 9 avr 2026</option>
<option value="2026-04-10">Ven 10 avr 2026</option>
<option value="2026-04-11">Sam 11 avr 2026</option>
<option value="2026-04-12">Dim 12 avr 2026</option>
<option value="2026-04-13">Lun 13 avr 2026</option>
<option value="2026-04-14">Mar 14 avr 2026</option>
<option value="2026-04-15">Mer 15 avr 2026</option>
<option value="2026-04-16">Jeu 16 avr 2026</option>
<option value="2026-04-17">Ven 17 avr 2026</option>
<option value="2026-04-18">Sam 18 avr 2026</option>
<option value="2026-04-19">Dim 19 avr 2026</option>
<option value="2026-04-20">Lun 20 avr 2026</option>
<option value="2026-04-21">Mar 21 avr 2026</option>
<option value="2026-04-22">Mer 22 avr 2026</option>
<option value="2026-04-23">Jeu 23 avr 2026</option>
<option value="2026-04-24">Ven 24 avr 2026</option>
<option value="2026-04-25">Sam 25 avr 2026</option>
<option value="2026-04-26">Dim 26 avr 2026</option>
<option value="2026-04-27">Lun 27 avr 2026</option>
<option value="2026-04-28">Mar 28 avr 2026</option>
<option value="2026-04-29">Mer 29 avr 2026</option>
<option value="2026-04-30">Jeu 30 avr 2026</option>
<option value="2026-05-01">Ven 1 mai 2026</option>
<option value="2026-05-02">Sam 2 mai 2026</option>
<option value="2026-05-03">Dim 3 mai 2026</option>
<option value="2026-05-04">Lun 4 mai 2026</option>
<option value="2026-05-05">Mar 5 mai 2026</option>
<option value="2026-05-06">Mer 6 mai 2026</option>
<option value="2026-05-07">Jeu 7 mai 2026</option>
<option value="2026-05-08">Ven 8 mai 2026</option>
<option value="2026-05-09">Sam 9 mai 2026</option>
<option value="2026-05-10">Dim 10 mai 2026</option>
<option value="2026-05-11">Lun 11 mai 2026</option>
<option value="2026-05-12">Mar 12 mai 2026</option>
<option value="2026-05-13">Mer 13 mai 2026</option>
<option value="2026-05-14">Jeu 14 mai 2026</option>
<option value="2026-05-15">Ven 15 mai 2026</option>
<option value="2026-05-16">Sam 16 mai 2026</option>
<option value="2026-05-17">Dim 17 mai 2026</option>
<option value="2026-05-18">Lun 18 mai 2026</option>
<option value="2026-05-19">Mar 19 mai 2026</option>
<option value="2026-05-20">Mer 20 mai 2026</option>
<option value="2026-05-21">Jeu 21 mai 2026</option>
<option value="2026-05-22">Ven 22 mai 2026</option>
<option value="2026-05-23">Sam 23 mai 2026</option>
<option value="2026-05-24">Dim 24 mai 2026</option>
<option value="2026-05-25">Lun 25 mai 2026</option>
<option value="2026-05-26">Mar 26 mai 2026</option>
<option value="2026-05-27">Mer 27 mai 2026</option>
<option value="2026-05-28">Jeu 28 mai 2026</option>
<option value="2026-05-29">Ven 29 mai 2026</option>
<option value="2026-05-30">Sam 30 mai 2026</option>
<option value="2026-05-31">Dim 31 mai 2026</option>
<option value="2026-06-01">Lun 1 jun 2026</option>
<option value="2026-06-02">Mar 2 jun 2026</option>
<option value="2026-06-03">Mer 3 jun 2026</option>
<option value="2026-06-04">Jeu 4 jun 2026</option>
<option value="2026-06-05">Ven 5 jun 2026</option>
<option value="2026-06-06">Sam 6 jun 2026</option>
<option value="2026-06-07">Dim 7 jun 2026</option>
<option value="2026-06-08">Lun 8 jun 2026</option>
<option value="2026-06-09">Mar 9 jun 2026</option>
<option value="2026-06-10">Mer 10 jun 2026</option>
<option value="2026-06-11">Jeu 11 jun 2026</option>
<option value="2026-06-12">Ven 12 jun 2026</option>
<option value="2026-06-13">Sam 13 jun 2026</option>
<option value="2026-06-14">Dim 14 jun 2026</option>
<option value="2026-06-15">Lun 15 jun 2026</option>
<option value="2026-06-16">Mar 16 jun 2026</option>
<option value="2026-06-17">Mer 17 jun 2026</option>
<option value="2026-06-18">Jeu 18 jun 2026</option>
<option value="2026-06-19">Ven 19 jun 2026</option>
<option value="2026-06-20">Sam 20 jun 2026</option>
<option value="2026-06-21">Dim 21 jun 2026</option>
<option value="2026-06-22">Lun 22 jun 2026</option>
<option value="2026-06-23">Mar 23 jun 2026</option>
<option value="2026-06-24">Mer 24 jun 2026</option>
<option value="2026-06-25">Jeu 25 jun 2026</option>
<option value="2026-06-26">Ven 26 jun 2026</option>
<option value="2026-06-27">Sam 27 jun 2026</option>
<option value="2026-06-28">Dim 28 jun 2026</option>
<option value="2026-06-29">Lun 29 jun 2026</option>
<option value="2026-06-30">Mar 30 jun 2026</option>
<option value="2026-07-01">Mer 1 jul 2026</option>
<option value="2026-07-02">Jeu 2 jul 2026</option>
<option value="2026-07-03">Ven 3 jul 2026</option>
<option value="2026-07-04">Sam 4 jul 2026</option>
<option value="2026-07-05">Dim 5 jul 2026</option>
<option value="2026-07-06">Lun 6 jul 2026</option>
<option value="2026-07-07">Mar 7 jul 2026</option>
<option value="2026-07-08">Mer 8 jul 2026</option>
<option value="2026-07-09">Jeu 9 jul 2026</option>
<option value="2026-07-10">Ven 10 jul 2026</option>
<option value="2026-07-11">Sam 11 jul 2026</option>
<option value="2026-07-12">Dim 12 jul 2026</option>
<option value="2026-07-13">Lun 13 jul 2026</option>
<option value="2026-07-14">Mar 14 jul 2026</option>
<option value="2026-07-15">Mer 15 jul 2026</option>
<option value="2026-07-16">Jeu 16 jul 2026</option>
<option value="2026-07-17">Ven 17 jul 2026</option>
<option value="2026-07-18">Sam 18 jul 2026</option>
<option value="2026-07-19">Dim 19 jul 2026</option>
<option value="2026-07-20">Lun 20 jul 2026</option>
<option value="2026-07-21">Mar 21 jul 2026</option>
<option value="2026-07-22">Mer 22 jul 2026</option>
<option value="2026-07-23">Jeu 23 jul 2026</option>
<option value="2026-07-24">Ven 24 jul 2026</option>
<option value="2026-07-25">Sam 25 jul 2026</option>
<option value="2026-07-26">Dim 26 jul 2026</option>
<option value="2026-07-27">Lun 27 jul 2026</option>
<option value="2026-07-28">Mar 28 jul 2026</option>
<option value="2026-07-29">Mer 29 jul 2026</option>
<option value="2026-07-30">Jeu 30 jul 2026</option>
<option value="2026-07-31">Ven 31 jul 2026</option>
<option value="2026-08-01">Sam 1 août 2026</option>
<option value="2026-08-02">Dim 2 août 2026</option>
<option value="2026-08-03">Lun 3 août 2026</option>
<option value="2026-08-04">Mar 4 août 2026</option>
<option value="2026-08-05">Mer 5 août 2026</option>
<option value="2026-08-06">Jeu 6 août 2026</option>
<option value="2026-08-07">Ven 7 août 2026</option>
<option value="2026-08-08">Sam 8 août 2026</option>
<option value="2026-08-09">Dim 9 août 2026</option>
<option value="2026-08-10">Lun 10 août 2026</option>
<option value="2026-08-11">Mar 11 août 2026</option>
<option value="2026-08-12">Mer 12 août 2026</option>
<option value="2026-08-13">Jeu 13 août 2026</option>
<option value="2026-08-14">Ven 14 août 2026</option>
<option value="2026-08-15">Sam 15 août 2026</option>
<option value="2026-08-16">Dim 16 août 2026</option>
<option value="2026-08-17">Lun 17 août 2026</option>
<option value="2026-08-18">Mar 18 août 2026</option>
<option value="2026-08-19">Mer 19 août 2026</option>
<option value="2026-08-20">Jeu 20 août 2026</option>
<option value="2026-08-21">Ven 21 août 2026</option>
<option value="2026-08-22">Sam 22 août 2026</option>
<option value="2026-08-23">Dim 23 août 2026</option>
<option value="2026-08-24">Lun 24 août 2026</option>
<option value="2026-08-25">Mar 25 août 2026</option>
<option value="2026-08-26">Mer 26 août 2026</option>
<option value="2026-08-27">Jeu 27 août 2026</option>
<option value="2026-08-28">Ven 28 août 2026</option>
<option value="2026-08-29">Sam 29 août 2026</option>
<option value="2026-08-30">Dim 30 août 2026</option>
<option value="2026-08-31">Lun 31 août 2026</option>
<option value="2026-09-01">Mar 1 sep 2026</option>
<option value="2026-09-02">Mer 2 sep 2026</option>
<option value="2026-09-03">Jeu 3 sep 2026</option>
<option value="2026-09-04">Ven 4 sep 2026</option>
<option value="2026-09-05">Sam 5 sep 2026</option>
<option value="2026-09-06">Dim 6 sep 2026</option>
<option value="2026-09-07">Lun 7 sep 2026</option>
<option value="2026-09-08">Mar 8 sep 2026</option>
<option value="2026-09-09">Mer 9 sep 2026</option>
<option value="2026-09-10">Jeu 10 sep 2026</option>
<option value="2026-09-11">Ven 11 sep 2026</option>
<option value="2026-09-12">Sam 12 sep 2026</option>
<option value="2026-09-13">Dim 13 sep 2026</option>
<option value="2026-09-14">Lun 14 sep 2026</option>
<option value="2026-09-15">Mar 15 sep 2026</option>
<option value="2026-09-16">Mer 16 sep 2026</option>
<option value="2026-09-17">Jeu 17 sep 2026</option>
<option value="2026-09-18">Ven 18 sep 2026</option>
<option value="2026-09-19">Sam 19 sep 2026</option>
<option value="2026-09-20">Dim 20 sep 2026</option>
<option value="2026-09-21">Lun 21 sep 2026</option>
<option value="2026-09-22">Mar 22 sep 2026</option>
<option value="2026-09-23">Mer 23 sep 2026</option>
<option value="2026-09-24">Jeu 24 sep 2026</option>
<option value="2026-09-25">Ven 25 sep 2026</option>
<option value="2026-09-26">Sam 26 sep 2026</option>
<option value="2026-09-27">Dim 27 sep 2026</option>
<option value="2026-09-28">Lun 28 sep 2026</option>
<option value="2026-09-29">Mar 29 sep 2026</option>
<option value="2026-09-30">Mer 30 sep 2026</option>
<option value="2026-10-01">Jeu 1 oct 2026</option>
<option value="2026-10-02">Ven 2 oct 2026</option>
<option value="2026-10-03">Sam 3 oct 2026</option>
<option value="2026-10-04">Dim 4 oct 2026</option>
<option value="2026-10-05">Lun 5 oct 2026</option>
<option value="2026-10-06">Mar 6 oct 2026</option>
<option value="2026-10-07">Mer 7 oct 2026</option>
<option value="2026-10-08">Jeu 8 oct 2026</option>
<option value="2026-10-09">Ven 9 oct 2026</option>
<option value="2026-10-10">Sam 10 oct 2026</option>
<option value="2026-10-11">Dim 11 oct 2026</option>
<option value="2026-10-12">Lun 12 oct 2026</option>
<option value="2026-10-13">Mar 13 oct 2026</option>
<option value="2026-10-14">Mer 14 oct 2026</option>
<option value="2026-10-15">Jeu 15 oct 2026</option>
<option value="2026-10-16">Ven 16 oct 2026</option>
<option value="2026-10-17">Sam 17 oct 2026</option>
<option value="2026-10-18">Dim 18 oct 2026</option>
<option value="2026-10-19">Lun 19 oct 2026</option>
<option value="2026-10-20">Mar 20 oct 2026</option>
<option value="2026-10-21">Mer 21 oct 2026</option>
<option value="2026-10-22">Jeu 22 oct 2026</option>
<option value="2026-10-23">Ven 23 oct 2026</option>
<option value="2026-10-24">Sam 24 oct 2026</option>
<option value="2026-10-25">Dim 25 oct 2026</option>
<option value="2026-10-26">Lun 26 oct 2026</option>
<option value="2026-10-27">Mar 27 oct 2026</option>
<option value="2026-10-28">Mer 28 oct 2026</option>
<option value="2026-10-29">Jeu 29 oct 2026</option>
<option value="2026-10-30">Ven 30 oct 2026</option>
<option value="2026-10-31">Sam 31 oct 2026</option>
<option value="2026-11-01">Dim 1 nov 2026</option>
<option value="2026-11-02">Lun 2 nov 2026</option>
<option value="2026-11-03">Mar 3 nov 2026</option>
<option value="2026-11-04">Mer 4 nov 2026</option>
<option value="2026-11-05">Jeu 5 nov 2026</option>
<option value="2026-11-06">Ven 6 nov 2026</option>
<option value="2026-11-07">Sam 7 nov 2026</option>
<option value="2026-11-08">Dim 8 nov 2026</option>
<option value="2026-11-09">Lun 9 nov 2026</option>
<option value="2026-11-10">Mar 10 nov 2026</option>
<option value="2026-11-11">Mer 11 nov 2026</option>
<option value="2026-11-12">Jeu 12 nov 2026</option>
<option value="2026-11-13">Ven 13 nov 2026</option>
<option value="2026-11-14">Sam 14 nov 2026</option>
<option value="2026-11-15">Dim 15 nov 2026</option>
<option value="2026-11-16">Lun 16 nov 2026</option>
<option value="2026-11-17">Mar 17 nov 2026</option>
<option value="2026-11-18">Mer 18 nov 2026</option>
<option value="2026-11-19">Jeu 19 nov 2026</option>
<option value="2026-11-20">Ven 20 nov 2026</option>
<option value="2026-11-21">Sam 21 nov 2026</option>
<option value="2026-11-22">Dim 22 nov 2026</option>
<option value="2026-11-23">Lun 23 nov 2026</option>
<option value="2026-11-24">Mar 24 nov 2026</option>
<option value="2026-11-25">Mer 25 nov 2026</option>
<option value="2026-11-26">Jeu 26 nov 2026</option>
<option value="2026-11-27">Ven 27 nov 2026</option>
<option value="2026-11-28">Sam 28 nov 2026</option>
<option value="2026-11-29">Dim 29 nov 2026</option>
<option value="2026-11-30">Lun 30 nov 2026</option>
<option value="2026-12-01">Mar 1 déc 2026</option>
<option value="2026-12-02">Mer 2 déc 2026</option>
<option value="2026-12-03">Jeu 3 déc 2026</option>
<option value="2026-12-04">Ven 4 déc 2026</option>
<option value="2026-12-05">Sam 5 déc 2026</option>
<option value="2026-12-06">Dim 6 déc 2026</option>
<option value="2026-12-07">Lun 7 déc 2026</option>
<option value="2026-12-08">Mar 8 déc 2026</option>
<option value="2026-12-09">Mer 9 déc 2026</option>
<option value="2026-12-10">Jeu 10 déc 2026</option>
<option value="2026-12-11">Ven 11 déc 2026</option>
<option value="2026-12-12">Sam 12 déc 2026</option>
<option value="2026-12-13">Dim 13 déc 2026</option>
<option value="2026-12-14">Lun 14 déc 2026</option>
<option value="2026-12-15">Mar 15 déc 2026</option>
<option value="2026-12-16">Mer 16 déc 2026</option>
<option value="2026-12-17">Jeu 17 déc 2026</option>
<option value="2026-12-18">Ven 18 déc 2026</option>
<option value="2026-12-19">Sam 19 déc 2026</option>
<option value="2026-12-20">Dim 20 déc 2026</option>
<option value="2026-12-21">Lun 21 déc 2026</option>
<option value="2026-12-22">Mar 22 déc 2026</option>
<option value="2026-12-23">Mer 23 déc 2026</option>
<option value="2026-12-24">Jeu 24 déc 2026</option>
<option value="2026-12-25">Ven 25 déc 2026</option>
<option value="2026-12-26">Sam 26 déc 2026</option>
<option value="2026-12-27">Dim 27 déc 2026</option>
<option value="2026-12-28">Lun 28 déc 2026</option>
<option value="2026-12-29">Mar 29 déc 2026</option>
<option value="2026-12-30">Mer 30 déc 2026</option>
<option value="2026-12-31">Jeu 31 déc 2026</option>
<option value="2027-01-01">Ven 1 jan 2027</option>
<option value="2027-01-02">Sam 2 jan 2027</option>
<option value="2027-01-03">Dim 3 jan 2027</option>
<option value="2027-01-04">Lun 4 jan 2027</option>
<option value="2027-01-05">Mar 5 jan 2027</option>
<option value="2027-01-06">Mer 6 jan 2027</option>
<option value="2027-01-07">Jeu 7 jan 2027</option>
<option value="2027-01-08">Ven 8 jan 2027</option>
<option value="2027-01-09">Sam 9 jan 2027</option>
<option value="2027-01-10">Dim 10 jan 2027</option>
<option value="2027-01-11">Lun 11 jan 2027</option>
<option value="2027-01-12">Mar 12 jan 2027</option>
<option value="2027-01-13">Mer 13 jan 2027</option>
<option value="2027-01-14">Jeu 14 jan 2027</option>
<option value="2027-01-15">Ven 15 jan 2027</option>
<option value="2027-01-16">Sam 16 jan 2027</option>
<option value="2027-01-17">Dim 17 jan 2027</option>
<option value="2027-01-18">Lun 18 jan 2027</option>
<option value="2027-01-19">Mar 19 jan 2027</option>
<option value="2027-01-20">Mer 20 jan 2027</option>
<option value="2027-01-21">Jeu 21 jan 2027</option>
<option value="2027-01-22">Ven 22 jan 2027</option>
<option value="2027-01-23">Sam 23 jan 2027</option>
<option value="2027-01-24">Dim 24 jan 2027</option>
<option value="2027-01-25">Lun 25 jan 2027</option>
<option value="2027-01-26">Mar 26 jan 2027</option>
<option value="2027-01-27">Mer 27 jan 2027</option>
<option value="2027-01-28">Jeu 28 jan 2027</option>
<option value="2027-01-29">Ven 29 jan 2027</option>
<option value="2027-01-30">Sam 30 jan 2027</option>
<option value="2027-01-31">Dim 31 jan 2027</option>
<option value="2027-02-01">Lun 1 fév 2027</option>
<option value="2027-02-02">Mar 2 fév 2027</option>
<option value="2027-02-03">Mer 3 fév 2027</option>
<option value="2027-02-04">Jeu 4 fév 2027</option>
<option value="2027-02-05">Ven 5 fév 2027</option>
<option value="2027-02-06">Sam 6 fév 2027</option>
<option value="2027-02-07">Dim 7 fév 2027</option>
<option value="2027-02-08">Lun 8 fév 2027</option>
<option value="2027-02-09">Mar 9 fév 2027</option>
<option value="2027-02-10">Mer 10 fév 2027</option>
<option value="2027-02-11">Jeu 11 fév 2027</option>
<option value="2027-02-12">Ven 12 fév 2027</option>
<option value="2027-02-13">Sam 13 fév 2027</option>
<option value="2027-02-14">Dim 14 fév 2027</option>
<option value="2027-02-15">Lun 15 fév 2027</option>

          </select>
        </div>
        <div class="hf__field">
          <span class="hf__icon">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
              <path d="M7.5 4.5v3l2 1.5" stroke="rgba(255,255,255,0.45)"
                    stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <select class="hf__select">
            <option value="">Au plus tôt</option>
<option value="0">00h</option>
<option value="1">01h</option>
<option value="2">02h</option>
<option value="3">03h</option>
<option value="4">04h</option>
<option value="5">05h</option>
<option value="6">06h</option>
<option value="7">07h</option>
<option value="8">08h</option>
<option value="9">09h</option>
<option value="10">10h</option>
<option value="11">11h</option>
<option value="12">12h</option>
<option value="13">13h</option>
<option value="14">14h</option>
<option value="15">15h</option>
<option value="16">16h</option>
<option value="17">17h</option>
<option value="18">18h</option>
<option value="19">19h</option>
<option value="20">20h</option>
<option value="21">21h</option>
<option value="22">22h</option>
<option value="23">23h</option>
          </select>
        </div>
        <div class="hf__field hf__field--no-icon">
          <select class="hf__select">
            <option value="0">00</option>
<option value="5">05</option>
<option value="10">10</option>
<option value="15">15</option>
<option value="20">20</option>
<option value="25">25</option>
<option value="30">30</option>
<option value="35">35</option>
<option value="40">40</option>
<option value="45">45</option>
<option value="50">50</option>
<option value="55">55</option>
          </select>
        </div>
      </div>

      <!-- Bouton -->
      <button class="hf__btn">
        Consulter les prix
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

    </div>

    <!-- Badges réassurance -->
    <div class="hero__badges">

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L8.8 5H13L9.8 7.5 11 12 7 9.5 3 12 4.2 7.5 1 5H5.2L7 1Z" fill="#ffc300"/>
        </svg>
        Chauffeur confirmé dès la réservation
      </span>

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
          <path d="M4.5 7l2 2 3-3" stroke="#ffc300" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Tarif fixe FCFA garanti
      </span>

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="2" width="11" height="10" rx="1.5"
                stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
          <path d="M5 1v2M9 1v2M1.5 6h11"
                stroke="rgba(255,255,255,0.45)" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        Réservation jusqu'à 1 an à l'avance
      </span>

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 9l2-2.5 3 4L10 4l2 3" stroke="#ffc300" stroke-width="1.4"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Adaptation retard vol AIBD
      </span>

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="3" y="5.5" width="8" height="7" rx="1"
                stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
          <path d="M5 5.5V4.5a2 2 0 014 0v1"
                stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
          <circle cx="7" cy="9" r="1" fill="#ffc300"/>
        </svg>
        Paiement 100% sécurisé
      </span>

      <span class="hbadge">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1C4.5 1 2.5 3 2.5 5.5c0 3.5 4.5 7.5 4.5 7.5S11.5 9 11.5 5.5C11.5 3 9.5 1 7 1z"
                stroke="rgba(255,255,255,0.45)" stroke-width="1.3"/>
          <circle cx="7" cy="5.5" r="1.3" fill="#ffc300"/>
        </svg>
        Partout au Sénégal
      </span>

    </div>

  </div>

</section>

<style>
/* ════════════════════════════════════════════════
   SECTION 2 — 3 CARTES ARGUMENTS
════════════════════════════════════════════════ */
.arguments {
  background: #ffffff;
  padding: 96px 72px;
  position: relative;
}

.arguments__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.arg__card {
  background: #ffffff;
  border: 1px solid rgba(17,14,64,0.08);
  border-radius: 14px;
  padding: 36px 32px 32px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s, transform 0.25s;
}

.arg__card:hover {
  box-shadow: 0 12px 40px rgba(17,14,64,0.10);
  transform: translateY(-3px);
}

.arg__tag {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #110e40;
  letter-spacing: 0.02em;
  margin-bottom: 14px;
}

.arg__tag::before {
  content: '';
  display: block;
  width: 10px; height: 10px;
  background: #ffc300;
  border-radius: 2px;
  flex-shrink: 0;
}

.arg__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #110e40;
  margin-bottom: 16px;
}

.arg__body {
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.75;
  color: rgba(17,14,64,0.6);
  flex: 1;
  text-align: justify;
}

.arg__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 28px;
  font-family: 'Barlow', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: #110e40;
  text-decoration: none;
  padding-top: 20px;
  border-top: 1px solid rgba(17,14,64,0.07);
  transition: color 0.2s, gap 0.2s;
}

.arg__link:hover {
  color: #ffc300;
  gap: 10px;
}

@media (max-width: 900px) {
  .arguments { padding: 72px 32px; }
  .arguments__grid { grid-template-columns: 1fr 1fr; gap: 16px; }
}
@media (max-width: 600px) {
  .arguments { padding: 60px 20px; }
}
</style>

<section class="arguments" id="arguments">
  <div class="arguments__grid">

    <!-- Card 1 — Transfert aéroport -->
    <div class="arg__card">
      <span class="arg__tag">✈️ Transfert aéroport · AIBD</span>
      <h3 class="arg__title">Prise en charge à l'AIBD, même en cas de retard</h3>
      <p class="arg__body">
        Arrivée ou départ depuis l'Aéroport International Blaise Diagne —
        votre chauffeur surveille votre vol en temps réel et vous attend
        sans frais supplémentaires, même si votre avion a du retard.
        Tarif fixe en FCFA, confirmé avant votre départ.
      </p>
      <a href="#" class="arg__link">
        En savoir plus <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <!-- Card 2 — Transport entreprise -->
    <div class="arg__card">
      <span class="arg__tag">💼 Transport d'entreprise</span>
      <h3 class="arg__title">Gérez les déplacements de vos collaborateurs</h3>
      <p class="arg__body">
        Trajets domicile-travail, missions professionnelles, accueil de
        partenaires ou clients VIP — SCOD VTC propose un service dédié
        aux entreprises avec tableau de bord, facturation mensuelle
        et chauffeurs formés aux standards professionnels.
      </p>
      <a href="scod-vtc-hero__17_.html" class="arg__link">
        En savoir plus <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <!-- Card 3 — Transport événementiel -->
    <div class="arg__card">
      <span class="arg__tag">🎉 Transport événementiel</span>
      <h3 class="arg__title">Mariages, cérémonies et événements familiaux</h3>
      <p class="arg__body">
        Baptêmes, mariages, galas ou sorties en famille —
        réservez votre chauffeur à l'avance pour votre événement.
        Véhicule climatisé, chauffeur en tenue, ponctualité garantie.
        Faites de chaque moment une expérience mémorable.
      </p>
      <a href="#" class="arg__link">
        En savoir plus <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <!-- Card 4 — Louer un véhicule -->
    <div class="arg__card">
      <span class="arg__tag">🔑 Louer un véhicule</span>
      <h3 class="arg__title">Chauffeur à votre disposition, à l'heure</h3>
      <p class="arg__body">
        Besoin d'un chauffeur pour une demi-journée, une journée complète
        ou une mission longue durée ? Louez un véhicule avec chauffeur
        professionnel et concentrez-vous sur l'essentiel. Idéal pour
        les missions terrain, les délégations ou les visites de sites.
      </p>
      <a href="#" class="arg__link">
        En savoir plus <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

  </div>
</section>


<section class="section" id="flotte">

  <!-- Décor glow -->
  <div class="container" style="position:relative;z-index:1">

    <!-- Header -->
    <div class="reveal" style="text-align:center;margin-bottom:0">
      <p class="section-tag"><span class="tag-line"></span>Notre flotte<span class="tag-line"></span></p>
      <h2 class="section-title">Véhicules <span class="gradient-text">disponibles</span></h2>
      <p class="section-sub">Découvrez notre gamme de véhicules haut de gamme, entretenus avec soin et conduits par des chauffeurs professionnels formés.</p>
    </div>

    <!-- Filtres -->
    <div class="filters reveal" role="group" aria-label="Filtrer les véhicules">
      <button class="pill active" onclick="filterCars(this,'all')">Tous</button>
      <button class="pill" onclick="filterCars(this,'berline')">Berlines</button>
      <button class="pill" onclick="filterCars(this,'suv')">SUV</button>
      <button class="pill" onclick="filterCars(this,'4x4')">4x4</button>
      <button class="pill" onclick="filterCars(this,'van')">Vans</button>
    </div>

    <!-- Grille -->
    <div class="grid" id="grid">
      
      <article class="vehicle-card reveal" data-category="berline" onclick="openVehicleModal('BMW Série 5')" style="cursor:pointer" aria-label="BMW Série 5">
        <div class="card-img-zone">
          <span class="badge badge-luxe">Luxe</span>
          <img class="card-img" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIyA+gDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAUCAwQGBwEICf/EAFgQAAEDAwICBgYGBgcECAQEBwEAAgMEBREGIRIxBxNBUWFxIjKBkaGxCBRCUsHRFSMzYnKSFkNTgqLh8CQ0k7IlNURUY4PS8Rdzo8JFdJTTGFWEhZXD4v/EABsBAQADAQEBAQAAAAAAAAAAAAABAgMEBQYH/8QAPBEBAAIBAgIFCgUEAgICAwAAAAECAwQRITEFBhJBURMUMmFxgZGhsdEiQsHh8BYjM1JD8VOiFWI0NbL/2gAMAwEAAhEDEQA/APjJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFfpKOrq3cNLSzzu7ooy4/BT1H0f69rGcdHojUtQ3vitU7x8GomImWtItxi6K+kuTloHUzf47ZKz5tClaXoO6V6kgM0ZWsz/ayxR/8AM8KN4TFLT3Ocoup//wAPXS926UiHndaMf/7V4fo+9LY56Xh//wAtR/8A7qdqPFbyOT/Wfg5ai6qz6PnSq71rFSR/xXSmPykKvR/R36TXevQWyP8AiuUP4OKjtV8U+Qy/6z8HJEXZI/o3dIjvXmsEf8VxH4ApJ9G/pEb6s1gk/huI/EBO3XxT5vl/1n4ONouqz/R+6TY88Nst0v8ADdKcf8zwsc9AvSp2acpj5Xej/wD3U7VfFHkMv+s/BzJF0mXoK6VI2Fx0txAf2dwpnn3NkJUVN0U9JMRIOiL4/H9nSOf/AMuVO8KzivHOJaWi2d/R5r9mePQ+pm455tU//pUfV6X1LSAuqtO3enA5mWikb8wpVmJhEIq5YpYXcMsb43dzmkFUIgREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARTWmNKaj1NIWWO0VNY1ruF8rW8MTDjOHSOw1p8yF0ewdCU44ZtS3mKnGQTTUY43kdoL3bNPkHBUtetecujBpM2ef7dd3HlJWiw3q7tc+12mtrGMIa98MLnMYT95wGB7V3+h0toPTUbSy20sswbwmaucJXu3yDh2Wtd4taFONqr3df+prHc7gcYbI2BwZ/M7Awue2qjlWN3t4er19u1mvFY/nfOzhlD0Varme4VjaG3tAyHTVAeHeXVce/nhZVR0c0VHC11XqHMoPpxx0w4fY8vz/hXav8A4d9Jl43fTUlvYeyWpBI9jeIquPoHvbjx3DUVBE488Rvd88LOcmotyjb+et6GLo/oPB/nzdr2TM//AMuGSaTsbyBTfX2kc3S1DHA+wRjHvUnbtIaeGPrDWSfxSuHycF2uLoGadjqmJx7m0/8A/wBJN0BVrRmC8wSfxxPb+BWc11X82d8ZurnKu3wt+rl9JpPRDcGW30kng6pmHykWy2a1dG9DIyT+g9jqnt7Zaypfnza6Vzfgpiq6Fb/Bngjpqkf+FUgE+x3Coe4dHNxt4JrrbcIGj7fVlzfeMj4qk21Fee7ox6boTNwpNZ+H33btRX7QTOE//DbSkThydDbqYke0sz8Vslu6QbTQxdXbKFlAznwQU7Ix/h2XEv6MQHPV1ko8iCqXabnH7O5yDuyD+ar5bJ3ur/4fQfl4e52u49KzogSX1RHeWux+SgarpdrHEiCGd3mSuXforUFO7NNceIDukI+BWbRVd/ptquhiqm/eaQHfkVWct5721ei9LWOERPv2brL0namm/YUbx55Vh+uNbTeo1rB4hRVNeac7TQSw7bkxkcPmOYHiMjxUnFPHLG2SJzXscNnNIII9ijtWnvRODDT/AI4WzqTXMp3rQzyCtuuWtJfXu7x5BZfGe4qh9VGwenKxv8TgE3nxTFa91I+DCczU0v7S+VA8nYXraK8OP6y+Vp/80quW822L9pcKVuO+ULFl1XYYvXu1P7CT8gmyZm0d0R7oZP6Jqnevd64/+aUFlOcuudaf/NKjZNc6aYcG5B3lG78lbOvdO/ZqZ3fwwkqYr6mc5uzztEfBNCysxg3CtP8A5zvzT9BwB2fr1Z/xT+agzr2y/Zjr3+VMfzXn9O7cfUoLm7/yAPxVvJz4Mp1eOOeSPjDYGWeFvKurB5TuH4q8y3uj/Z3W4N8ql35rWP6c059S0XI/3Wj8V4dbj7Nkrz5vYPxU+St4Mra7B35a/GG4RsuUX7HUV1j8qglZcNfqiHHU6tuTf4nBy0X+msx9Ww1XtmYPxXo1lVnlYZ/bUsUxiyeEsra3STzyV+ToLdQa6YMN1U+Ro7JIgVj1Nz1RUvDqwWK4EcvrNtjk+YWkt1hXHlYn+2rZ+SvM1dXnlY3f/q2/krRTLHixtqNBbnanybK+OKY5rej3QdW483G0xscfa1uVh3Cw6Lr2gXLoktGB22+skpj/AICFGs1bcP8A+Ru//Vs/JZMeq64jeySeyqYrRGaPFzW/+Mvz7Hx/dF3Xo56K67hA07qqwkczSVInafPrOI+7C124dDWj55ybXr2ooo/sxXG2u4s+LwQPgt+ZqipPOx1HsnjP4qv+kZf+0sNYR/FE7/7leMmeP+nPfR9FX74j2Whx2u6EdVNifLarjY7wAfQjpKwGRw/hcAB71qt40DrO0zCGt03cA8jP6qPrQB4lmQF9Dy19qm3m05cM97YGE/Byp/SVFE3hgfqSkb90U73t924V4z5I51c1uh9Hf0M23vif1fKz2uY8se0tc04IIwQVSvpi7VlprYOpr5IKqEHPBW2uRoz37Nx8FpV303ousMjmsoqeV/2oKjg4fJhwB7irRqo74c9ur2af8V4t8nHEXQLjoKhcS62XN5aBs1xZKSfNpbj3FQFZo+9U59COKcAZJY/h9mH8JPsyta58duUuHN0PrcPG2OdvVx+jXkWRW0NbRODayknpyeQljLc+WVjrV50xMTtIiIiBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFsOhtGaj1pcjQ6ftz6jgwZ53Hghgb957zs0bHbmcbAnZfSvRz0F6b03Stu95+rXuriHFJV1/6q2057eFrv2uN93bHY8LSqzaIbY8NsnHlHjPJwDQXRdq7WLGVdFRCithO9wrSY4O31di6TcY9AHB54XadIdEmjbK9oFDVauujDkukiPUNIPZC3Ix2HrC4bdi2nVvSpoC0SmIz1Wrq9ow2OH9VSNx2Z7QPaucXzpw6Qrwx1Lp2kprBQ8mikhDSB/G78AFSYvb1OqmTTYOVe3Pr4R8P+nYpdPaiNEw1slr09QRNDWfW5mtEbRyAYzYDw4gtUvF66KLIT+m9bV19nbzp7a0tjz3ZYPm9cQuFJfr5OanUF9qquQ7nrJXSH/EcD2Be09itsG5i613fIc/5KIwUjnxXydL6m0bVnsx6uHz5/N0yXpw0nanlmjOjiAyj1aisILz47Au/xLX9RdO3SfVQukZLSWiDsEFKC4e15cVANZFE3hjY1g7gMKPvkBqqB8bfW5haxERye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Of1zXucMGQsxgdzBncf63QW4nPYHMYwuq5N5C4YDe493COzv9686pzITFTZ4GnMrwQD44PIu+A9ytTV1DBG6N8rh6RDgHem495I5exRFXeJntbHAOCNnqggezbl388+xBKV1XSxRNZI0tpwAWs4d5PZ2D5/PXq2pfVTukcA0Hk1owAFake+R5e9xc48yTkqlAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBXIJpYJBJDI5ju8FW0QTdFqCaMFtTC2YF2S4bHxWbFd7ZJTdXI6SI44QXNz5HZauiDcfr9tlia9tVG14Idhxxv/r5pNc7W0NeKkB7dwMZ9hxlaciDbKm/20cIayV5G4cwYLT7cLBn1JUOYWxxcBzzLuY92fcVAogkZrxWvflpjjb91rcjz9LO/isKWeeUYlmkeM5w5xIVtEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/2Q==" alt="BMW Série 5" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">BMW Série 5</h3>
          <p class="card-desc">Véhicule haut de gamme alliant confort et élégance pour vos déplacements professionnels.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              3 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">55 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('BMW Série 5')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>

      <article class="vehicle-card reveal" data-category="berline" onclick="openVehicleModal('Tesla Model S')" style="cursor:pointer" aria-label="Tesla Model S">
        <div class="card-img-zone">
          <span class="badge badge-electric">Électrique</span>
          <img class="card-img" src="data:image/webp;base64,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" alt="Tesla Model S" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">Tesla Model S</h3>
          <p class="card-desc">Berline 100% électrique offrant une expérience de conduite silencieuse et éco-responsable.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              2 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">54 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('Tesla Model S')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>

      <article class="vehicle-card reveal" data-category="suv" onclick="openVehicleModal('Tesla Model X')" style="cursor:pointer" aria-label="Tesla Model X">
        <div class="card-img-zone">
          <span class="badge badge-electric">Électrique</span>
          <img class="card-img" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIyA+gDASIAAhEBAxEB/8QAHQABAAAHAQEAAAAAAAAAAAAAAAECAwQFBgcICf/EAFgQAAEDAwEEBgYFCQMICAUEAwEAAgMEBREGBxIhMRNBUWFxgQgUIjKRoSNCUrHBFTNDU2JygpLRJLLhFhc0Y3OTotIYREVUg4TC8CUmVmTxCTU2VZTT4v/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EAB8RAQEAAgIDAAMAAAAAAAAAAAABAhEDIQQSMRMykf/aAAwDAQACEQMRAD8A8ZIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICKZkcjzhjHO8BlXsFmu9RxgtVdL+5Tvd9wQWCLPU+jNX1AzDpi8vHdRSf0V/T7M9f1BxFpC7nxpyPvQaki36HYztRl/N6Kuh8WtH3lXbNhO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5BIzl55ns/xVJ0p+rz7VSQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREFzTPLfaafaCuXVM8jN10hIHUOSsIXbr+PJXTDu8xwKCYYDyOoqdhO4R1tUh5fu/cpmnBDkFZuCck5BWQtVRHBLiVzGjtKxg62g8uIVWFzWPa7h35QbhR1cExAika89e6crMUj+GD18CtZoK+nMbWh4z2ALNUkvI8UHoLZZUUGqrZQeuMiferD9FHI8e0YXcGu8uR8Atg9Ji9s0tshq6OCUNllh6FpB5udwJ+JXBdH6grNPXunutEcviOHsJ4SMPNpXQdvFnq9qWkKS76crYmwRNBdTyvwA4c2uPUQoPI753O8ByXtLYpWGq2bUkuCMQtjGeteUbfoy51F3ktckJNRG7dLYjvDvOexekNnFTdLcyk0XBCGtpomTVFQRwDCfdHeeSDRPTBoHS7RLOWNLnSWuCNrQOZAWx7JNJx6ftUEckQfW1JD5QBxGeQXRtoWiotUbSbfUObvSUVKwMaBnmBxXS9J6QtenYvylcOi6VgyC8+zH395RWu0dnuNtpqavhpJIYafi4yHGWnnxKxO0q80ej7NUXCHH5RrC5lA3rbvj2n+DfvIV7tB1hDc6adzp3UtipT9LKODp3fYb25XnrV1/qtS3k1k+WQRtEVNFnIijHIfiT2ojVNXXM2+yz1Dnk1E+WMJ5knmVydbBrm7C5XcxwuzTwewzsJ6ytfVBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQRa5zTlpIPcqpqZSMOdveKoogrCdwHJRE/H3VQRBc+sAni0kdigZYzyDmq3RBWMox2+SgZexoVJEE5kcevHgpCSeaIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAriB2+A3IyFbqIJByEGQYd4Elp4cCQocju5BB5FUopA4FzeD+sKs5u8Mg8fuQATjvaosLScnODyUgdnqw4cwnAcSOB+RQZS11rIXlrskcstblbHRVLpePRPa3tdwJ8lpbH7pAaPaHIhZm23CV2IiWNPaeKDcKWbvW1aM1VX6brTNTBlRSy8Kikl4slb+B71otPKAGjfy771kIJ+9B6j0TcNnWrab/AOHxUlruLm4kgcxrH57P2h4K/qdK1FoqTUQtE8B5lo9po7fDuXldkuHh7XFrhycDghbFbdc6ut0YjpNQ1zIxwDTIXD5qaHpO7xagoNQ1Nys8bJXSlsYa5uQGho6/HK1HXGqGUcZdq29sllb7lsonBz3n9rHBo7yuM3XXGrLnGY63UFfIw82iUgH4LXi4ucXEkk8yetUbBq7U9dqOqb0rW09HFwp6WM+xGPxPetC1xehbqH1Knfiqnbh2PqM6z4nkrzUF5p7PSlziHzuH0cf4nuXMa2pmrKqSpqHl8khySUFFERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQRBIOQcFXMVQ3OXg72MZ6irVEGQIa8NILWntDlLkg4dgH5FWQJByCQphLJ9soLviMgZx9ynjeA4uLznqIVkJXjkVHp38+GUGw264dBxkYSe0nis9SV8T4958jQTyAWhCoeOYBVVldI12Rw8EHSY5OWHBVmvJXOYr3VRkEOdkd6mfqCvLS1shAPNB0V0rGNzI9rR2k4WBvOrKWlY6KhxPPy3vqN8+taVVV1XVfn6h7x2E8FbIK1bVT1lQ6epkMkjuZKooiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD/2Q==" alt="Tesla Model X" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">Tesla Model X</h3>
          <p class="card-desc">SUV électrique spacieux avec portes falcon, idéal pour les familles ou groupes.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              6 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">53 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('Tesla Model X')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>

      <article class="vehicle-card reveal" data-category="4x4" onclick="openVehicleModal('Peugeot 3008')" style="cursor:pointer" aria-label="Peugeot 3008">
        <div class="card-img-zone">
          <span class="badge badge-luxe">Luxe</span>
          <img class="card-img" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIyA+gDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAUCAwQGBwEICf/EAFoQAAEDAwICBgUIBQYJCQgDAQEAAgMEBREGIRIxBxMiQVFhFDJxgZEIFUJSobHB0SMzYpLhFkNTVHKCFxgkJTREY6LxNUVVVnOywtLwJzZGZHR1g+I3k5Qm/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABoRAQEBAQEBAQAAAAAAAAAAAAABESECEjH/2gAMAwEAAhEDEQA/APjJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERegEnABJQeIs+is9zrXNFNRTScXLDVsNt6NtXV5/QWuTHeTsg09Fv9V0S6vgi4zQk+9Rb9Aajjdwy0oY48gSfyQaoi3CPo71G7H+TA+zKymdGOoCM+jv9wCDRUW+Dov1CeULvsVY6LNQHnHj3hBoCLobeii/nmGj2kK43okvp5ub9iDnCLpP+CK9/0jfsVJ6I76OTmH3oOcIuiO6JtQjkGu9hCtu6KdSDlCD7wg5+i3w9FmpR/q5+xWJujXUsf+qOKDSkW1SaA1M0n/IHkBYsujtQRnDqCT3NKDX0Uy/TN5YMuopR/dP5LGkst0Zzopf3Sgj0WU63VzfWpZR7Wqh1HVN5wPHuQWEVbopGnBjcPcqeF31T8EHiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIr1HS1FZUMp6WF80rzhrWDJJQWVl263VtxnENFTSTPJxhrV3Poo+Tleb3Ay8atmjstqb2nGd3C4rqTtSdCnRfTuotP20ahuEQ4XuDR1fF5557pg4boHoC1tqh4cy3Ttj4hxEN2A8ycfZlfQmi/kq2S3QxTaguNPE/HaaCHH4nC0DUvyktd3NppbOaey0rRhkdOzLmj2gbLSK++dI+oSJKqvv9YHb5a9zQftVwfZdl6K+ji1sZFS1FOHtGOJ72l33qauOgIG0ZfaZ2ueBkMe0FrvYV8Ez0GrqR3Xzm8wuBB4zI4fE5XWPk/8ATfqHT+paWx6nuMtdZ6mVsDJJnEugcTgZz3ZwoOgaskdRSSU08ZinYSHsJxjzXPqy901voHVoe173lwcSPV8vJdu+UzaI3WGn1DTAPLwGvc36p5H7V8f3u4SVdvudI15L2N65oHPI/gEElUXu8yyumivL2QSkuY3iPZ7sKw6vubj2787i9pWj6YrpJqappJX5ez9Iwn2bhZYq+TsZ28EG2vqrg5ufn+Z3vP5qzHUV73kOvU4H9orWm1eDnJCqNac54ig2poq+6/zD+8VUGVZ56gn/AHz+a1VtWXcyrjakZxxINpbT1Lv+fqn94/mrgpaw8r9VfvH81q7Kpw5PPxVxtW/P6x3xQbK2ir87X6p/eP5q4KK591+qf3j+a1tldKOUjvirzbhN/SO+K1BsLKa7j1b/AFHxP5rIjZe2gAX+o/fK12O51DeUyvMvE49YgpwbEx9+b/z5MfaSr7anUrW4ZeXkeZOFrrby8gZAKyIryCMOGAnBOtqtTnY3GF39oZXvWX4+u6il9sQOVFxXWA94+CyY7jETsWj3pwZThc3frLRbJvbA38ladSPf+t0zbz5iMD8FcjrQfVl/3lkR1zxyefinBGzWm3vH6fTEJ/sSEfgsR+n9OyDEmnZ4/HgmLvwWzMuMoH6wn2lZEV0kbzOfflLBos2idIy9o0lwhPlCD/4lg1GgNKPaWsrKqInlxwgY+BXTW3FhOXMb8FfZV0jsZhiz4lgUwcbqOjK1kZpr7T58Hlw/BR8vRZXuJNNcaOQd2Hnf4hd5c21VHr0ULz44CodaNPzfrLXCM94AymD56qejPUsQJZTdZjva4YUPV6Rv9MSJbfIMeAyvp0aX0+8gsE8Z7uCQjCvDStMRiC918I7h1hI+9TB8lS2y4RHElHM32tWPJDLGcPjc0+YX1tPoiaU5jusE/wD9RCHfmo2v6NaicZfS22qHcGjg+4IPlc7c0X0RX9EpcS+SwDH+yfk/ateuXRXE1rj83V9MRyPDkfeg4wi6FX9HEsZPU1Lmkdz2Efgoat0Tc4GcTHxvx3Z3QasilanT92p8F9I4g97SCsGajqov1kD2+5BYRekEcwQvEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEW+9H2h47iRddQzeg2mPtEu2dLj6IHmgjej3Qd/1rc201rpHGEbyzu2YxveSV9BWiXo26GKNopaaPUWpuHtSPaDFC738/gtG1H0hmntjdP6Rpfmm2N/RkQbSzebiOfxWwdAuiLZeX1141dEPRqccUcTt+J2cgn2qwZdHctbdMl2k+frpUUdpjHE2KPLGAcgGgc1gav0xY4dUWrQ2maTragkGuqHDJIJ4jv7F1q43ugsNiuF1bDFTU1HCTDGzYZxho9vIrWvk8WSoqK+t1ndoyaq4PLoOLuaV0kSuhWjo70nZbQwU9op3T9WA97mgnIWw0vVMo2dTHHEGgABjQBssmc8Qwe8KJbUR0nWsqJBHE3fLjt7lckQvbBNC18sLJQ0jIkGQV89fKB0pQ2yqivlsDGNqXDrWM2DHjkQPgum6w19SRQS0tuJkeeyZO5ci1XUVd2oJvSpjJw9oBZuD6m6P65nSD8nuL0jElRBSmKTO+7MkfYAvkbXVkFnvtPc6dmKeZ7qeoZ4F2W/ivoH5DF3FRZr9puV44WSdYxvtaAVpHSTZ2Nvl5s8zcNEznR/ePtXNp8zUrHUGqJYTswSlhz4O/wCKyKl8NLWPh60nhcRv5q50i0ctJeY5dwZYwSfYcfgom9EzR0tU12TMzD/aEGXJVhr+xIHL30knfKiGMc1meJeCdwGAclBPQzuJ7OD71kNdKcng2WvRTkD1QT5FZUdZIBs+RvkHbIJhsrvAqsSkeKiW10v9I5X2V7+EcXA4eaCTjnxyKutqPNRja2J3rQAebVWJqZ31mnxQSbalVek+aippWRgGOXiyq4Xue/s4zhBLxz571fZUA43UM10o9Zj9jzVxs+4zt7UE02o8wrjJ8HmoVs2/NXmzHxQTbKojk4hX47hK0gB5IUC2Y+KuMnOeaDZYrpK3zWVFdiSA4YWqtqPNXBUbDdWDcYrnH3P+Kyo6xrt+MLSWVByMFZEVW4E4KujdoqoD1XYWQyte3HbJWmQ3CRvesuO6HYOKaN0juT9tllMug2zstNiuUe3E/CzIq4OGzshBulPc9v1gWdBdMYw74FaIyp7xkLKhrHtbni2RK6BBd3NIAeR5lyz4b28kAuL8eIBC5tHcnnA4sYWdT3Lll6I6MaugqWBtTR0s2e4xjKsS6f0jWsLZ7PA3i59U0Z/BahT3Ijk5ZtPdXgjtIM+r6LdGVu0Jnpz3cP8AxWv3foAoKs5or25o+rIThbFT3h+R2lJ0t7cD66NRxm+fJ6vzGuNNFSVcY5Fjtz8QuXa56NrrpVgku1HLStccNOC4fFfZlHfnN5SLKr6u23q3OobxSw1lI8YcyQZ+ClH58z2ioa3jgLZ2YzlpUfIx8buF7S0+BC+n+kzoOEPWXfQtRgDLnUL9h/dXDa+HhrH0N8oJKWpacEvGDlQagik7vbG0sgdTydbE71XYUa4EHBGEHiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICDc4CLadC2P0+qFTLGXMaew08ie7PkgzdJ2GmpacXe7xdZjtQ05+l4E+S2SCk1Bq8GpbE9lugfwDs8LI/IDkfapW36fn1NqOn0zSlzoGPa+tnHJuPo58O5d41lZqKx6Fp7bbIxFHCADwjBcR3lbkRxRun7dbp4yyNjpgztPIzlbXpFtRLIYjI6OkaQ+RoOOPfAHxwoaoimkkh4geOUhrR3rZqOqo7NTmpneBBRRuqpye9zchjfe7hKKx+kWKW+aosvR7QHjjLm1dxLe76QaT5DGy7fT0cVrtdJS0rAGUkYaCNsDzXGegdrpLlcda3k8Etwkc+KR/wBFueXw2Wz646QP1tFanc9jJ4hPrBtuo9Z2y1UpkLxNKBjgaeRXItTapuF6qHPkkcxhOzBsAFCSyyTSukle57nbnJQnIBPNS0WyMuyefPCpla0seCPWG6qcRnKtSO7hzKyNq+SHdhZ+md1A+TEdZG9nD+1wkj8F0L5RVt9A16+pAw2riD2+7Y/cuFaIrvmHpisdwb2Q6qYCR5kNK+n/AJUdN1tDZrsxgOW8Bd5Hf8UHxv0x0Z6sVMYz1cm3k0gD78rQ6cOls00YAc6B/GPIbZXYukKi9Mtj2NAJc3B9vMLkdmjbBX1FG944ntcwk8icbIIx1Q5wA4Oz3q/S1UMUD43wAl3qnHJYz+zI9o7nYwq+IDZyDJtctBF1jKync8kdgg8lINgsctIX+kSRTZ2BGygnAjDgM+G6rIa5vIg+CCfjskEsIkhukOTyaSrNRYbjCwPaI5AeRaQcqG4XdziMK6yqrI/VqJBw8u0UGXPS3GmI6yllGeW3P4LHdVOZs8OafB2VmRaiubSA+XjaPrDKtXq9fOFI2F1LEx4PrhoBKC3T1DX5w7l3YWTHOdi0kHyUbRNhc5jJHljScEt5qcjsME0pbRXWIu54eSCrB4ytmYMNldv3HdX4693CWviY7PfyKw5rVdafizAZQPpMIIWGZZGOLZIXAjn3Y+KCdZU0jm4cxzHeIOVdaYnNBjnBJ7ioCOpA5u4fIq6Jc9oAY8Qd1BOObMwA4yDyxuvGyuBw4Ee1RUdY9mOrmePasplxeRiRjH+aDOZNz3CqbUHkSot9QXOJ4APYr9OySSPijIOO7O6CTZUYV5lQeYO6iQ949YEe5XGTHHPZBMMqCebldFR5qFbN4K82c7IJkVHJX4qp4xwuIUI2oV1tT3A7oNhguUzTgvJCzYrqBgHJWrxzlViYg5BQblDWscAWvCzI6hpG5960qKoLd+LBKzYblI0DfIQbdHUuHqPyFkx3BzCA7PtWpR3J7m4HZUzYKKS6B/FV8JG4GVobBFcm49fBWTFdgNuInPksGPTmGYNS7i78lVCzVkBzE9kjR4oJumu+OW6kILwSRlvJakWVsZIMBGO8L1tY6M4eS0oOgU18fkbk48TyUNrXTOndZ0rm3SjY2qLcNqo24kafMjmoOKvI34lnQXJ4AIeVBxHXHRzfdJF8sJdX288id+FvsXPpYYaniMA4X5/VO2+C+vWXBk8TopmNfG4Ycxw4g74rnPSF0aW+7RSV+n2x01bu7qRs0+xB89VFK+JxGDkc2nmFjrYa+mrLZVGgvVE+J7DgvOxHmCsCsoxkviJewnsyDv8AaO5QRqKp7Sw4IVKAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgzbNQyXG4xUzAcOd2j4DvXYKWGOw2mN0EHFVzjqKRuPWJ2zj4qN6H9KsljkuNcOrpomdbPJ9VvcPfsun9EdnbqzWL9TV8BFsoiYqKPGGnHZBAW/E0b10VaPbpbSYlnw65VuJqmQ8wTvwqa11H6VpubAwQ0FpU9V5dC5gbk5wA1qg75XUNBaZG3ergpYy0tzI7xW+RMcpYIo6I3KbmwiKAftk4P2Erm+s9RCvqpbNDJ+hM4NZg+s1uNviAVumoddaEt9PT0jJ6m5Opi9xELcNe52QDk4OwP2Ln8erLLG9/wAzaPp3SPcXGWoe57iSc5OcrGq6JJe6iss1HbqaIw00UbQ1rBjbHPZYYhkJBbC/I78c1pVXrrVggL2RUtHG0YaI6Zv5KFdq/VVU8BtfNlx+gwNWaOnObKz9Y0t9yoMgxsdlpEN31PEGdbUTS53LZGcWffhTlqvUdbIIahghn724wEEs6Q/FBsCSqBscZVzuUEBqhzqW4UVdGcPgmY8H2EFfZPSi12oegi33JuC5kEUufgD9y+M9VH0iB4BwWDAK+w+iCdupvkztpnPEj4aKWP3t4iPwQfM2oGCWgJ3xj7eS4LUl9NenPe05bLxH4r6EuUYMU0LhuAdvMf8ABcP17SeiX6SQA8M7Q8e3l+CDyK2z1t5DKOnE4e3j4B3rKdZXNqJGVdoraYN59W0ED7Vj2281lo9Gudvc0Sx9gtP/AK81tFr6V62B7nVttim6x3a5H7EGn1dDSNbL1c/VlgyBJGQfuWLb6GesjcYAXub3g4+xdPt+ttGV8shultjjMm36obFajT01gfrR9K2reyiqHDq5YnlvCT3INcmpKmI4dG4n2Ky5r2+s05711Wn0LWmSZ1svMdRFxZayXt595UFUadvUb5hU2cThj93Q4CDRQRvkLHkzx7c1sslvonOkbPFUUjgd+PJwoCaNorOCN5kaDgO8UFIaAQ3G55q41z4xxseQnUzkF7GEgc8IT3EOCsGbQ3atopOsindy3w8qRp9RB7HMr6WnqOLvkYMge3GVBAtxgDBQtBCCehZYKsOfK2Wmd3Fh4m/AleOsL5ad09BWRTtB5NPC73g4UAW45Oc1VMmliGzz5Ec1BmVENfTk9bTyBo7yM/arMdXk4OxWbT6hro6fqXzGSM/QkHEPcrVyraWrZGIaKOB4OXObtlBQ2pBdjiV9sxGwc4eYKho4nzzdXGC55O2FmSw1lE4xysc13nuEEzDXStaB1jXgdxG6uipp5D+kaYz4jktfbUObjibushlTnCCcw4jMUokHgvOsc3Zw4SoqKZrXcQc5rvHKyhWPI7eJR580GaJvEqts4B2O6jy+F+4LmHwXgd7/ADQSwqXjvV2Kpc44KiGyuHerzZthnmgmWynxV1kvmomKbbYq82U55oJeOZ3ipGz3WahrY5A88LTkrXGzHxV5k5I3Pdsro7NQ3QTRNkzlrt8qRjqmuHZkwO9c20ddOOI0kjt244VssdQ5pJBTRtEc3FkEZCPhgkbgxMd7lB01e4HDjkKQgqWu3B5oKZbTCcmCQxv+qeRUfNHU0r8SxkjxCmet7s5yqm5OxIIPMHkqIWGtx3rNgryMYJ8sc8qmttkE5MlODBKO76LlET+lUkgbUMx5t5ImsvUtktOpKIwXSnBmxgTMGHsPtXE9W6Ou+lp3SQgVdEeT2jO3gQuyxVh7nZysgyRzxGOUMexww5rtwVMV83Mhp6uIviIjePWhd3+xR81M5uS0HY4LTzC65rjo9ik6y42E9XI3tPgHf7FzeYv60Utex0VQzYSEYII7j4qCDRSNZTtMhDhwP5h4HZcsCSN8buF4wUFKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgKb0ZZprzeYYI43PaHDIA5nOwUMxrnvaxoy5xwAvo3oK01TWCwVWqbgxuaaMuj4hzeR/H4qyaLuoLfUQxWvo6tBzWVr2y3B0f0Wc+En4LuFsoLXpWyUlMS2KlpIwHtZzce/7Vz3oKtcldd7nq64Mc6prnuEJdzDc93uCz+l7pBtNmay308ba2tYP0kWNh7St3kFOtOlW4sbLT6dtTY25wHv3JHjuuG6wqNcalkzWtbLHxcXASvbr0kX59SepoKOJuchvV8WB8FjU3SNqeLJ9AoXb5/VN/Jc7aImbTN5mIf8zPbIO+PAHwXtutep7a93VWWokBOSXNafxW00vTDqGD9ZZ6GTx/Rt/JSMHTfWtAE+l6d478YCnVxBxVde+Hqqyw1Y4hggRghWaWrMFTj5hqmhp9YxDZbnT9N9tIzVaYcwd/C1p+8q8emXSMrSJLDUN8wxv5rUR5bdSWQwxtrKOWLGzi6PZQXSNFY62OKu028urGEExsGMrC1n0iWa40L4rdRuY93LjjaPuWj2W9VkE0szXBri0huOQSjpFiqH1NBG+dvBKBh7c7grLnk4Ii7PsWrdH00stDUTTSOe8yEklTd4nEcLGZ3JyoMCsBlglyRghfT/AMiG4Mr9AXmxvOTBO5uPJzR+a+YQBJEfAhd2+RHXNo9YXi1AkCpphKB4kH+CDTtWUwo9TXOkcP1VQ9vuzn8VyHpTof8AN9NVj+ZeY3n2nb719A9O9u+bekm5MazDJXCUHxy0ZXJdV0UddZbhTyjkBMPdufuQckp2CW3TsyMxkOCw9iMgDxU3bqanFbUU3GOF8fZOduSjJKB3G7q5Guwe4oMYMyTsvHtDRkDB8lddBMw4IKocSNnNPwQZ9tvl6t5D6KvmaB9HjOPgtosnSheaAllREyoa71thkrRGkh53IHgq8Hc9/sQdasuvtL14ey725jHPzkujHNcwu7qaXUE7qIhsDpMs8AFg8Oc5b7SrXqvGNiDzQbxYLHc57LV19BJDJDHzY5oJPxCt19HLDQiS4WaRjP6WPkfNQ9q1FdLXSy0tHP8AoZPWaVtsfSQJrD8119C0nh4RIGhINYfbKGWEOp6wseTsx4wsWqtVbBl5jPVjvbuujVrtGXbTcfUmKOswGkjZ2Vj3XRdVRWyKttlzdM1xHYc7O6o5q8OYcOBJ8OStuIae0HNK3O90NfRwtF2tGWk46yNuCfgoaa20E7h6HVFkhOOqmzkKCE9bnyVEmw2Cz6y21dMS6SEhuccQ3B+CwXbBw8EFED3NeHNyCORBwpGmuUonEk36XHMP3z8VHQNJdhX+Ecnb4QSLX0dbV8Uzeoa7vbv9ituoHySP9FcJWM34mndYIwx2W9k+KvQVMsL3Pa4jI+jtlBS7rmOLCDt4qpkz294HkFlUdewxPE8bXk8jjdW5aelfSOqGTNY4HeM5yg8jrBxYc3dZoc1zQQVDcDg3jwceKkKM8cWcHZBljnzV3gJaDGQ494WJxkHmq45d85LUGSyUt2cDlXxIPFYrKgEHiZnHgqwWSM6xjhkfRzugymyq4JeW6wOsc3HEMKoSZ70E3aq51NWxzh2OE7+xdGhqGzU7ZYz2XjiC5EJcDn5LctGXMyUjqSR3aZ6vsQbfHOQMLKgqHMwQVEMlKvMkf4bIJ+nrsnDys5s4dgtdlau2Q8srIgqXR8icKjYxKCMHPxXrw2WIse0Pj7wefxUZTVjHjGcHzWUyQnfOMeCqIy4W18IMtKeJn1O8LAjqC04ee13hbNxBw22PiFg3CghqQXlrIZBycOR9qKwYKkdzt/FQertL2/UETpRGyKrA2eNs+5ZlTDPRy4lYWtPJ3cVVFU7gOz7QpRxq5Wy4WOZ1LWRdZT5xl3h5KPnp2GLibmaE8vrM/gu4XWiortC6Cria8Edlx5grlepNN19krnTwZliJzxDljwKg1OopnRDiaQ9n1grCnXOZK50sTGsl/nID6rvP2rDloWzsdLSZ4m7vidzHsQRyL3BzjBz4IWuAyWn4IPEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARFVEx0kjY2DLnHACDdOh/Sk+p9U08DGExh/aPgBzPwyvoPpUp20VBZtB2jLZK2VvHjviBySfeFl/Jr0jHYtKG61UQbPUDslw3a3vP2FU6MezVXS5cr7Pl1LQk09KTy7O34Fb8/iV0WioI7NbaGmpgGMpWMYcd+2CvnnpooZbdruocwtfFVDjaXDfcZO6+lK3tRvjdvxbjyXDun4QVNLBwHNXRntOHMtPd9qeiOOT1D2yua3hGMDHCrZrKgDaCnd/aaqJntd2u8cz4q0HtPesKrNbO31rfC7+zsrT65pOZLU8eyT+Kug57wvUXVltdQgjrLfUcP0uE5+8rKFbpVzQJaeuZ/dCsyHDdwCPNXx6C9reOndnHMIjCq6mwOJbSxTAeLwo2aambnqTndT7qW0v9eN4Vs2WzTOyamRjfBo3QSuiKs0ttcTGHBz1Rc7iau9NYAQ0dwKyaJlDBTNpqafLRy4husOis1RFXvqzI17C7KCaacRAeK6N8m66utXTBan5AZM18DvPLTj71zgPGcYUvoiufb9b2Wsj7PVV0fEfIuAQd/wDlaT2Sxamtt1vTZjTVUIjHVg+txH8Fz2yUOlbpRuq6IyTxSMdG8F2cAj2+a6N8uqhFd0bWe7MZxmCdhPsOPzXy/wBHOqI7PeI4hJilqCGuj7gTtlB0eTou0X6SJvRqkPB4sh5x96sT9E2iZJHPcysY52/EyQ/mt5jc2ZjZYSHRubkEL0t3QaGzol0o0nq567H7b8/irFT0Q6alzw1VU0+OeS6IqDzQcsqOhKzvPFFdpx/dCwp+hGnGTHfHDwBH8F15xwrL37lBxio6FpwOxdw7HiD+Sianoiu8Tj1dXE8DxH8F3eSXwKw5psZ3QcEquja+wDZ0UnuUVU6OvUJIdSkkc8EYXf6io57qJqZxk5Y0nKDhTtPXSPLjTOaRywcLNhq9S0MLIHSyGPPFwuO2y3LpCvFPQUXVQOaKmQ7YGcLUbZqGtMjYZ+qnDhjttQbUdeVFZBBSXOhjAicMvLgRj2ZWVqabRl2ZB6PJDFIT2nsbwkLXfnW1yyCG62eJhPJ0fMrOp7HpauzJTunpCeR3cPhutDAudFBbpWus94ZVRE7xS7/eFrdfRVlVUSSmKJpd3NIAW8O0KZf0lBd4JSfovbwn7ljVOkNR0vajt7ahve6N4cfvQaZS2WtJ2iBP9pZ9PpW/VLx1NK5+eQBUyBdKCT/KLVUR47zGp2x6ufSTN4oXNcO8tKDVjoHVTW5dant94/NY0uj9RRevb5Bhd9sWu7bXhsVa0g4xxDKn46e23Fo9FqWOe47NJ3QfK0mnbw0nioZgfYrIslzDu3SS7DC+oa6wOYSOr4goWqs5a7IjZt3FqD5+NsuZpxE6lk28Qq47XcmwhsdM8H2LurYn07+L0eneB3OaN1LUN4tQaG1dmpg4d4aFmj5uNsu/H/oz/grsdsuoPbpnn3L6Ybd9Pf8ARVN+6FW276cH/NVN+6EHzQaG5sGRRyH+6Vadbrnx5jo5Wk89ivp75507/wBFU37oVfzxpvh3tdN+6EHzOyO5hojmoJC3x4CklJVjdtLLju7JX0y266ZPO1wfAK4256V+la6f4BB8xsp6sDenkH90rIpn19JJ1kUcjXf2SvpgXDR7udpg/dCdfox3/NMPwCD50beryOb3j+6rzL9dRgGV37q+iWjQrhl1qhJ9iGk0DJztkTc+SD59ZqG6D6Z/dWVDqi5tIzwkebV3f5o6PpPWomj2J/Jjo7lO8RblBxSHVtUD24GO9gUpQa3hbhlRAW+wLqn8iOjyU7SuZ7yvD0c6Ak9Wte34qjUaC/UFW1pjnwfAnGFKsma5uQ4PHiN1MDot0W48UN3lYfaVl0vRraYCDTaoc3wDjkfcqNbmYx8RjcONjuYduoK4Wx0IMtJ2mDm09y6YdBScOINSUx/tMH5K27o8uxOYrzb3jv7s/Yg5MyYg7jB7x4K9I+OohdFM0OaRgghb7cuiu+Tyh8FVRftYdjKwXdFmqWcuodjvDwoOJau0l1JdWW0Hg5uYObfNam5weQyX9BUt9R7duL2r6Tk6PdVRxnNNG8O2cMhaXq3oZ1DWuMtHSNjkG5byHtUGj6FqNLzV76TVNAY5Ht4WVDNm5xtlZdZpeeGtnht5iqo2tMsYLQQ5ueXwKuV3RfrOlgbT1FpNSz6MjHjIPxWfpSxa7tNbGyotE0rIjlr3PGGjHfug1u20um7nM6juFI+hqWnhJZnn7FY1DoKopGOnttQ2rhG+PpAexbLf9M3G76iM76J9ud6xcxhPEVsunKNzWCmrWykg4MnAQXBBwKaKWGQslY5jhzBCoX0Vfuiam1HG+W1VkUVUR2YpduI+APiuFapsFz03eJrXdKd0M8RwQeR8wUEUiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAt86EdKS6p1pSwCMuijeHPOO5aPBFJPM2KJpc9xwAF2foyvt36NeGYWstE+BK+RhLnMPPh8FYPo3Xlyg0z0dV7oMRlkXosIA5/RyFE9Flj+atE008g4amcdfJ4ku/4rR9e63s2sqyw2mhncyj68SVHWbYO5wV2EVltprWx7KymMMUYA/SDkAumwRuob5DbbVJUOcOt4cNYea4beqqW51j55zxcZOx8FLa91NSVt1lc2qYI2HDQHZC1I3mgjBDZC955YHJZ9Xg0zV9EKCqDKWQP4z6ueXeoDrp2Oe0R8RaN8HkthudNNW15qMPLc5GGnmrdBYapjpnthmkfKduwVgQwlqhgimnIcMghuVmvbdIKds0lBUthIyHmI4+K3SmgvjKSOnhtDiGNwD1e6zhbNYVsIidRzGLGAwnAHuQc0+cWuxx4xncY3WSy5UzgAXYx7lvZ6Ob9UOy+1xtz37BZMfRJcpmjiip4/HLkGgMqqZ5wJBlXAWkjge0jv3wuhM6F6pxwaumjb5E5V5nQiAMm+vjGdw0Z/BBzmJ5Dzudu9bFbZHmmwGlwxvlU9JeiKnRdHDWwV0tdTudwuJaMN8+S1GK+1UkBaXcDeW3eg2l9fGyoEXA5znHA4dzlTVNbr2yaCqNsnjYyRkgc8tbkBwPeVz2nqnxzMc04eO0HZ3BS+as1Fcp+rrrpUGMYAaw4GAg+qOm3pTsmreht2m4KGrNyaxjGnLS3jbjO+V8s0OnbsQQKeR5aMgxjJYfA4Ur0f3SkgmqaC5ekGKp7TJBlxaR/wW+WK/wANormU1rvsUM1Q4diSk4snuzlpQX9Ha2qLXaG0l5t9ZmMYDxGeSnY+kvTjscZqo/7UTtvsW1Q3LXZpm8FXp2eMjOH26PP/AHFafcNaMcTLa9KVLfD0GNpPwaggWdIelnnAriPbG4Y+xX4taacmOGXKH2uOFJS3i6FvDVdH+mp/NsYH4qPqLlQyAiv6KLO9veYXlpx+8gvM1DZpd2XKB3kHKr5zoJfUq4QD3uOFFSQ9G0x46rQV0oH95ppzgfFyi6ixacuN6igsPzhDScPFNHUuyR5AhBsb6mNwIa8OPcWuGFgVU+Njsfismp0vaoYeqilnZw7A9YVAXKw1cQc2hur+P6LHjPF9iD2pnIJGR8d1A3+8QWqhkqZndoeqw958VtVz6PukOgtcVdLbIqiORvEOBwD8eOCVyTWdqudTXONwirIOA4DHRkj7Ag1C6189xrX1kzsl57I8AqInFrQQceavT2qaPOJGE/Vzg/arZpZ2swY3e5BI3drWiCqac7YJUlpiseSYWnHgo4TCeymmZA90jDkuIwAsGhqXw1LXtd1eTgnK0Ogtq30k7Wl2QVsVnvLHAASyxPzza8hc+qmxeiumNfxygZAJWFR3oxuALyMc0Hb6S9z9XwmSCdveJomu+8LM9PtErf8AKtP0cgP0omAFcxt1cyWJskddwkj1SQpWmrJxgdc2QAeOPuQdBh/kY7GLeyEj6OCpKlq7LSStqaWmYHs3aQ78FzIXKaHHWHY+ICzqWspJziRxaces13JB0Gu1U1zTlgCga3UcbiR2VCyW9s7R6NXAk9z8qIutlvbM9TGycDvY5Bn3G+N4iSW4WtXG+vc8hjgAoe5i5UznCopJ2keLCoOaua15DxwnvBGFmjZnXydv0sqk36bGeJam+4Z9VuQrLqt7jsWhWDbzqCYcnoNQT97ytMM7s56xpHiF7JOeIDrEG5t1FPv2ivRqGfnxHK0sz7j9IR5qr0g8RHWjCg3T+UdR9cqoalnxtI74rRjVOLTh528lQKmQD9ZuUG+t1RON+sKqGqanOeM49q0D0l7Rlz8q5TySzNLhI1oz9IoN/Zqqo+ufirzdVzgfrD8VoI9IBw18Zz+0F641gPqsPscEHQWaunHKQ/FXY9Yzg/rXfvLm4lqgCTHy81S6slbzZhB1Jms6n+sOHvWSzWtRgZqXbea5ELg/OCrguDhzJ+KDsMOuKlvKqd+8suHXtWDtVOHscuJNue+N1ebcCMdooO6RdIVc3GKpx/vLOg6S7i3H+Uv+K4D85OBGHn4q8y6vH84g+hqfpSr2nedx9uFI0/SrUEAPLXe0BfNjbvKOUpWRHephjLwfeg+mYuk6B2RJTxOz+yFkjXdmqGgS0bN+fCcfcvmVl+kHN2PesmO/7esfiqPpaPUOmagDMZjIGM5yvI5NOyycUFY1rv24wR9y+dYdQDG0hafaVmQahkAw2bf2oPoiGR0crX01ytkjWnZr4Q37Q1aV0w6Ln13K2plo6COqjaAJqaQgvAGBnOy53DqWoaBmZx8lI02r6puMVDm47gUGi3bog1PQl2aSVzRyLcPz+7latWaRvlK4tmopWY+swt+9d4o9dVkY/XOPvwpOHWrJxirgpp8/0jA771B8yOs9yBx6I8ny3VmWgrYv1lLM32sK+nJarStfkVNqhYXczESz7iFEV+itK3EO9FrKmm4u50znD4kkoPnUwzDnE8f3SvOrk/o3/BdivPRLU8Jkt1zbP4ASH8VBQ6Gu9Hk1MDttt3c/ig5z1cn1HfBeEEcwQt/qKSCnPVVDOqOeZwpjQWl7LqS8ChutzjtzXHEcpaCHbexXBydF9U1HyfLE1rS2/SOBGQRG0gj2gKGuXQRbmtIp7zE7zkaR9wUHzei7BeuhK5wRvfRVlLUcIzhjsf8AeXMtQWO5WOtdS3CmfE9viOaCMREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBVxRvleGRsLnHuAWwaN0fdtTVHDRQO6pvryHYBdh090X0VsZGakiZ53ONsHz70GjdG+mOCrZXVABMZDnEtyB4AeJXUqyb04OZVxiUEYGcdkeSk4bHBAzq4wGMH0Wq+23Qt5RfFBoVw0lRzu46R74Xd4btjzVyk0pM6MRy3StdGPo9YVvno0beTAF51R7iFdGq02jLUwdtr3E8yXEqUg07Z4GbUbHHuJUu2I5z3KprMzcuy1QUUVsoImANo4h7W5UjDFTx7Np4R7GBURjGyuM5oMlr8AcADf7oV1srs7k+7ZYwJVwHZBkCQ55u95XvWeX2qwHL3iQXzKB3grzrM7tGfEKySvA7ZBZvtto7zap7ZXNDopm43GeE9xXyffaFtovlbQNl6xtPMW+3PL719Y1MxjZkbk7D3r546XNIVVmvE1yjD5qOqdxlwGeFyDUYnkuDs8lTWxlzQ8c1jwzZ2xuFkh5dsTjKC/Z7j6LWQPcOyHYcVOXiQi6QVzOcbmuGPDK1Z8RYcH1T/wCgp20z+m0LqeQ5mh2P7QQfS2nqptVYKSZpLuOMcistzhjl/vLVejKpkk0lAHggxuwFsT3YCD2STzPxWLLNjvPxSWTAKjqufAQU11SQCGuJzzzhQ8tbJDHUCmcGPIG4bulZUgk7rCowamrkha7BdEce3dAhu1fPUNgbPkuGMlZtFfarT96orjcaNtVDTTNc9v1hnK1KSSSkrAeLtRuwVsesIZa7SM1RTbyFmWEIO96m1/S3G1w1dPEYoJ4RgB2eDyXKb9quzNl62ojD9+UrAQtS6M7/AC1eln2u4uPX0b9z9Zqg9TW6sr6qQ0vHPE07tYOSCbu1dpO7SuM9tpQSNnRjgKhKrRmnalpfQXOajee57+Jv4qHrrJXQmMFw3b3nHD7VcbpXUMtufdKemkloWg8UrJOXuyrgxK/TtwoS6KC50c7fq7AuWu1tqnj4vSbeW5OeKN2R9hVNdDeYalzQyZ+N+I74C8gvVXA4GaN5A2LXZVGK2jhdIB6RO0+Dwdlkx2aF+SKlpcRy4hlSlFeLPUStbVUpB+uFJ/Mmm7m/NPdBTydwLsINXfbzT7hlQ4D6jl625PpQMMqwR3HK3qDo9q5YQ+3Xlk37LZAVjVujtWUTDmETM8HxA59+EGp/yomLeAsc7P1jySPVVRGOzHwkHmsuut1VAcV9gOO90Yd+Cipae0l3abU0x8xsPigmKfXFWAA5uw7wpe3a8Y1zTLLOPYStP+a6aXenuETvJ/ZVuazVjRmJsco8Wvzn7VNHUodX2ytbwzV2x7pGA/gqRTaXqnddNDFNxHfBwuRyUtXF68E7PE8K8jqaiHZkkg9pIKg63No/Tld2qOY05PdnKwKrQBiw+mfFUb774JC0Glvlxp92VTvZlStJrW7QjLpCQEGbqCyy0Lg2lscpb3nchQL5JGScMluLT9UtW0UfSJVAYmY1ze8OWWdW2is/0mhhyeZxgq6NNc0vI4qBwb5BXGRUI4jLSzNx3rZ6qPT9fh0FfLSvP7WQsWbTD6kZprvHOD3cQBUGtT+giICPrMnuWIGxE8IZI4+W62V+j6lmxjle4/SacpDp24UsjjFG87cy3cIISiooZ8ulc6EDxCyX2+j4cCqHP2LPnp65jQJSRg98f8FjzSyxsOBG4jxj/ggxzbKfjHVVDP3l4bZIc8NSz99W3V02O1TxeRDFhTOke7ic2QZ7gDhBkVED6Z2H1J9xyrLgx3KYn2qiOCWRw7XCP2iropHcZyWEA9zlcFIY0fzzB7V4+PiG0zD7AstrKVjMPpQ4+PF/FUg27ODC9p8nJgswwcIzxNPtVZg4j6zfivJ30wGIg/8AvLFLiO/moMt1ITjhe394Kj0afkOE+xwWKOLOcn3L3EhcMdYPigyDT1HcD+8F71VUNgw59quwWu6zRdZHR1jWDvMTsfHCofS1rH9tz2gcyXYPwVwUYqhkFhz5L1pqh9B49yqImaMuNS1v1uDY+9WjUzj9XNI5vftlBeE9S31mv/dK9FbUN34XD3Kx6bUgfrCPbgo2uqN+20/3QmjLjus7TsXe8LMhvj24zkn2KJFdUcy1p9rAvRcXDnFGf7qaNhiv8R9d3D71nU96ieRwTj3laga8HnTw/BG10YO9Kz3FQb9FdiRkSA+xZtPeZQRh/wAVzltzjb6tO5v95X470xuMxO/eQdRpNQSsP60j2EqUg1RIeFjg2Xx48H71yWO+0+RxCQKQp7zSvxiYg+asuDpNcbBdWOZV0UfE7YuZkYUL/JC3sJNuuLmgHLGuPL3qCprlkdmXiHlusqK6PZk5f8E0b5pTUWrLJUR2+pPznQnYdoZjHtW53O4cbRI2TsuGeHPJcZiv0ke4ne33LKZqaVwA63JHiVBvdZdnMd63D5E7EfgtE6QaS66goW1cFvlnpYM5m4MkfwUpZ21F6qWsn/RU+cvd4+S7HpX0KCjjpIhGYCOEscNnjvBVwfFdxon07i8DsZ+Cwl9I9OXRV6JDJqXT0DpKKT/SaVgyYye8eXevnatpzTy4+ieSgx0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFL6QsdVqLUFLa6VjnOleA7A5DvKiF9MfJd0E91km1LOeqklPDE4jcN8vgg3/TmmKHTNlhttHE1pYwcb8buPerj6YudxEb+K2I0Xo8bmOkdIc7Ocd1HXuems9pnuVYS2CJnETjmfBBFPpmgYG6tOp89yx9C6stur+uFFG+J8YzwyDBK2j0IZBLUGu+inwVBpT4LaRQD6v2Kh1Bz7Px2QauYCIzlGxsgpzJKQxo3LnHA96nqmhIaCG9n6R7gtF6T6W93ShZbbLFF1DxioeZQD96Cbt81JXAuo6mKfGQeBwICyWw4DSR7Vzvoc01cbFd5W3GYQtcOFkPWcXFvz5rsXzeeIjhzjdBB8B8CvercVOeg7Zx8BlVNoNgeE4PfwlBBNjcverdnYKeFuIzgfYr0Fv4cOez3INYkHA0uk7OPHZvxViSppmntVMTNu+QLadV6dpNQ6eltDp30YeMiWPZwPtXD7t0C6nMjvRNU9cw+rxykHHmg3yevouvZxVtOGNGf1g3Vi61NguVJJSVtVSyQSNLS0vHeFzKfoR1rIwRNukPYO5M/P7V5H0EasP6y9U7f/wA/8UGsa30PFa6x9VZrjSVNI85DeublnlzWtNttXsXsaHeTwunnoIvgf279TYx3yHdW5Ogi+8R4b/TH++UHOfm+rftwtO3e4Kc0HpyorL5GZZ4qaJvrF8gGR3rYndB2pGNL2Xendj/afxWHL0O6xiwWV0LvZPj8UHY7RDbaChbR0dVCQ3wkG5V978gN4ht3tOSuEzdHGv6JpdHLI7H1J8/io2pHSHZTmT5xZjv4eIH7EHfaqThyM7eYUNXzjBGfeFym1dJl7o5BDdouuYMB3E3Dgt5p7pTXSlbW0codC8b/ALJ8MIKqmXLjurFvqBBdaaZ3q8fCVbkOcuzssSpDuDs5DgeJqDL1PQOprvMwN7Mo4wfap7Sv+ctPyULnfpYwQPYrdylZdrLS1THM66IcDxncrzSUwttyMrhxROHaHJBp9pc+13yWNx4WvcWOJ+iFN6duTKG+V8UxJjMfEAO/mpnVGlRWzy3Si4ZaScZeGHtNKhLdS0dPcGPqGyR1wZwYk9VwVgj62SCoq3yTFwjkJIbk7DuW29DtLQ1+raOy3epmZR1EbmxxteQ1zz6uQtE1VR1FDcm8XG0EZxzU/aDVQ0lPdqLiZWUbhK0AbkDdURdwims+pbra5yHPimIaHAbt7lKdHNutFfrmjpb1BE6kqHhkvZGWtJxkfatn6R7PatS+h6ps9Q19WQPS4mcwR4rnNJWzW28wyNLQ+GUEOB3IB5IKenHS9g03qetpLBO2anaeJrs7gFc5pXPkd+ijwQOa6b0l2aR14bcI+skpq5glbIQTg97fdt8Vq9Hb2MmbhnqnPLAKCDirLrSz5pqqqie36jjutptOstaUIjDK+SQDkJmB2fLcLZrTHa5LzRR1cDGQ8OJHcPMrcqq10NnroeGmp5444BIONu2d0Gp23pIkmb1d5stNU/WdG3BUia3RN6jayehbTyOHquZj7V1VtPpy5wMsE2m7bTz1kbHR1TGkFpdkZ5rQdUaVtdm1VLYJYnNkpwMyHk8HO4+Cg0u6aH09WvLrfViFx5AH81AVfR/dYnkUNXHPjkBJg/eulUGkqC4XmOgZcvQmO5zOyWt+CxtZaKvml6mSSZ8z6dm8UzjgSN8QOag5Dcqa/WiXgrGysHdxN4gfesX5xc8ZmpaeceQAK6G65zyx4nDKiMjlI3OPxUJXW+11by51EISfpRHGEGqvdapBmSlfE4/UyVbNHbJf1VZIwnue3+CmafTsc9UIqeqcziBIL9wFFVNuqYat1PJ2iORwAHILRs7j+pqYpPYValtdawHMfEPFpCyG0dW6N0jaSUsZzc3u+CyY7feQGObQ1/C5vEHNicR9yCFfDURHdko816yqq4j2ZZGkeBwprhu7ctfQVRx9aB35K2/0gj9LbZQf+yIQUUGp7xRn9HVud5O3CmYNbSv3rYyCeZYVBFlJxYlp5GO8CCF71FARgxzMB8Ag2WG826scGiYtc7ucVKU9ro5m8T5Q8O3/AEeCtEEFsJwXSNI7+ErNpHQUpD4bnPEPMHH3INwdZqCMF2cNH1wsGrqLdTs4WujkcO7gUZU3GOohayS7cPu5/YsM0tC5212Zv9ZBdq7vHkiOigPnwqJqKp0xLuqa0Z3HJSIt1GSQLtER5KqCz2/i4pbkwt8M4WhClwdgNy4nw7lk09BUz/q6eT28K2angtkQAifTEjxcMqqaac5ZSVcEbcc8hQa9HZarJNQx8bfHhKyGWy0NYRPWv4/Yr9VR3KfPHdIznu6zCw5LJU7OfVQOPd+kG/2pRZnitsDswVL3OHiFaZcaiORr2GM8JBHE0LINkrDv1kAI/bH5q2+y1neYT7HhQdq6POlDTdttmbreKplUW8Jidb2PjHwYVk6q110PV9ZRXSWgnuNVER1kcNOYmnbnyAXCzaK9rxgRFxG+Hj7sq0+1Vw9VhOO7iCuj6HufSHoK6xshN+oaa0uwDRSWjL2DHLjZHk+3Kw7RqDoypaaopdPV1sgnM+RLcKJ7mOYc7Y4c45LgXzdXgn9CATzAcEbb65hyIXZxjOxUHcL23oqgqKW7V1Vb6qrMobLT0cUjY3Z2J35Y5+5brc6LogudLBFR09h6p7ADIKgxSN2/acF8ueiVrHEinOT5ZVs0FSMk079+TcIN66Z9G6f03VU1Vp690dfTVIJMUEwkdGc8jgrmzwA/hGT5qQFHK1wHozwRvsDsqRRTjJMDxvnOOaDBLM9xXvCfBZxpZQQOqf8Auqr0Z+cdW74IMANKcHkpD0Zw24D8FUaYjctOPYgjsHwXgBznBUmKcHuI9yqbSg9wQYMU9TEcxyPCk6TUFXCAJG8Y8wrfo/cB+KqFH38JPuQTdLqOmkY1ssLQ4/srYrHDT17hKKdoGfBaxabGZJWyyR4aPFbxaWNgAYwBrUG7WOKOONjGhuMdwW5WiCJ3DxA+7uWj2VxJAaclbtZpuBrckA+3kqNztnEyIxcYlhe3hex4yCPevnzps6IRS1FVerRLGIJsvNM05LHfkur1OqYmyGjtrxNK04kf9Fn5+5b10a6cbqESRVUHXxSY66Z/h3gJR+d1RDJBM6KVpa9pwQVbX1L8rToJk0046jsMbpKF5zIAPUPh7F8tuBa4tcMEcwoPEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERBmWWkfX3alo2Al00rWADzK/QjR1lisei7bbImgGOFodjxwvgjSU8trqm3uFodLSyNMQcNi7n92V0e/8AT9r67Hqo6inpmYwOqaBgIPq+8dRSUktRUuayKFpkkLu4BfO+vekXTOrJzSTXOtpaCGQ5jiYcPxt4LlE+udV3DrZa2+1UzWjtRE9lwJxgqMrqcNggraabrWTvIkjaPVd4IO99Dd70NZq+tdTXgQwPG7qscLvdkBb7XdKnR/RNw+9MkI7mDiPxAXxzcnOZNwFphA5sPNYYB88eaD66n6ctBNlDWSVEgJwTwnbz5KXoulXQVUwObeo2k/RlGMfYvi/ACe1B9K9OuuY62xU1Lo+6GaV8n6b0fd2N99lwtmor4J+pN2r+tLsEF4G/vVu1XKpsklDW0ruF7SS7I4gWnP5qXvll9NrheJrlRNpqgCQva4NdnG7eHuPuQTHR3qd1FrmjqdQXioFHDu8P3Gcctgu61HTT0fMeXenSuJOBiM8vgvku61Ec83DAwtijPC3PM+ZWEg+s5unjQseerbUyexpCjZ/lEaXjGIrTVSY5ZJXy9whejYIPpCo+UnRtP+TaccR+07+KndMdP+l7rUsp7pRSW57sDiB7OfMr5TQc9kH37TVFLcaNlTbayKqgkGeJjg7HwWBWSSxkkFzcBfJfRb0kXfRdwBD5Kqgc7EsDj3eIX1BpzVNn1fZTXWudjnEduIntMPhhBjelTBr3h793YyeSsGpkcd3EqUraJ7IwMZJGcjkoSoY6LOUGRGHScDSXd5ySFxDpF6StQ02oKm00WaJtO/h4yzdwxnK7HDOQee3gVzjp10tFXWlmoKGPhqYDicAbuH/BBz2HXmqgesddXub4gAfgpa0dJmrJKgRgxzsBGxbu5ahZ7bX3SRsFJSSyOecDsEBq7BofQlPZYm1V1a2eo9ZrByaUG7WetqKy0w1lTEYpJG5LQSPvSScH9YC4DufghWaitAxghrQMBo7lHTVJOcuGfJBg6l0vYL9C9s1NFDOfVlYMEFcvp6Wu0PqT0Kr45aCchrH47O66majgdx5zjuWLqK10+pLNJb5MCoDS6J57j3IIh7QcPG7HDI8gsWbPFwMySeZ8AsbTM1VU291BUN4amleY5M/SaO9SzoA3ZBElr4HCAvkbTuO0jc5aVsNqqDNF1cjWu4RgSN7x4lYQbjIIBz3FUkGLdmYz3cPJBtdnqZbdJ1kWZad+z2E5A88KjXdrhr7ObhbnGQx9rIGC1anBdbpSvd1NS0+TmDCw7vq6/UtJI2amjnhIyRFt8QFYMxzpq2kjqHjrnNbw4cORCu2a+1McTnGBgew44cbEKO0veGXMN9FgI49ixu5ypyut8VqgdU1FNPHJjjDXMI4vJBI2TX1HpyaSnNrpWOqWnrQdxg+/ZRYqNFV0wnlopWP4+sJY44O641eqqe5XeonkdI13FjgzjAVEcV1iALH1DPuU0fSvzxpypswtrZOrja4uhc9ocW5AHePJatPpiGdzn011oZgeQd2T+AXHYLlfYD2ZZXeOWfwWdT6nvUOWuiD/AG7FWDp9Zpi47vjjjlZsW9XICc+4qUqfnOot3pNVSzNbBGI3jgO4XIYta3inl4sysHgCcBTlt6T7jGzqZH9Y0/RdyKo6pZqutiuNBXGTrXQEMABz2RyW7dPNFT1cdn1xboy+CZnUVOBktftz8Oa5BYekO2TyxtqaZkb2kO2OAFtlPqy7Gnkgt9TBXWireHPpngHgPiO9BDU1wbBUtLfWa9ocO8lb98o7U5r7PpuaKnzHUUbg57R2Q4cO32rQ9RWe51XpV6tlCXwMkEYdTtLgHezdbnDb49SdGlTZbkBBVUrRLTcRw5jiDlu/sCDg8sm5aCTvzwrWHnfi9ykb3Qm21bYnEbjIyd8LFIBbkYQURP6l7QBuzvVy6U0VwojJGAyoYNjnmFYqHSMZ1nVODfrcKw43TmUSmQiIdw70GHT1tZTxyR08mM7PjcNj8VJ0+vNSUVEIaS4xMp49uB8LSR9nJZE1rjuVOZaFzW1LRkMJ9Yd61WtgdlzmgNLThzT4qCfd0h6lfgmro35/2LfyVuTXd8c79J6A4jxjCxLA3RZt/wDnf0yOrB36ppI+5ZFTSaAqJCY7lXsJ+tGf/KoIm93auvEsbpG0jJGnDerwM5V5ti1CGtk9GD4yMhwePzWQbLpRxPU3+Vo/bbg/csK6yst0jI6O91E7OHskHkgvHT2pZqkspbVNOcco2cX3KsaX1k1w4tNXF4JHZ9Fec49yxqHUFyppuKkvlVE8jcj/AILOZr7VkDg2PVFUCw97f4KwbF/K6y0MbKK69HsJqoWhsgk42Oz5jIRms9DSOxN0bxk/syyf+ZaxbKWu1tqdsVReofTKgEmWoIY33nYLdndCOoQx8cWoLBK/9m5QgH4uVEPfNRaDqrVNFRaImpKtw7Eokfhv+8tJpo6l4a51unezHrCNxyuhv6E9bN/V1tnkH7NxhP8A4lU/Ueuej2NunZZbX2O0MsilPx3Qc6qHFjiHUErWjvLXAhSemZdONq3C/wAFe2At7AgceJbeeljVRZxy0VkkL+ZNPGc/Zste1XqK86qqaYyUVvp5GkNa2mY0cR9gWaJA/wCC6U5bUX2IeLsH8FruoX6fjrxHZZK2Skx2nSbEFStTo/WLG5FhlJcAQWRZGPFRdZQX60VEE1ytD42lwIbLEQH+RQR75aSMNzNUHi32IVdHJQzVccctZUwxudhz/qhbfPrGjLsyaHtjuyGkgSHBx5OWq3Cd9ZcHSw2mOnY87MY12PtKCUuNDYIYJpabU75ntxhnVuBPvwoQvYYusZWTYHirtXR1kIy60EMxni4HYV+1XC2QUroq6yPqM8i1xGPtQe2Wjiry4OvbKY+Eud1j3BopKowtuomA+kwkhWZ5aN0znQWtzY8+qeLIWRZpLR1j5Lhb5ZIhyEbjsgrt8MtbKI47rHF5yP4fvV640lZQ1Ah+dYpsjILJGuCwLhJaXVJfRUs7ITyw7JCqoTZS+Q1xqo9hw8OD+CC4x9ZxcLK1jnE972qUfbdQQ04ndPSlhGc9a0ke7Kha2OzektZQyVj2OG7nAAg/BWnSwYLDVVYaDw7n+CCUbVXAEjrYCR3ghPnCvA7TIXnPdhe2K32Cpp3uqb1NTT/RBbsfsVu9W600LYHU969KL88Ya07IJmOn1GaZk7bE+Rj/AFS2InKoqprnRcJrrHJCH8jJGWg/FRdLerlTQMbFf6hjWeo0A7fEKVtFHcNZVJp6zVEEbIO0H1UgZ9+EFoXWLAMlsGD4BVtudI94Y20SOce5rSStlqejKprmsgpdT2MNYPW9KaM/7y1qop7voXUjWQ3mhnnjAIfG5krDn4qwXXVVKwDjslczPL9C78lVHdLTBIHuoalhHc9hUr/hO1hxD/LLW7HcYI/xCy4Dr7pLtczYae1mnp3DrZI+qjOxz5IIKXV8HEBDScTR3YwvItbCN2TRbZwsO/aavcNWKWNlO10ex4ZWbn4qqwXoWRr6astFFXOD8kynO49hUG66e1jFWOEYp5WvHNsbCT9i3VrL5eaTqbbDLHTgZmeQQ5o/BYOgbpSVUNNdW2ChpMzAO6hrjxNyOYcSt8u9W6hq6qponMhpbizhDYznhOO/wQRukaWitUkL5Gifq35cx3efM9661p6/y6Vv8Jc7hoKtoeAOQB/BcRZNNC9zDlwJABC3kMqZ6Skt1bOQ9sZcAefBzwg+lLjS2vU9hloK+Jk9LVxFuOexHPyK/OL5S3RdWdHesp2tic63zvLoZQOyQV9bdHHSLHbYfmu79Y+Jji1krdyB3BbB01aWtHSt0bVcFM+KatgiMlO76QwM4Qfmcizr9bamz3epttXG6OaCQscHDCwUBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEWTbI2zXGniecNdI0E+WUH0H0M9DNBqTREVyvVRPTCVxdFwjmN9+XuWwf4ummI5g/55rOE8m4HL4LqdjtlRS6Ps7bXVRsphRs5DIJwFkUtHVNjL5pjK8ZLndyDlNP8n/SLZHRm5VTg7m09/2KfoOiPR9nstTC1zuqZl5lm2LD4gnZZurukPSukaeV1dXMqKvkII3ZdlfOXSf0u6h1fK6nhkkoLdybFHsSPMoNR1xDSU2qq+Chq/TIGSENlOO0MqFBJCB3jvvnPeUG+Sgd6O2IwvV4d3NHmgyri5zBAAeTFjCR5aAXuI8CdlfuH69oJ9VgWOB4IB3RDsvMoKtkyFSiCrKZVKIKsnxWxaJ1FctOV/zhb5nsfHgmMHsSDvytbyFdY4tgkAJ7WyD7E6Ndf2fXNAGseyC4tAEkDjgk+Sm7nbclwA7TefgF8UWm511ouEVdb6l9POxwcHtPh3L6g6Nel603yxSG9vbBX0sRBYeU2Bz9qCRu/UW1hqKuUQxDfLjgn2LU6zXlu4H07Le6rhds4Seq4LVtX6hqtRXWWplkPUMdiGLuAUS0xggbeYQb5bdX2OLhjgtYoQdssbsPepSStEzOtZM17HcnNOcrmnVsduxxx3t7isy13CWhfw5zGfo9w9iDcZ5zjCw5JfNUCQzxtexwII+CsScWPNB7JIScZ28fBXIKt5cIonFuDu8KPcXSEhh7PeVk0reDYY80Ej80Urq11ypQGve3hlAPr+axpIcOIx3rPoZeEefJJIu0UEcIwM7BY80QwThSZj5qxLFsUEHUx45BYEoODnlyKm6iPOVHVMW2MIHRaYrJ0h0khjaaaeQYaRkNOfxX1v066ct950FS3ikpYWlrM9hoG2B/FfHfE+nkbMwkPjcHNPmF9q9EldFrHogdRvd1j2wlgBOe7b8UH556/oH27UUzWjDZD3K3RS3eWj66IMkibtgu3C6H096dkoa6Z/VkPhlOduYXLrXGJHGOarkpm8xg7FBM0lfWwvaamhe+PvLQs91xoA7tsnjdz/VfwUTBBVEF0F0YR4OcMKUpprs6Ph6ujqOH6QwgvwV9ueCwyN4TzEjAPwUfVadprhUGW3VEQJ3LWu2WY+apb/pNljk827LyKpbA7rGWeWn3ySwkqwRLtN3inJ4W5x5LKtlTe7dKOFk0bh4Zwtio6wVxLYq6WE43bKzl9isy0lw6ziiuEbxnkSN1RsGn+kWro6VkVRPJFG5wBe0YGfMcls5rK2vlfdKC6Onkk9YsLcj3cvsXN5aWsmBE9FDOzHJn8Fh0guFrrBNSippmN+gHbfag3S8WGaumdPUyVBlPNxbz+xRE1imp2nhkJz3EKSpNe3KmgaamCOYd+W7rNh13RTjiqbfDg+YCCY6Pp9Nh3oWqKcOpnDAcAdvgtw1B0F2jUNrN26PL7BVS8PEaGSVrTnwAOCufP1PYJm8MlCWju4CCr9o1DaKOqZV0dbX2+VhzxMLhv7OSlGpDTF90/e5KW+0dRRTsdw4e0tb7jyKh9VWh9HWOqIf0sLxk43XfLj0tWK92Z9p1AynuZIxHUyxFsjPHBGM9y5HernRUNb6PSvhqaKQ8uLLmhQcxro3U83Xw9pjuZxyV63Ud2uLi6jpRUNbz4QFNahoY4ZQYxmjn3accitfhqa+0TuFNVS07HcyxBmVlmvcb8m0OAI5cBKxI6aviqWGa0yuaDu3q3YIWYNR3hoxHeJDnA7QBJ+xXxqa8xTBklyjdtkcUYwfsQZdHW6Thron3DT9WGg/pI2kjZbMyt6Gpnf5RZrzFnclhJ/BaJWVVdfLhGHVMPXu7IDQGgraabov19OBJT0ME0bmAtLaiPcH3qwSlR/gSNHM6jm1BT1PCTFlu3F4bNXNvTTxENkqgBkZD3cu4lboeifpKZkfMD3kfVc04+CmbINV9G1slmv8AoOlrIJ3jE1XETwj2ggIOYuuUjcBlbW478TOCz9Px2i63mKG+XSppqd4w6ocS8t+OV0f/AAp2yVjus6N7G/2Bw/8AEonUeubLc7TPSQaAt9HUSDEc8Zfln+9hQVT6P6O3bU2unhg9Vz4iM/7qi7zpXTFBb5Kyg1pHUTR9prGtIc4+Wy1632y8VMQfHZKmSPGzxA4gqiS23duWO0/Vjx/yd6C7HqC9lp6rUNZhu2OsI296xa6519xaxldeJpg09kPcSAp+zXGwUVuNLdtLVE1WHdtw4m4HsVu7XDR0tLI2j09U003c4vJCCuk0k2otsU8epaFr5DngdJjh9uSoq92ya0V7YvniCoPMOhdxDKw6dkLqUyClfkHbBPJWeOAPBNPI3B7+Z+KCXqr1qA0fos11a6EjABY3OPgo4MqXRMZFKXzSO7LGAFx9wUvUTaQqaQZZXtquH3Z+Cmei7Uln03dfTvmf5wmaf0fEwvLd9zgeWR70GN0b2i1XPVVPRapuc1tojvJiPhcQO7cL7B6P6noQlo4LJR6XE1MXejmsqIHDjd4k7YzhR1vp+j7pP03R1V00420VjHcUFZHC6MhwOwIOxHuXUdO6Pp59JOprjHb6nq3j0eSjj4TgHYux3oOL9PnybqX0miuegIWU8MsuKuJxBijYQTxjO+23evn3pP6O63RVJFXw3WivVDPIYeugA7DxnI+whfo5eDS27R00NdVshYKQse57gM9nA5+5fnr0iXZlqsl20ZcuLHppq6KQDILXO4s/AlBza3Vs9HVR1LqGCdrf5t4+3ZX7pehXRCKKzUsD+PJcwOJP2r2xQ0M4qBJdI4CW4DpGnCxblb4KKpYynvMVTkZ42AgD4oMk227eiNn+YZnMfyIidhW6CWnpbgDdbO6WNnrQgEZ/FZEWob7TRxxi+Hqm+q0tBH3KQ07Zqu/Ty10l5oWvJOWzStZn4kIM1990RI5vWaMqWBnrcEjuXvK16WlNbWyy0dmqIqUnij7D/V8M96ldQaPuFqt8le692ydvEMxxVLCefhnKkbR0i6ottthpaee3SQRABvWRMyPsQafLHNA4n5uro2jvLXtW9aXHRJJbYH6g+fPTt+s6tpLc+3hKzqXWutNYNl0/S0tmnlqW4J4GRub7CcBY0PQ70k9S9jLfSlwOMemQ/mrBlOo+g2QvebtqOJxzgej5Ge76C5/PNHSy1YtNXcIqISERPa5zC8d3EBhbBcNOaq0FdqG4X+10ZY14e2OSZj2vwe8NK2rU3TFUXW1uohojTtGHAAPhjIOB37uQcrpHxzzsFXWVkbT67su281s9jtekpJWiW5Vb3veG8Jb49/JUGG+XiOOUWujhgPJwcG5+JWdZ7RWUdwbUVdPDwRZDQ17XcTsbcvcoOkRUraK2U8VE5xpoG4a4c3HOd/ithLZYbVTMrnND53Dq28QJbk4zstW0DV2u10MlTe6mpqJZKjjNFzaOWN8eXit+vXSDp27Pjgt+n4KcRsDWueSTkd/NBkT1OlbNVNidTS19TE1pe05wXEAjl7QpD59bMz0mekjpOPsRYBL3d2AFprZPS7hJdKljYKaNw6xxBAe7A4WjPPuWodI+u6215jtj2yXCYY5AiBvdjzwg6tVV9j07SPrLhNR0n0gyeYF5P9nOVD6Z+UDZLfqOjip3SujknbG89WRGGuIBPJfM0EF0v95j+dKqeTr5AHSSEkAk8/Jbpc+i9tvkibbtSU9ZUyFuIY2lzsnu25IOmfLZ6OKekkp9e2djfRqxrXTiMdkcXI58yV8sL7LpHX/X3RpX6MuJDKmz0nZgeN5WtHETvvkfgvj+8UUtuuc9HM0tdE8twQgxEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFl21pLpJMbMZkrEUlbmuFsrJANsBufeCg3zRPTHq/S9C2hp6ttVTMHBHHMMhoHmruoemPWmoSymdXijhcO0IG4JXO6Wiq6kccMDnDmSRsqqNrhU8Ls5aDlB5Xzy1NZJJNLJK8u9Z7sk+asEdrJJJHmvX7yOPmUQeYQbL1EHh7k+m3HivV6z1x7UFdac1J/sj8FaCrqHZlKpQeEZTC9C9KCnC8wFUvMIGAmExheoKcN8EJ7JAVS8IQeHuJ7gtv0pbhTUgrZmkSSjYE42WtWekdX3KGmA7Lnji8hndb/ACljSWN9SPstHiAg9Mh4gQAABuqMjOVbccDi4gB5q2KiDOOsbn2oMxkhaRwn2rMa9szcHYqMa7Iy3BHiCr0MpaQUGwWCrMM5pZT2XcnHkpqaIy9luQzvd4+xak4lzGysO7TuFuljkZW21jge20YIQYrYAw8vcFXFGePks91Oc8t1XDSuJBwgopo8LMZHnuV6GnPgs6npcgdlBESw43wsSZmO5bS+h4mHACiLhSFnMFBrs8e5WBNESdlnXGQxOIUfFWM4u0UGJPTntdnuXf8A5Hd+NNcaiySuJa/doPguRW+CCsLcY4idlKdG2rLRYukqhZS1X+UMlDJRyGMoOifKj0aG1c1SxmY5gXbBfK4sbWylzoeNrTjdfot0s2iDUGjm1LWB5Dc5H1SF8bVNhLLpVUuzeBxcAQg5jNZKcvaOodG3vwShstPTnjp6yeJw3AAW/wBz07UOw504hbjIwOaxo7ExpHFOJDjyQal823JsYey7Pfnuw3b7EdR35mC2aJ4He5vNbW6xnfglI9isGwz90mfMvQa1/nkOy+Cnlx3NHD+KyWthcQKylkgJ+oSQpiSyVjBlk2P7LgrbbZcWnIe54HPjxhXRGMNPE4iCvkh9pVFTLNwAi5RPHi7CorILvTyObJRRSNzkOwsKaaYn9NaiWd4amjIfJWStwx1NOwc+BwP4q3AHCZvpFu6xmd+ErEdLQ7/5FUwAfVyqoJKZ4IhuUkPk8Jo3q3WDRlztoezU8drq/pQ1TCB8dlS/QNLMT6DrSwyY7uvwT8XLThDUSbsq6WUDvcBlZ1nhtsU/FebeaqM7k0r8EfBQTk3R9qED/J7laKpo5cNVHn71HVGgdWxVHXC3083Dvlk7T9xWVUno6YC8VV8o8d3aOPsVtjNFT5NJre5QuI/nOIY+xBHV9l1XmM1VkleGjAYxpICha6xV8uBPaKyneBu/q3H7MLavm6lcc0XSYB5SFVzW6/RU75qbXdvqQxvEB1jMkexBptvt0VukMtyt0tXEeTg0tI9yvzTaMmeeKmrIiOY4ScfYq/5W36JpL62llDXcJDmNKx3WS+3hzrpB1MvG7cMwAPcgMg0c5+WVlUzG+eAgj7FjXO4x0VUI7VfLk+AtBz1rhjyWRU6a1Ixw4aHi23wAsuyad1HTVcNbUaZnrqZjsuZ1Rw73hBhRatvsbOKDUdzbjAAMvcqbjqi63Wl9CuWoayopwfUly4fYFudbq3RcMroa3o2kglGzmiRzfvKxhqDowmOJdEVkZP1ZicK6IyzaJoqyhhrf5ZWmDrW7xSScLm+0E7LIb0bhzXNZrGzv4RkD0lozn+8oPWE2maisgdpy1VNNCWnrBISTlQjgwMB9HmaRz2Kg3Crueo9J8FoptTUzo2jiaYS2Rvx3VP8ALjVbHBz73E4vGwdG0Z+xavbHWt1wj+dIagU30yzPEtqezo4miy6pujcHDOJu+P3UETRUt21FfDmtgknl7by6VrG+zdZ0+idTumkMZo2sGT/pUZ/FYt9Zo6CmZLZa6tfOTgggg/coV9RG0b1VY1x/bKCbtl2v1gdJTMbRvcDhweGuCsX28XW7hgmio4y0/wA0AMrHsVPZqyuDK+5yUrCN5CC7dSN5smm6WiknodS+lSM3DOAjKC2yxX2oooqmjt3WNA7Tmtytz6JtZ2/R1LWuuOnm1txe8CNzmjhY0HcfFc0irJYoOGG51DGDYtaXAKiOenED431Mhc48yCg+m6n5QtlqLV6C7SkkTm7tezYB3sC3fQ2u7xSUdLe6WOeCOUcToZAQx7fAEr5Y6GtLSat13Q2mJ75oi4PmJyA1g3JX1L0lajoIIobJamxst9qaIWOa31i0YJJ+KDA+U7JeOkHRsWpdI11XFJRNDbjbWO3LT9IDmRnC4L0s2+up9L6ZrbrTN+cX0/A9hB4+DB4S4ezC6zpfVhttzhulFIZaZz8TRO3a9nJwI8ufuXK/lG0tfDrn0mSvc+31kYmo3fRa1wzw+7kg57FSGSiMzLa5zjsAwE5ViifTRVjHV9ukdE04e1uQcKUtt2vtnpR6NXxsjcc4LGnPxVVrobtqK5ycFbA6TPHIXFrWoMi43HRctK8UtgropS3DHmUEA+zChIoC2mM5o5uHu7WMqb1Fpe9WaJtZU1VCWudsxkrT+Kz6XWl+pKOOn4LWY2AAB0YJKDW7MLVJXxtvTauKjJ7fVk8Q9xBW3Mh6JJKcMlrr7CAT6rAc/wC4sVlt1brKoFXSUlIGMPAer4Wjx70uOgda08csptsYhjblzuNqCJvbdMUl1jbpmtuU0JHaml/Rub9gWJJdamOYMiudxJbu3/KHdr7VtGndZ1ljtLKJ2lrHW9W/DpZg5zzv5OU/Ra8qr3I61UfR9p6WqnYWs6pr+Np8fXQRel7boK/WaKq1Zry5UtaHkCndG6QNHtwVi6qsPRpRRh9q1fX18mDlpgIGe76Krl6M9dljpGaYqGzOcTgRkBue4Z5qMltWpdGV7JbzYoA6QHDKkbHb2hXRA0zsPHBLVhrT2SXHhx7F1TohotPPknOpa6eOn4S5rRkuLu44+C1m0akra+vgoWWy1xOkduQ04H2rcH6djqaviFwihOMO/SNaMqDcZpei+hlxJJcKiR31Yjg/YrkWptC0pxQ2GWV7O+YlufbnC1SLSVtYQazUFE3HjUsyPtVc9j0IyKRk2pIpJgw7RvJJOPHOEFjWGtp7hVfoYoaeliGIaeLtNHi4kd4WkS8czzJ1fWPeeLjeN1kRijhkkjpGyys4ueM5Cqc1znjq6d7OHxQYhZVOcHMjhjdzzg52967BoK78Nop32fTPpdY0YkqHcuL2rlr4Z3RnOADyA5rdujd1ydTTW+nvENup4zkl5GTlUdt0fV11m1fR3e9Q0rXVzRTVETOTA7Yb589184fK50Z/JnpCnqaeItpKv9LEcbFp/jldetkdmp6SeJ9/nutyc0yM4dwxw5ch5LK+VBa26s6DrVqSKPiqaIdVM7G+M7Z95UHxUi9IwSDzC8QEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAWz6fozVWQx47L5gSfIZWsLe9NYj0/C0Dd5cftQScMccTGxQgBreQUXfrc1zxcImgOa3EjR3+CzuLzwVfY7jgliIyHsIOfFBzvG7j3cRTCuTQvinkjLSC1xBXgY49yC3heY35q/1fmF62Md6CwAqmjtD2q/wNxyXoaAcoMeUZkPZXgBxyWUW5dnZeho8EGJg9wXoa49yynN9i9DUGLwFOHHcszgCcAQYZbtyVB2Wc6MYWPJF4ILK8JGMeOwVTmlvMKkkZB8Afig2bRNPwtqKwjG3A0/epmaVsbOskdwhoOPYrNph9HslPEB2i3iPnkqD1XWkcNOwnluQUGJeLxLUyGOF5YweHeocySZ4uN3xVJOUQS1qvU9JI3jJlZ3tK3CkqY54myxuyHb+zyXOc45KW09cnUlQI3k9U8437kHQqKUNJa7k5bFo6qFNeBSv9SY4HtWowvb2Xg5aeRUpFK8NZPGcSRkHPgg6u+iPEQW5PIFXYKPBHEAPetPl6VrDRwRwVlPMZ2MAO/M+PJQd36aT1ZZaLXwnGz5DlB1kUzIozLLmNg+k7Zq1nUvSBprT7HA1LKuoGwjjORlcLv2ttSXl7vSbhIyJ383HsFrpJc7idlx7yTkoOiX7pb1BV1hdQGOjg7mkZUvpbpWFQRS6ihb2jhs0X4rkYyNsrwjn4FB9C3OCnuNJ6ZbZ46iIjJcw5I9q0mtqYqaR0cszGOzuCdwtFsl/utnmLqGoLWuGCx27VbllkraiSoqHOe95ySSg6XZtR0FHMwmvYOE55qF1pUWOG8U+oLHXtNQZAZYR4+K0xjGNeMtxnvysSte9zuEgDfG3gg/TPoJ1PTaz6MoGPd1kwg6t4J57Lh3Snam2TVRqnNLYnOLHnH/AK8VAfIZ1x6JejYKmfDHbAErrXyj7eKere+Vo6idnFG4jZrv/WEHI6yO01o4ah55bb42UTJp/TXESKxzSfCVa1P0pi21brbX2cPfAOEuacZHisql6VtLzbVFufCe8kZ/BBMDTdm/mbk4e2UKifS8fDmnubvI8QK8ptb6Lq8Ynjjz9ZvD96kqet0nWuxBV0ryfCXH4oIn+TVcwZFxc/wxg/gsWe03VruEVGf7TVtjLZbJP1P+5ISqJrJCQR1szQe7iQaJdbHd6ujdE6YNxy4Vpc1tvVHUGE1bxI3ucBuuvTWQ5PVVc2RyGQtO1rp+q4PTGVUvXM5jGdkGmuF4b2nOgk9oVDpa8/rLdC/x4W81YqPToQZKefjb4Eb5WEb9XsPDKCCgkmzUok4Z7ZJEfFpKqY+g4sNq5YPJ2VHjUsoPbgYfaMpHqKPjzJDG4HuLEEpC2ATteyvjeQdhLjBWyDUFvjp2x1GmbVXPA9Zjtz8CtQ+ebM8cT4JA49wIx9yuRVVomHY4mA89iUE9LedLTuPpPR/K0d7onOx96x33Do6OQ+w3SlPIlkn8FRbbwLd/ybcmxnvbKwY+1Z/8q7/I4Mpxa62Rxx1ZjaSfggjGs6NJA5rZ7nAXb9tuR9yRUWjWR5o9V19Pv6pGB9ynZLlqYAek6AppT3uFM/B+1ajeKO71d0kqP5My0sbxgMEDsNQeX2q+bKxkdu1PNWREbuHNKPWepqBjI4NQVDGDcNc0ED7FcsElBb+uhvul6ipa45aWNc0j4qa9N6NTGDW6cutM49/Ht/3UGrSy3DVF9Yam6ROqZjvJIAwe/uU/L0eX9sRENfb5XA7Fk7fzVyR3Ra8gRfO0BzkjI2/3VrN8qbZDXvjtNZXS0vNruPBQTdLorVlNUxzR+iSuY7IaZ24Kzbnq/UdDUuoau32psse3D1YOcea0z07EYcKqtBH+0V+0stlxujRX3Oama7nNJ2kGwz62us8MsEtotID28JLY92+Y3UXZtPajuVNLU0VtNTGDglgz8ApWTTek5p3GPWMbBy7cR/NYt2ij07HGyzauNTE/m2EcOD4oLf8AJPWkbQ52nqos9b9QeXwUzS6spqWnbS1ejKKV8QDHcXEHZGxzvzWvO1LfGRH/AP6SoMbth3kK7pWzU99qal02oqOhcO1x1R4eMn2kIPdQ3SO71MIoNPQULfVLWBx4iferFVYr9FIOPTdaI+HOfR34I8QVL3DQ0lvo5LjT6ws9SYCHtbHUNyT+8qG601d1HVv1BxR8HABwAgDHigxNM3SzUMM8N50yK9xd2SC4FvwKxHQU13u7o7Za+obLJwQw7klxPJV6ds1Xe7t6My60jJJGlxdNM2MZ9pKvXqy3jSV4p5JLpRmdpD43U8zZAD7ig+hOirQdZ0Xw1N3vV1ooa6qpP0dJGMvaHY59+Vy7pO1bLTzPt9PHI90gLpC7bmcrUrprLVtdXmprL2yWYgbmQHYBR15uNVc+rnqqmF85GMgjdBvXQvZ9T6muT6eyUvWQFwY8TOIHEfD3ZXU+nTovvlF0OuuN8gjjqLRUYhy8ZfG44wP3s+5cA09qfUthpBT2m4MpsS9c0seOLiwR9xUlqjpC1/frS213u+SVFMSHFjnhBG0NVouW1xx3L5x9MY0tIZjhPh3KDjko+NxiM8bRkNPHgkd3JbJV6R1K6zx3GnoCaQx8Rl2xzVGlNQ3Kx000TbRbq4OdkunZxcPwIQQdG+11NXFDX1Va2md+scSXFvmFsclv6OzE4i/XUFrTgdVni8Por2qGodaXhht1ggZJG3tMpYjjH2rFu+lNXWxr6qrsElPTtIJe+Ihp9pQQtJO6F0wt9wq4oGuPCQ/hLh4nzWTbro6pq46asv8AcIKZ54ZHlxcAFt1LrSOnoIqWTRVnkYGgdY4O7Z8T2lYrjcNXvhFn0fDSRQOxK6kic8feUF1tj0AYDTN1rO0Hckw9/wAFCXmlsen7pTyad1LUVUpH65jccH2L25aS1UyWQx6brW07Ny59O4DbzwpHT+o7VbLYyCu0LTVlUxxDp3lwPP2oIio1rqGN7onanub8bBwk/gpapGnLjQUtZeNZVtZVn1oTE5wZ9ilYL3De+uorP0cUj6mRh4DG173N254BUO3o56Q5Yw2LTVYHSZODARwg93JBZfQaPZSTVFFXXGWqacs24W+7ZZekqqwTRzfP1NeZHl4bE2Enlt5KSbqDVGiqensFVp22QVAwAZ48vJPjut1t0fSxPwTmlsdLE8BzHEsbsRtzKCGpIdIbmn0Vea12N+MSHbzPcsG6TUFZ1QtGm4LWYiQ7icST7clTuoq7W1oMUVz1DQtE4IeKd0bhg+xalGynJc6SuLuJ5J4RuUFzq61zu0+Fh8sBVMh4suqLgI3eWFS6K3kYEspPmcLMgkoI2gChfIfFxygssipMgvqi/u7JUtpo2eG4j0mKqnaQTwNBOdvJWY5i4ZitTPAbHZZlknuhu8LKWiibNg8JcwgDZQdI0jcoYqxsNl0o5pl2fLOCMfFdBtdAbt0VaxsFdH+lp43zcH0chvEMLnNqp9VzVMfpF3paKA+t1DMO+JJXUOjHq23HUdrFQ6pdPbj1jieexGVR+e14g9GulTBy4JCFiLY+keAQaurw0YBld95WuICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLdLbMKeyxvfs1seRnzWmNGXAea2K/TmO3w0zTgFjfuQUx6ilFQMtBiJ962WjmZLGx8buy4grnWeS2bSdZxNfTvO4GWoK9SQhl0c9owJRxKMIOVsOpIusp6edv0dioUsHPxQWeFecKu8KEILWEwqyEwg84V6G+SuAZVQagt8PkvWtV3hyvQ3dBRwpwq9wr0N2QY7mKy9qzXtwFjSDdBjED6W68ipuuqoWNHryAKtw3Wfp+LrbrCPqni+xBsdY9tPETsGxR8K0CvmdNUyOJzk7LbNUVJjpiB9MlaYcF2yDzB54XrWOceEAlx5DvUhaLZVXGXq4GHhz2nHkFvdmslttTWmRoqJ8bk+KDTrdpm5VjQRGY2nvcMKXj0RIB+kqe15LcPSZDsyNrQO5VCqn/o2lBCU9HJQxNikPE1o2KzaN5PEwnh4hjKyq0xSwFr2EP57KLgdwu3PI4QQWtqXgkjqm4xjgOy1vJzg5HvW/agpRVWyZh3dw8TVoBcccJHazgoKkyi8KD1DyVOcJxIKm7uAWfHGA3ODkrDpm5flZ3ACM8Jz7UAsLozhpBWJXtHA2U+wrMAIzljiParErONj4jtttlBMdFV/l05rW318b+Bglbx792V+hXSBTU+tuiGK6Qjjc2HjyNzy3X5lhzmPJb6wcCCv0C+Rvq6LU/R26w1kokkjHAWk92N0Hxx0o2x9Hc+vcM8RLXH7srTh6ueWV9CfKP0q+gudfT9SQ5vEW7d/cvnk5GGnYt2PtQe5HeM48VUJHAgtc5h/YJCpXmUEjS3m60hDoK+ojx+3nKmrf0g6nozn00Sjwe3OVqZcmUHS7f0s17MCuoY5W9/AcFTDOkexXFpiqY5KYuGDkZHxXHMoXbdpvZQbnehTekumoJhJTPOWkHOFGTwRStAkaN/BRlrqupf1L3foj3KWY4OGfggj/QZKeXrIQx7fByqqTRTNxVUb4HkevHuFIKlzQfWxhBEfNbZR+gqWSDw5FWJrdVQHdkmPHuU51EROWtwfEKtr3sGGyBw/aQaxwzxvy15BVxs1YHB3G8EHILditjf1Uow+JpPiAsSSihLiWhzSgtQaq1HTNDI7rVNaOQJ/NSFPrrVDRwtvGT3BzAo51C4jdzSrfzcT4H2INjh6Q9WQjidPTPx3vhBVq/dI95u9s9BrKSgIznrI4cOUALdUNdmOT3OVmppp2E9bCD5tQVG7TtYMRR58281dt13EFZFNLQQzMa7JjPJywPR2kdl7m+RCp6iUcngjzQbrJrezPf29J0YAGDufzVMWrdKujcybSUbuIHBbJjBWm+jv58URPtQwTH6gQZc9ZQOe5zLcGtcSQC71QkFZbBMzrKAlgdlwDtyFi+jVGNuA+9espKjPJnxQdDj1D0WSwxMqdL1wc1vac2cDJ+ChdY12g6hkDtOWuvpXD9Z10ocD8AFqppKkn1WfFeeiVXLgb8UGS2a3kHLHAEYxk7lbbpubo6fa+DUJuTKtr/8AVyOHH7pWltoajBzE0+9BRVIdkQj4oJzUbtKMuZdp6av9DAwOuIDs/ALDo5bOauE1k9T1ecSOByQ3y2Ue6kqjzgdjyC89DqR/MOQbLqmLQjOpdp6ur53EfpBMzhx9is6apdHVNTI29XStpYWt7D2M4iTnvGFBCkqMZ9HeqPQ6nO8D8FBJXSGxRV8zaCumnp2u7DnNIJCm6i36Ndp8Vo1HN84cODTGB2PitSdSTtcf0EnJeGCY4zBJ8EEoyrjdD1Ju1U2MNwI+M8K2LTenNJ3C1iSu1hFQTFx/RvjJJ+1aO6mkGMQy/BBFIN/R5PeEGzTNgst0mjs+onPaNuuiJbxBXYaue71ENurtWSxU0pw98z+JrfaFqnUucf1Th7FQY3Z/UuQdRk0bpxzGQnpCtpjjGAW4GftWuw1NVYauqpLPqjgjD/1kThwyBaiGY5xOCCMk/q3AexBv1lvl+udfHb59ZupoJ3EPkle3hA81OS9HdqMZiPSLZjxOJLjK3f8A3lyXhI2DHjzwq44ZnHstfjvyUG9XG2jRt0iksWs4J5XsPFNTuB4eYxzKzdO3663i7RUNx6QKi3wu9eeR44Rjdc9LYohlzjxeBViSbizwtGPYg7bXaO0DXVDZ7v0rx1coPrtbuPflZM1k6JaGglqJOkW5V0zYz1cTC4bgbLggbxHA3J7gs2K31DmZ4eBvmg3ZupdOQMAa6qnLCeF0mTkZ8147WlkYD1VrllPPJdj8Fpb6eniwHPc9/gAr1Nb6ipcOqpX48wg2d+umiQOprQwY7nHKzaDVWpbpII6KipYmnbJb/FRFt0/OSDJiP2rbbS2ktkWQ9sjvIIJO32u9yATXC5MjB+hG1TFsgghrGvE073NyM5Wu1F9kdhrGkBSGnqp88hkcdgg6RaJGbcXE8ebl0Xoue1mpLzIxoaPmp5yDvs1y5VaJvVXTejOVsdBqmveMGC1vbxe1rvzQfFnShMZ9UVbiAMTPAx37rU1sWu5OtvVQ/OczOK11AREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREFUW8rf7QUpqGQmeNnINYB9ijacZqIwPrBZN3kL66TJ2a7AQWIInTyBkTeJ3IDxW4WLTU0LBVukw/G7Qo/SVJGB6ZIN84b5LcLZOROWE5a7IwgjauPrrZM0gAsOVrrWg8JHIDdbbPG1tXPB3SNOPvWsOb28BuBxEHyQWeFUubusgtAVLh5IMYtTHkrrgvAAgNaqwN161p8FWGoPGhVho8F60KtoQUYXoCrwvQEFqQdlYso2WbI3LViyjbCDDeMFS2lmH0uWUD1Yzg+ajJOamNNhwp6hw7yB9yCP1XOXSCMfRHJRtltktxqhGzZme07wCyLyHVd0MEYJeXABbfZ6KO20rGMb2yMvKDKo6eKgpmwU4AaB2nd5QzYGWjCpe8uBz38lae8jn9iDIbMSPNVx1BBAKwA5+c4IHnsjZhg559470Ey2qDuy4DHio6rjZHOSz1HHIVEbwW5a7bzXj3EgcR5ckGVHhzG8W/0T7CufXWE09zqIiMcDzj2Fb5Tk8DgfAkFaxrSDhrYqgbCZm/tCCCXi9wmEHiEbL1MbZQX6IZKysfslY9KOEZ8VkH3/FB6B3FrvcqJdnAgPCqP974rx7S4bcSCPqmhtRkDDcLtXyO9ZP050jRUM8hEFXhoGds5XHKyPjh4gd2r3T9xmtN5pbjA8tkgkDgR7UH3t8q3TTai3xXyBgLZG9ogd/ivhLU1IaG9TwEYa53G0r9GbNVQdIfQbFNkSyCm3GckEBfDHTBZnUdY97mYdFJwu27kHPMnxRBvgg7FeDkgIhKZQE7sdyZTKAd+9S9rqhKBG/YjYKHPlzVTJHMIcOYQbK4lvcnFtyWBHcoRCOsPaCsy3Uu/VswO45QSoyd+HkqS9o9Yge1QE1bUP5vI9isl8jzvI4oNhdUwN5ytVp1fSt5PyoLC8xz2QTgudNvklUm6U+cAOULz5jC8wc7FBN/OdP4OT5yp8Y4XKGymUEx6fSHmwrz0yhJ3YogL3CCYjqbWX4dBlZ9PBZJhkwn4rWCNttir9NPJG4cLjjvQbA5mmY3Fr4pCfJ2F6G6XGzmTNzy3Wx9AWgIekzpGbp6prH0sPUOme9oyTggY+1fT7vkdaP24L9c25HIuaf8AwoPj8R6W8JvivRT6XP05vivr4fI40oP/AIguPxb+Spf8jfTJ9TUVwb7cfkg+RPRtMDcSVHxVXo2mXD9bOB5uX1ofkbWHP/vNWH2tH5Kh/wAjay4PBqaqz5sCD5QbR6Zx/pMv7yqbRaa/rMv74X1KfkbUbXZZqqUD/slQ/wCRtT7lmqH584v4oPlx1Bpt23pkw/vhBbtObE18u37YX0275Gzs7arHvh/iqHfI2nwQzVTM92Yf4oPmd1v0+fVuMv74VPzbYsf8qyfvhfSj/kaXLPY1ZCP/AMB/NUO+Rpdsbatp/wD/ADn/AMyD5s+bLKTtdpP3x+Sq+abQeV3k/fH5L6Jf8jK+Z7GrqU+2nP8A5lT/AImWoP8ArbSHy9HP/mQfPHzRa+67y/EfkqTZ7Z/0w77F9BTfI01KPU1RRu//AAH/AMytO+RxqnGBqihJ8Or/AP2QcBNntp5Xkj3Be/NFByF7OfYF3eT5G2ss9jUVC4f2f/2VuT5G+t+A8N/oCfZ/+yDhvzLSEf8ALh/cVMmn6V4wb2Mf2V2x/wAjrpAHqXi3u/vf/soXVXyVukGwWCsu8tbRTspInSyRsfvwjc96DlI0lSuwGXZrvHsfxVxukaVpJfci4eAbhQFFWzUbngHiwcEHxV758rTy4B7kGy0VhtVF2nSSSvPIrIdSW4/6s9/9pacbnXOOTNj2IK+rG/Xv+KDc2R00Z/R0kLfaMlZLJnY5NA8m4WjNuFad+vcsmC61rCMy8Q8CEG58bubnI3GOS1mC+zt/WMDlJU15pZMB56snxKCRlPZOO5TWlziFxPeVBPcx0JexwcCO5TthHBSsPig3S0yYI3XSNN1Qpui7W1a44zTiIH2jl9q5bbH7hb7fJRR/Jyu1QDwurKwRj2N4SUHyBqZ3HVF3i8lRClNQHNR7yotAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREFymPDO0+BVx3FLK0YyXPO/jurMf6xvtClqOnMl7iYR2c8WPJBtdvpCyijibjAbnPmq4nvhqYyR9Lh962jR1FbZLhDJdmPdR8YjdC07ynIGB9/uW39NHR1BabINVWKnfDbeu6kwHcxjff4hBza5dirimHfsfaoCsj6uqmZjGTlTtVmS0wSZy5h5+IB5qJuzSKouP02B3xwUEe4KhxACuvOyxpXgAk9yC3JI1p7Ss+kR8XMLArJy+Q4JwrAAGSSUE22qhxu5VsnjPJ4+KgTu0HJXo8clBsbJGH6QV5m42Wr8cg5OIVxlTUN5SHZBsq9HJQUF1mae32wpGlr4J9j2D4IMt2OXesaYLI3xk7+asTckGFIpywngt0rsc3KEkU7aG/5sA7nP3QU2SjYKuWtkblxd2MqZkdxHxJ3yseJrWMa1qvYBGDyKClx2J7hzV23UNZca9lDb6WWqq5DhkUTSXH3Kb0bpeo1FM6ofUtt9tpz/AJVWSDssaO4eZ/Fb5HrO3WFjNP6DpoKASngfWSN45JT3nO2MoMaxfJ76TLtG2R1tht4cM/5RkPx7FE9I/RBq/QVtiuV8fRyU8j+BrojuTnHipC8VHSHQXq3VM9yqxDJVws42PODxPA/FdJ+WZeKlr9F2CF3WTVJj4s8iTgZPvQfNdwt9ZRMjkr6OelZKMxPkYWtePJYReQQH7+C/RdmhrFfOj2gsd7tsVRF6Mxm7MOY4jmD718fdNHRQdI11VU2Ss+cbLG8iQx7vpn+D8d3LwQcypnZOCcBYWq4RNaGyY3heAfJX4HHxGMcxyPmsmpjbUW2rhP0o+Ie5BoOAmFcLQ3iDuYOEwEFvC8cMBXS0HkqJRjhHmgyIAAwK6W5PeqI29gK4G7cig84T+17gquLAx2ifYvC39kn3rzIHN2AgtEY4mnvUc5mHlh8fgpObhBBa5Yda3tCTx5oPsf5Bms/SqGo0tVycQaAGtJ7ioL5UWkDR32tayP8ARzglu3tXFPk+ask0j0kUFa1xEbnta7fA596+tPlLXWwXrSVFcqOupZqojLmxuBcNkHwXMzqZTEfoOIVIOymdY0kcN2MsB4opvV9qhGjAwUHpREQEREBERB4AM8l6iILlMAZeE4JIXhkwS1zN8qhuc9k4I3yr8zRKwVDefJwQW+Nn9GF6GxvBHI+CowvWjHaHMIKS0tPCc7eKYV4t428Xf3qgDJQU8KcKrwmEFAC9wqsJhBSvWN3C9wvWesEHfvkIt/8Abi477UL/APvNX6DgDhby2C/Pr5B//wDOEn/0D/8AvNX6CA7/AAQVL0cl4vQUHuEI2QFe5QU8vorBvF4tlnpPS7rXU9HT54esmkDW58MlSCgNW0NPX2eqimt8dxexheymednP+jnyQeWvWOlrpVtpLdfrfVVD92xxTtc4+4K5d9V6ctFUylul6oqOZ+OFk0oaTnlsVwfojhoLR0hVR1XYHWfV1TDLJQwtyYeqGcBvuV/oLsVBrSk1ZfdRwNrqypuVRTl8hz1UbXPaGt+rjhHwQfQ7JYnwiZr2ujLQ4OHIgjOfgoy36msFwrn0NDeaKoqWZ4oo5Q5wxz2XzTZdR3ig6CNT2imqpHRUV7fbaebiy8QuqSzn5N2Wy9K+kLLpLo0st/sUT6K5W6SndHOM8Uxc5ocHeOeIoO9XS8Wq2Qia5XCmpY844pXhoz71doK6iuFO2ooqqGoif6r43ZB96+eekWoNV0p6ZrKm31OpWPtTZHWiAnigc5u73Yztvjl3qX+TM0N1Rq50cUtriNWA20Skl9NsN9+QPPl3oO78I+qV7w+WFUEQU4PmgB8FUiCk5C1bpJjH8gNQl7RgW+fGRz/RuW1rWulD/wDj3UH/ANvn/wC4UH5O1BBqpxnP6R3u3VogdyuSjNVUf9q771ThB41VhU4VSCpqraVQ1VDmgutKrYez3ZVppVQKDMo6ioFRFFG9xa92CF0u19iCOP6o5rnFhj626RDwOV0ShdjA88INionkR5HPC3bppe629B2nba3sir453eeXEfgtCo3F0bWj1nO4Qtw+VFUei2PTto7qagaSPaSfxQfLN83n96jVI3v9f71HICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgDYraNMxmouhkxnETQfgFq63LQ7TJUMLB2nYaPPuQdH0hA+TUdqic3LQ8E+eBt9i7V0v3NlLp2zaZABjubZZHN7t8uH4LQNM2Oan1TahxB3C7tjHi0rM+UDXmPXdqga/hjoaWNvsJDUHJKWIsoaymduYXFvwOFD3PidDA5xy4ggnyGwC2qpjZHqK5RNHYlBkHvGVrFyH+Ql3eyTHs2QRL3Yyou4TkDhHPvWbUPAGQ5u/IZ3KybHorVGpqjFqtVRKwkDiLDhBq5yvXFwHaA9y77pP5LGu71EJ6uaGgi7+tbv8AetluPyPtQRBjKa/UUkrhyx/FB8vNOQQMKkDx5rut6+THr2gnfDRRxXB7PWEO5C0S+dE2urM9zayw1g4fWPVnAQaMizau03OkcWz0UzCDjdpWG9kjHcLmEFB4vAS05aTkL3nuCCvNgd9kEtbK/iAilO/cSs2c58gtdy4EEbEclKUtUJYQx53HeguSDcHuWwWcf5rYO8vWv4Li0DfJWyUrTHHHGPonJQZLRgjYlS2mrLU327x2+ny0Hd0h5MYN3E+7KjBhgMhOze/3rci2TTmlY4G8cdfeG8TzjdkGcAe8g/FBRrK+0/o0dkszTFZ6Psjh2M7x6z/jn4LRLDcTNqunLXcWCce5WdVV7Y8UcbyHDnjwWHoyN3z3FNyAcg+maGobeY9Lx54pHXOBrx7JGlZXTTGzU/ysdNafzxR0PVEg8hg5UN0JsfW62s8BPExlW2UDHLBz+C2Poyj/AJQ/LIv9dM3jZQtdwnnjDEH1DqCtgsuma6sJa0UtM52fNrdvuXwdDreqsWpay+zH0mgrZ3NrqaQ5ZLG44dgeIC+qflSX91p6M5qSN4EtdKIhjY8ORxfYV8Ka9q2xUUVNnOe1jyQbV0l6aprRVwXqzSdfp66AyUUg+g4843e/PxWuUhbxtDxkbRuHmf8Aisjo61hTT6SumjL4/io5GdfQuccmKUb7e3AUfA5zWZ5luD7d0GpV0PU100Tu0Q45VnA59yl9URthu0kmMB4DvasOrp2shjfG7PEMkY5IMQgbbK3Ju9o81edsNt8Ky/8AWtHmgyohtuqjjPqleM3HcvcHw+1A28HL0Hu7QXnLnkJnzx7UFMwyN3ArGqGh0GMZIWVxAjd7fgrTgA875BQYVPI6KcStyHM3BHku0dDep5H189kqxFUwVkWYuu34TyOPsXFZAY3nbJByFPaWuTqGogq2HD6OQHbvaef3IMrXEFVSXart1UQX08hfHjuHktXAwMFdZ6YKFlVFS6ipmgx1EYDiO8rlM4LZXA+OyClERARF5lB6i8yhOyBletwSqML1vZ7R5ILoHPZXafA7LjgHYrxjeJgcASD5Krq38+EhB5IzgJ4hseSoAwOSv5kcAHjixy2XvCTvwILUY3x3FelnCTtzV0NOPVwvSCQNkFng804PNXgzP0SnB5ILIYveHyV3hwfVXvAfqoLPD5IGgZ2V/qz9UrzgOSMO38kHdfkJ7dOUn/29/wD3mL9AQe/2L82fkv61s2gOlVt7v73RUL6Z0LpB9EktP4L7Fb8pPojP/wAQuHfvGPzQdj4lUCMc1xz/ABlOiH/rGP3B+aq/xkuiH/rIP3B+aDsQ8igXH2/KR6Iu7Ujf3R+aqHykOiT/AKyN/dH5oOwLWtZ22+V9uDNP3ZtuqmuyJHt4w7yIyNlo3+Mh0Sf9ZG/uj81Q75RnRKSSNSt38WjH3oMvTHR1dmazj1dq69su90p4DFTMihMbImnY4yTkqOq+jS+2S+3Wo0VqGO10d4cXVdPMziMbnbuczcYOc/FXx8ojokcMDUrcZzjhH5r0/KI6KHDH8p48+PCPzQS9o6LbJRdGlTo573zR1XFJUVJ9d0zncRk/e3Wtjor1Vdjb7ZqjVTK+x22Rj4II4C18wZjgDzxHPIdw5LO/xheif/rNHnkDgcvivR8oTomz/wC9MI+GfvQXtbdHl4l1jBrLR92itt0jpxTyRVDOOJ0YGAMAjwHepHoq0HX6dvd01Dfbm243i646+SOPgY0DGABk7bBRX+MF0TvHZ1TCMeY3+1et+UF0UNdxHVNOSPZ+aDraLk/+MP0T/wDWen+I/Nej5Q/RQf8A4np/iPzQdWKLlf8AjBdFB5appviPzT/GB6KT/wDFNN8R+aDquVrPSgf/AGe6h/8At83/AHCtR/w/dFP/AFppviPzWudJ3Tx0ayaDvEFJqCCpnqaOSKKNjhlxc0gd/mg/O94PpVR/2rvvTCqIzJLJgjjeXYPmU27sIKcJhVe5Pcg8avSnuQ+9B61VN5qgHCrj3dg7bIJ7Ssf+Uvlx6o2K3OlJyMe1appdvDTvefpHAWz0r8Fvkg2O2PDKiKUjia14cQsDpc1PXaqY2vrgyNwcIYoxy4G4GPvV2ll6uKSQHZsLj78FQOsz/mq2xloHYLifaSg5lev1oyMHJyo5SV7GJI985GftUagIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAugdEkTJb7bY3+q6oGfIZXP107oTpTLqG34GeFxcfccoO2Xet+aukunoWsdk1Ib7v8AgtP6eKg1usbtJGTlrmMb/dwPwW99JkEFN0i2a7FhMU7I5S4cshoBXNdWmW56ivVVEOsiEz5CR3N4shBhXOPqb5TFww6WjieR/daoOvoRJLWU5cGZPEM+1bNqLq5Kyx1TDxNmoW7+wAKGu4DLhx7/AKRmEE70f2jRVIWTXNxnrBzMgw0LsMHStY9HWn0fTlrhqrg/Z0pA4WjuwvnV5xvxEHyVIqJQccZQdYu/S7rS4Tvlmur4Wk5EcYwPvWRaekjVMkkcfzo97pBwgl24yuRNqZQ4Zcsy3V07KuN7ZBlu4QdzsvS3c9MVMlKYhK95/SSl/aK2i3dN1oqSW1sM8ReMOJw9vwwF8zVt1qampfJLjiJ3VDbgQADnKD6Wlm6PNRSOkmnt8skhzwyNEZ+8rCuPQzoa9N4oaJsZdykhcCPuXz9HccfTx71K2zUtwoSDT18sWDt28oNv1N8mdr3OdaK5me5kjdz78rl+r+g7V1iHXOoJZIW83sBc0e9dm0d0yXeknihvIjrabiDQ/k9o8V9H6RdadSWRl0oLk2WF4wWuAJae8FB+YlwstfROLZoXYB54WAA9jsDIK/S7XvQrpPVlHN1ggp64js1EbQN/AhfHHS10V3LQ90fS3OjMlOSermYNnN8coOWWgOlr42bkfitqg2dv37KMoLSaGd0zXcUDx+jPeCpWMOMjMAcQ5oNk0JYZdR6utlmiGRPUN6zb6AOXfZlfQXT9o6O3R2u7UUDTAyBtK/I2BBOPvXO/ktVVnpOkcuuMjY53wllM552D19Y6gtFPfrJU22paHMljIBP0X9xH2IPgPXVibSymtlgEZAyVrtivdE6toIPQGsIqA18gdu4ZXb+keykSzWaqh4ZmBzMkd2+D9y+cLpRVFpuklPIC2SCTiafEcwg+u+hF1A3pGpPRaN0bIoJJXSHkcMJ+8LP+SHE6t6Std3+XdxqXRtce8f8AorQui3WIstDHf2U4qCaN8JA7i5pbn7V1f5FdG6HSt7uU7eF1TcXknxGx/FBAfLGv/Xajtlka/LKWLjkAPIuJ5+7C+SdZyzVd1wxji2MYGBzXXenvUDrv0oXiYScTI5RC32BaZdqIPooaqAHib623NBz2OV9O5gZEWvaQST3LcaOQywNkaPWG6l5bZTV9uY/qw2YDmQoiOM07+ocQXA93JBi6nYHMpZ3NzlvCfaN8faoaveJpMxdlgxsthvbestQd/Ry5+OFrR2QW344c8lZcMzNwMq+V7RwdfV8PeGHhHiUFUfIYA3VfuK8AIa0EYLTuvOz9UlB6ceaAjPMj2rwYHLZe5/aQVcX+0Z8FZmOXDcEeSu/3gvHNPATwgoI+oaA8OwcHZXLW8MqWBxHDKDG7K8qm9gbYWPgnhIPCQefgg7Jpl4vvR5V2iYF09F2o/HAC5PcoXRPPFu+M8JW26Iv0lJUNqoHAy8PBPGeTgo/V1N1lTLXQQlkFQSQ36pQavjBwDkEZRebDs+BwEPJAyvERAREPJAyFdp4XSHj7h3eK9pYHzvyRho+1ZMlRHC/gMJIGyCzM+RuAJQweCtdYTzqCsom2y9p0UrSOeFbJtOfVmQWes/8AmCvQ9vfUuV3Np/2yYtHjMgtGRn9YcV51jT/PuV7Fo8ZkxaPGZBbYcjIneQhkYP59yvxi154Q6bdHx2lpILpshBj9az+ncvRMwbid2VdDbT9eYJw2g7dZN8EFv0j/AOYKqiqgHdudzh4Krq7R/SzIGWj+lmQXfSKd+cZI8+SpFVTtO4aHd5CQstfHwslmweaOjs/GeKWZA9Mg+snpdP8AWK86uy/0s68xZh3zlBV6VTk8yVcZPE71A44VkGz5yBOCsmjNP6SOqDy0+KDwSg8mO+CdYPqP+CkxK2LZsTTnxVfpbP6BnwQRJkH1HrzrG/Uepf0xn9XYvRWR5/0dqCH42fUd8V5xt+q/4Ka9Mj/q7FSatn9A34IIZ0jRuQ4e5UGohx6xwtkpIoa+OoD4AGxxl2QtVc6g43Ncx+xPJBc9Ip/rrzrqb65VvNt+pMn+a/GZBcM1MfplGyU7iAHnKoaLV9acK/TMtbzs+cEIKHPhacGQ5VDpKYkAva7fw7lkOFlc7L5Z8q31dl/pZ0FqWWNwAbOWgbYxleRxh+4nLvcr3BZcfrZlegbagMskmQURmPHCeLI5lXMw+LldY228Jd1k2694bd9eb4ILIEBO/ErgFIBvxKsNoO583wVXVURGzpigsl1EOZKsyy0ha4xA5aFkvgtjWEuMzj4BRdRwNma9jHNadiD4INw069r7fG5vvWwUzsd2VqOlZjwyxZ2zkLaaR+DnxQTBybfO0HGcM+OyjNf5jno4HH1KcYHnupyghEttbxc5J2ge4grXukl/Ff3NHKNgA+CDnN9IL4CPqfiVGKV1DGWPp898f4lRSAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC6x0KSGmvdDON2h3C8fskLk66r0SskfHN1LS6VsYLAOZKD6ght9o17pars1JU8F8s8jnU4J3ljJOGezcfBc36J9EXe+asv2nqqnlpGOjLaiV7ezGARnfuWqWe6XOz6ihuEFVJR1jX7uftuPokLunSE3WOqtL0rNEF1FW18UbrkWZBkJbuSe4ZQct6arVpuyasstg03Vx1ENBRCKQtcHEuwMk+9c/1AAPR5ccnFp+1Tmo+jq8dHup6KO9VjKmqr4zI8sGeA45Z71rt+lJiILshkp7vNBhSkALH4s7kq688QGO9Yz3BpIyEF0O5rIo3ATD2LCDs+CuwuDZGuz3oL0/ZqHKniyF7WY67OdirOccigul3iEDwOWytZ96Z8kGbDUyROBEhOF2HoB6T4dK3dtFdQDa6h2Hk/QJ71xMHbCuB5Axk4A5Z2QfpJZtR6ZusXHb7lSTBzQcNeOXmsDWmj7LrTTlTaLhEyWN4PVSZBcw9xHvX55UdyraR7XU9TJHjmGuIytusHSlrW0SRupb5VDg24eM4I8MIIjpM0hX6H1ZUWKtjIY0l8OfpM7nLV6dzXTvLSSWN5d3LK2DXWsrzrS9C5XyYTVEMXVBwGOznKgrbEZHhrPXlma0Y8yAg3yu0Td7Xo616vgnfEyV4kbI0fq3Ndt9oX010C9I1NrKyC31c7PnijaOtZ3ygD1h7vuUXoW+6Sudrb0d1Zj62OkDHRSEdsubk48xlcK6Q9Lam6GddQahsMs3oXWB8LxnBbndp8uYQd/+UHpA1tvbqW3xNM9O3FVwjd7PH2gH7F8sa70wy70/pFOA2rYNifpN8CvtHoq15Y+kbSbayFzTKY+rraZ25aSME+xcG6Y9Gz6Uv0z2xvfbZzxxOaNmg9xPtQcb6J6qb0Susc7MTxAlrHd48vvX1v0GiLTvQjWV2MBrZpcnx4cfgvk6uBorvHcqZoZKHBpI24mnmu7U2tY3fJ6u1FRnidGx0RIPIkZP3oPmTUNa+tvNfXOeS6apL8+9SVlq2T8dDUkBpZkErV6mTBG+5GT8VL0cIFMyqyS9wx7EElUTujZ6LTu2OxPiFgVDDGQBt791cD5J5OopW5kaO04jZqmLnp2norBHcWSukqCR1jidvYggalploJ4+4x5A8wtakbgea2mm3AafpNIWvVcZY9zDsQUGA5KWYQVccxdgMcCT5JK0tWNIdj+KDcb7a2UckT2ASxTs42PHInwUR6LERgFzfJSuj7nBX0MmnrlLw5HFTSn6J8Fi3Klmoql8dSC17D2h5eIQYfoQB2kd709D8Hq8123t3HsVQPegxjRvzsWrw0j2gZiDiXY9qzGFxOcq/C17nta0F8jjhjQggqihq3xvDKeRwYcktbnCjiMEjh3HdyX0foKwstVqJq2B81QAXgju7vxVd40Vpi6EunoWsefps2KD5ujfJFJ1sTiHd4U7HfjVW40VZ2cnIf5ro9y6J7M8udR1skXhxbrV7j0aVkLiKetjlHdkINEqGMjlLI3te3uI5q0eS2Gv0fe6TJNKJGjvjOVCT0tRCeGWGSM9/E3CCwi9wvMHGwyfBA71dpYDUPxkho9Y+Cpp4nTvEbPXP2KQeaVrPRopxG4DD3kbFBXJFUiMNpIw4DvB3Ktek1sZIlog8DxavGUNT61JWMcfJ2FdxfIh9KQDx3CC0yvoyS2WhEeeZaqHutbWjMMm555VZuE7Mipooz49nCqdUUdSeI0oaGjkHb/cgscdo/o5U4rR9SX4qoz2vl6O/PtXnX2nvp5Pig847R/Rypx2j+jmXpmtJ/mJB7151tp/oZfigqY+0g5DJs+1VTG1Y4iyY8W/NUCW0j+al+Kul9skiyIZSB5oLQNnI5TfFen5m8JvigfZ8bxS58Mpx2b+jl+KDz/M/hN8V6BZ/wDbfFOKzfUl+K947N/RzIPWfNIeCDL8VVILR1hL+tAPgVSH2X6kyrlNpw174pQDyQUZsfhP8U47GOTJyqhLY2/zMp968NRZRypZP3v4IAnsuMejzH34V+nfRvmYaaNzceJVgVVn76N59rv4K/HPQvljFLTmM555QZc+cg4VvIV2Yk7K2AEHgXqYRAXmd/YvV5sATzygmrMWQ2a41L+XBw/ctQFRQEdqmJ37nLbZJW0mkJHObxdc4N4c4WqemUeMGhYO4+KDzr7Z30zx71719q76aT4oKqhPOi+1PS7d30R/e/gg9620c+pmB8nK9DJaxGX9VKG9+HfwVkVNtJGKE/vfwWQ+ptcbA11GcHmOJBa6yyf0U3738E62yf0E3738E9Ks/wDUXfvfwXvpdo/qB/e/ggp62yjlBN+8siKW18HYhlH95WfTLSOVAf3v4LIhqaBw7FFwjzd/BBd46FuG9VJv5qsS0PdDIfeqBV0hODSN9vF/BVtqaXuo/tQe9bR90Dx71X19G0ZdC/Hk5eCpixkUY+KuR1MDn8LqNuPPdB48wNAEFI58h5Z3Ch7uyqa4uqHMae5re5bCRVvhPUMZTRfWKgrpFStJEMzppD6xOwBQZGlpSKnGdnNwVuMBIC59ZXmKsZg7Z3371vlE/j3ySMboNks0zzJEwuPA13EB3ZUT0gwk3dzuXGwHPmpazN3b5LI11bjPa4q6MZczZ2ByQcf1M/jbT5GOEFqhVPanYRHGT9YqBQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAXZ/k+vYy/U737ty3P2LjC6v0MyuiuVOW/SLR9oQfQVh6Lqe466u+ttV1IpNMUEzpQH7CQ5/NdxtmsdI1dPSVFBcaWKmnYBTAkN4mN228Qvnrpw1ZW3G72Po5onubQNiZUVvAcF5cAeE/vfYtO16+SuqOroozBRWin9FpmB2AS0AE/EIN8+VXUQVHSDZX08zZGimO7OXJfO99qwDK0vO0x2962H0uWWmtTpZXySMicHOJyO/ktPvD5X+kuDm/rCftQSEkoFKH8tua16aWR8hdx96vsruuohDntDmsUjs5QXWTyjk5X21srRvusIFVgoJqat46NkjWk45lWmV0ZG4WFRy4a6J/qu5Ky7suLfNBLsqYnHsuGVcEgPIhQRJ8SF6JHjk4oNgBVedlAx1k7eRz7VkRXJ7T2xkoJQHdV5xzWFFUxynPFgrJa7LeeUFuEZkk78lTOlacNvluj+iagPd7t1EUvEOsLcZ81P6MLjfaR0m2A52R7CgsaputS3WNbcqOWRk0UmY3tOC0tGAfsXbOinpjsOvrI/RPSUyFtRJH1cdY84bL4HfkR+C03Q2jWXIVtfUiN/XTOG53xlRvSN0a2e3291yoqt1I1jsBvIuPgEHtiuU3Rr0oVNXpO6dfQxTcMkbndmZngvoCi1pZtdUzoqlrczNw6CTuOO5fI0cmGMZwcTI9sg7+1Z9JfLjb2F9LUbtOQSe0D3IOr9JPR3VWzir7bH6Vby0mRoGXM/4LV9DvmbpbUllkIc2WEzxhvdtjH2Lb+gPpNr9RVU2nb11ctWN4yRtI3vafcusV3RlpmOO4VNmLYbnJTv9Ih8ctOwQfEFNQNresJkDerJHtwtiprdV1sUdFQ00tTKcBkbG5OVFyMfRanmtIbwuNS6M57t13fot6RdGdHGnqt1fa5K+6CXiDmNBxsEGF0W9BGrLhH6ZeWNtVNIQNxmQj2bLqus+ivTdl6L7xBBH19RFC5zJ5CA4uDc8ly/UfyldYXkhtgtdPb4ZM8Ekgy7HsXO9U6s1lfXcNy1HWVQlGXQwktb7MINXjBYXMPrROwsOoDZJHF7dyd1ljsuLZOLzBG+VjTgiVwPPKDElo4HDbiBWI+0tcdpCPJSZKocd0EMbXVQjrYZOOSM5aW8wtus9YzU1vFFU8LLtTjDCecjfBRIyNwdu/wA1jzQu65tXQvMFXH2mkd/kgu1EMkFQ+OUFr2nBae5eMIcNt1tdjkt2rqfqavFHdIRhx+usw9H9WXZirRI0eXJBp0TCXNABJccDzXS9AaYbRNbdLjHmYjMbHD1QsnTOj6S1Tirq3ier+i0jshTtwnIcGMOw54QZM9cAeGP1ViSVch+lhYj3HOQVbLjlBelke7vz71Ydt9XZJJMBY0kvNBTM4nJAyfuUZW09PUtLZ42yZ5gtV+eQn2KPqpxE0ulc1jQOZQQV00vbKku6hhhk8lqV207VUTx1cjZOL1Q3c4XYdE6L1TrerbFaKB7aXPbq5QQ1o8QvpDo46GdJaVpRVV8LLzdHtHHUSjsNPeAN0HwE9xoGmDqn8R9dxHL2K2Pmt4AcZWZ8u9fo7d9BaGr4TFUactr2nua3B+5aJe/k/wDRlcCXx2uSjcf6IoPh4UlGf1NeB5OOFdZR3CPBp6hrh3APzlfUV4+S/pqR7nW6+1FN4Mkb/Faddvkwagilc603umqB3A5BQcQdNeIT+kiLva1UfOexE9I3PLIbhdFuXQj0pWp0jo7c+aNnN0bic/YtTr7DrO3tcLhZKosb6xdEcIIR8tvGHPo3drzVBmtef9Gf8VfnkkzirtzmAeLMKyamh76H7EHnX2sc6Z/xTr7V30z/AIr0VNu/qZ9y99Jt39Tcg866z/1eT4qqOe1nstgk38156RbP6m5BUW7iBFI8IPHSWlriHQS59q866z/0EvxVTqi15yaR5yvPSbV/U3fFA66z/wBXl+KGWzn+Zl+KekWr+qPT0i1f1R6AJLN/QzfFXXTWowtLoZiByVoVFq/qr1X6Va+rDfRXnG6AJ7L300vxT0q0DlROx7UbU2n+ouKqNbax6tuHvQG11pGwoCferjKqifI3qaXqjnnnkrfzlRNPZtbD78fgvHXGCUgNoGxftB2cfYgkJndr3K2CqZaiE4cH7gcuFWvSYjvx/Ygv5TKs+kRdzv8AdXhqY8esf3UGRxDxVPMgDkrLaiI97v3VXHPGZWF5dwhwz2UEtqOpFJY6Kn6oPLu2Qe5a064RnnRsIUpqK7GapYynh442MA7TFGCunIx6Gw/3EBtfD/UG/H+CenUv9Qb8f4KttVMf9QB/uL30p/fbQf7p/JB5BWUb349Abn2/wVyWvoM4NvBI8/4L2GpeAXNtgJ/sn8lUKuTi/wCSASf2T+SCz84UP/Rw+P8ABe/ONF/0Yz4/wV41U/dZ/wDdP5L0T1p5Wcf/ANRQWRcqTk22sHv/AILKgrWcHE2iYPekclyJy2zkDltEVkBt4eOFlocfLqSgtenAf6nGqhWd4ooB/dWZT27U8o/Q6fmf7IVkssmsHHs6bnz/ANigjPTXY/0Wn/dWdQyTTN/RUMHH4hvJSFJprXMzwyLTk3E443jwFuVi6INdXgCO4N+boR62OZQc6rBFnNfV9a7uiYdgsOSjrLmBDQ24tizjIbuvp7SnQNp+hLJbgX1k30srqumOjux0ODTWqniaO/h3QfFenOiPXN4ljbbbS+QOOA5zTgKerNIah09XNt18oXUk8Y9bGzl940dFT0cPBDG1o5EhuCPYonW+j7Vq61OpK+FrJWjME4HaaRuCfYg+RbPbRhpe7OQtmgt7Jad9JKOKOZuB5L3UGmLlpW8OoLhE7h4uKOf6Mo8VI2sdYC3O43aUHzx0l2ae1VEkcjHBgky0kbYK0dfR3ygIIXaD6x0LBM2Zvb7zuF84oCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLq/Qm0y6gtkQ+lKCR5BcoXR+husNLfqCUuxwucPjlB2d1ulq+l+4XCbHWva91PnfAY0gLVzcXQWaq9IYTLPJIST4lxWz6YrOs6X2ROJIMIaATnOWbqF6T6c0Oqn0eAyGRgLAByO2ftQaVVl9O+hhcMFtPxY9u61i4BzoZHYG+T9q2bU8n+eTGd3RU7Gn90LWa7s0hOeWyCABdA/j3wVmMcHtG4VuoaOqaMZJVHUObAHgniygvkDlume7dY7DLgni2C9jncSQRnCDJJPZweSuTdoBw596whUtA7Qwc44TzXsddDuC8c0F8nKZVk1MI5OJz3hVCRjtg9hJ7gUFeQgO6p78HsnzQHu70FzON2nBWRBXyR9lxJHmsUHHPI+5UPz5e5BsVG4PiLvFbNoccN4h4eZY/wC4rVraeKibjGe9bLox3Dd6ffchzfsKCg3m92WSeqt1bLFwyOPCHEA7q1e+kK8ahpGUt3ibKGbgs8vFZ1wt7p7bWu4c9W9xO3mtXtNH1tc1jW47JOyCw+6UznYex3EO5V0Vzpn1sMfAeJzsBp34liyWetrr823W6mfUVUrw1kbBkklfXnyfPk4WywQw6m1xFHU3AASsp3jsQ+3PM96DVfk69E15dqdusaimdSUAYeqY9uOJ2OZHgu06ftMtNruSsrpXzyObwuwdgN9/gvb38oDoutGom6WkuEhkLhDxQxgxxnkBnOymtV1NDZdPT32oqwyCJplMoGxYW5x8EHytqroj1JqLpcrJrJb2w0rpzIJScD28lv1r+TpWT0jobtdWRiQdvgbuFuGjel3o5uVbEYr/AAtcxjg8u7IB3W/Qa60lWMHU6goH5ONpAg5fZPk56JtvVGrqamsfFyzyW4UHR7ou2uY6Gx07yw5a57AStpN0ts7f0VfTyDuxIFYllje7LHtcMdxBQfFnTvaI7L0mXCniibFBIOsjY0YAGO74Ln9SP0jT4hd6+V1bmxXm1XZrW5mYY/bgn81wacbNd3hBjk9pUvVQG+V44ZKCk7Kk+tnvVTlSRkIBEjKhlXSSmGrYcseDjPtXRNI66o6pjKS7k0lW3slx9V65y4Zbg8u9eOIe3hka14HLI5IO9QVdNPEXw1EcjSNgHZUdIXF7s8895XFqV0kAIZUTM8OB+MKRp7tcYQOC6VefBzyQg6mZHDIwPc5W+tA5kg+1c4ZqO9B29zBHg6LP4rIZqq7DH6SCQ+bcIN7ll22wfesWWQ539Xv33Wqs1VVn9fTU7vY/H4LcOjCq0Rebq862urrXSR79TFv1vtO23uQWLRa7zqG4tt1gt8lfUPOAAOw32ldt6O+gKkpXx3LWVSK6paQ70QDMUZ8D4rctI9IfQ5ZbdHbrFd7dQwt5NbhpPmtrpdcaOrWh1NqCheDy7YAQZtJSQUNJHS0ULKeCMYa1gwvZOJxyc+WV7Bd7JVH9BdaOQ92JAsrNM9uW1UDs+DwgjpOJwxusd7CdsbKW9HznhLXewqh9HJj1d/JBB1FOXDGSsGWhO+Fsb6V7ebT8FafE0DcBBrohq2D9HI8e/kqJn1jgGTxxVLPqyDKy77frDZonSXK5U8AHcXjJXI9Z/KG0hZ3PitQ9OlAODyGftQb9WWDTlzy246WpJQeZbEM/coSv6OeilrC+ostHSvO+HtbsvnnV/wAonV9144bbJBQQnkWkkrl151XqO8SmW4XyaUuOSOsOEH11PovoWhJE0dpYfAkKwdK9BWCHS2cHzIXxoZJy7idWFx7+0s2FryGu4gfeg+uzpToIP+sWUf3h+SDSfQPj/SrP+8PyXyexgPrcQ96yoo4y0Df4oPqJ+kOgd/OrtA/vD8lSNFdBDv8AXbR+8PyXzEII87g/FZFBTRSVTGEbE45oPpX+Q/QMT/yjaB5cY/JG6H6Be+52f98fkvke9U7orpNE2UM4XEAcSweCT+nb+8g+xxojoEzn50s4/vj8kfonoFIy262cf3x+S+ODG7vqG/vKnhcD+vbj+0g+xzo3oIYM/OlmOP2gvBpfoHAz86Wn4BfIEbS2I/p2fFWDGD/rDPig+x/5OdAwI/zpaB/dCq+Yugdu/wA6Wj90L42ETR/Ps+K9MTf6dnuQfZAtPQKHZ+dLSf7gXrrb0Bt/5ytP/wDWF8adWA4ATAq9JHFwgGYAoPsdlJ8n9g7VwtR9kYVXV/J8bv6Za/dE0lfGQhiP+sfYhiiG/X59yD7M675PLOdZQ+6Bv5qg13yeG86uj91O3818bBkB/nyP7q96un/rDvgg+y2Xf5OzTvVU59lO380Go/k6RkgTwZ8qZp/FfHHVwRsz17jn9lWSyAnJmd+6g+0W6x+T1F6tRH//AJG/+ZV/4ROgKPlPy/8AlW/+ZfFfBS/0z/3f4oGU2d5n/uoPtX/Cd0Ct9SZxPlSt/wDMqHdKvQVGc5cT/wDSt/NfGUbKQdoPdt5KmZ1M5+eJx9yD7Lf0xdCDPVp5X+ynb+atu6b+hmP1bfI7HhGF8bn0THN+fIKkejcy16D7JPTx0QgDq7HPJ7GhXI+nnoxIJg0xVPPgMDK+SbLTwTZe1knPG5U/St6suYM480H00On/AEEz1NLVrfY8fkrtJ096bqnFtDpKseR4vH5L5qwOWQfctzsVDLDZ+KJ5jmk5YblB1m4/KJstETHJpKfPPBl/go8fKe0/xDi0pIAOeJN/uXBNZ2G9U07JXPZUdYM5ccY3UE2zXV/+rwAeJd/BB9baU+Ul0eV9d1FxoJrVn6bsEfgu22O72q9W5tfZq+nraR4GHxuzj2+C/OWHTVdI5vWGmGPE5WxWa76r0JVNuunLwaaduOKNjjwOHgR3oP0Ha4EjBxjlurzeI8gHe9fN3Rf8pu03eSO36xovm+p9U1UPaa8+JG2Fud+6fNC2tsjKaWpuErRkNYwBp9+UHSNV6dtmprY+guEbXjhyx4G7D4gr591ZbDoi5eh3aVvVv3pnh2S8KM1V8pLUFa10Vit8VBC7stcXcTvuC49qHUt6v1U+qu9bLO8ZLOM+qPAeCDO6ddXUlztcVsoiHDiDn+WCuMqU1DOJavDTlo5eSi0BERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFtWh5+qqqd4dgsmH2laqpjTTyyoyDjDgSg7tpSokZ0r09bI0hhlYxrjyxw4Wz9ONqe6/0FQASW1b4nkdwOXD7lr8VT6VbbHW0kQ9Iie1spHeAcZ+xdU6Sn21thrrjWEAx0jKqnJ+lJwhv/AIig+ZrxOZ7/AHKQjlIWD3bKBvUhbGGjkeazaWRz2S1DzkzOMhPt3UReZOOdoB7JQY87/wBFG0DfHNVEuZSDfJcVaq3EODG8g0Kuoc5kEbG75CD2NuKeQuPmrFOA5jznuV45ZQO4jnJVmLhZTvJ70GNO4FjXHvJ5+Qwo5ZtYQ1ga07Y2+KwkHocRyJCqEjx9IqhEF5lRKwYa8geRVxlbKDu7Pt3WKiCRjuG5yxrdu4K62ujc3kQVEog3ixSNkpC5ucLZdLER3Sh7XOXhPvWmaQdxQv4u0RyyeW62qi/QPiljdl0czX+4EZQdSs9q6+0aka6M8UbeIDHsXOdOwcOpYYMbvPAB5nkF3fSEDKiqvETQOCtoGyN88sGVg/J36NG3bV0uor1TObQW+d3UsI/WPB2Pxwg6N8n3olpNMMm1Tdqdj7vVOPUhw2gZjn7cLRPlM9Oc1VVSaL0bVOjYAY7hWMO7vFg+73rpXyoOkVmgujmdlLIG3Kvb1NPG04LWnbi+9fGumKQR03zvWOMssrjLl25c8n/ggsyaamN7szHAn0qoiAb9LBeNz4nO6+nPlj3qpotAWbSNFK5hfAx05G2WgD8ly7omEl86SbHBUtErTVNkLSPVIIO3wXQflRRsquk/0acF8MVAOFndzcg+bNB0DXw18b4w4dW7qz3k4VqntlQLm1k8YaAeJzgea3KeGnoXUz6WEQtIw/HecnP2KvUNPJNaZ30mDKWZbgctkGu0FXU1FW+K3100DmuwcSkZClm3vUFNIII71Xxu5Ne2QkAqG0XpueNrq+sL2SuBADSpC5UVY+NwgrJGENPNBMdIl0udbovTrLrVSVU8fWPL5Duc7fguf9YwsILh5LcukJj4KSzW2WfrHw0YD/7RLv4Ln9fBJTESNOWnuQZTXNxzXhUf1znDOcFede8fSQZ7iF5kYWEJ3d6q9IQZJ5KhWmz5VXWhBcaFVgK02QKsOBHNBVjyHvXnCM5ITib4pxN8UHp8se8KlzJpHdWw5eRgeS94m+K9D+Ah7D2hyQXqi3VdGxskrw5pG+2MKxkEgjPuCvVFyrKqJsUmA1v2qz9LPkgv09ZVU54oKqeL+y4qQh1JqOLHVX24sA5ATkKJXo5INkptfa1pv1OpbiD5zFS1L0wdJdKAI9U1ZA5ZcStGRB0yl6eelCD/AJ8E39tqs3/py6SrtRGmdco4s7F0exK51w+a9DR4oKquou11qDLdq2edzuZc8kLxlnp8FzeHb3pgjYPVxkr4x6wQWxZqY88EnxbyT5ipu/hPuWVHWN/nFeFdTY9YhBgNsNL349wV35raxhDCNuWyzGV1JvxOJVYrqLPMhBESUsrPo5VsBzDyIU4a+h73Z9yofU2t47QQRfHnGO5ZVoP+cYc/WV0Os+TjiVcM9qhlbKwuDmnIQWtQafirrlJUiVzS53LCiJNKY5TnHsWzm8UIeSXE7LwXm2nnn4INUOmD3Tj3hUnTMucCUH3LaZLpa3gkAkjyWBUXWPcRMQQ7dNz8BaXj4LwaXlx+tHwUj86SfU+1e/Ob8ep9qCOGmJRzkB9y8GmyTjrR7gpA3SQjHD9qwn3OVshIGEGRHpJhaHdefgq3aUY9285AHkrDL7WN2bJsjr9W4wZEFEumWseQ2YEea8/k20DeVqtuu1S45Lk+dKj6yC4NORnnMAqhpuIfzwKs/Ok/j9qfOVR9ZBIxaapZWAOlOR4K7/JKkyO08qKbdKppy2TC9N4rjymKCQqNL0TBlsxafAqy3T1F3yBYRudW49qUlefONR/SlBI/MNGBjrcDyQWC3g7yOKjXV9STtKV4a+oA3lKCdg03bHDIc4lZtPpy18QJp847yVq9JdayGTiEpI8CpIalrQMABBsbLbSRNMcEIYPJRz6aeGpcDG4tPeov+Ulx5ggLz+UVwcd3NygnqCBz6iMyMIbnclbdLeuohENE0B4GOM8lzJ2oLh3vA9i8+frif57CDdal81U8uqHl5O5yVYMWe7hC0916uBP6/K8+ebj3TINukYWs7IyfYsWW2+knjrJWwMHnzWsuude/1qgheNqZ3+tK93tKCeqXWmlhNPRUofI71pXd3sWG08Iw05884WIx3iVea7Y9rG3PwQZdFUx01XFUTR8TA7BDTnKxNR3JodLIHYe/kPALGrq1lJFxF2XkYaPHzK1mqqJKiV0jzkuO6CiZ5kkc93MlUIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICzrK4iqLc+s3ksFXaR4jqY3nkCg7n0Y3yOOlfRySQmcMDoBJ6h8Wf+vBTfThrCnuVjtdjgc0VcUQFT1TstG3q5XH6ORgpxkE5fhoG2B4qp7+GQBuACdyBzQX3ERULBgDi3AHgoCpeX1YHNo7lLXSYNY1mdgNvJQTJMzOfxcuSCp7nyTYGzS77Fcqy4u4WHDBgZ71ZhfxTBx3I3Xhd1kxJOd0F6qLWU7WZOCrcrg2FrcZB5pUuy4NxsMKmocWkjILQNvNBhVjw52By7ljquY5f7FQgIiICIiAiIgn9IyYqHMcdncluEBJeee7C33rQbBL1Vc092Qt9pXkFuM4z96D6A6JJZ7pHZ5adhfxQGmnPhgn8F9H2OChtNt6uICGngYXSkDAHeSvmn5K92jjuldapSOJw6yLPd44W+/Ke107SHRjJT0kvBX3LMLWg4PCdifvQcY1Wy5dPfTbcKOCcss9nhkAkB7LWsBJPvOVos0XVXCWjaWmGmeY2lvIgHC65oijPRT8ma46nqh1N51ECyN3JwY7s8/Pf4rhmmqt1RRymR2XcRLj5k5QdX+T1WQR9MNnimOGucQw+eCujfKaoXwa8prk/1KuHqwT3YJXD9DVrbTriw3Bz+AtrYgD5F4BX0/wDKqtb6vQlPeoGcTqRwlyOfDsUHy9dY8w4DeMB5GB3LIttSPRerlJy3Y7810Lpd09b5ujmwau09C2CGpgDKvg7n8iVxOldLSOPHK+QF2wKDcKSVj3v4RgZwsGtaBWU0UYy+qmETQfM4WJHO6nlZJE4lriHfDmr2l/SLlrn5yq8NorZTPqTvsHAEj7Qgi+kep9J1XKxpz1b2tx4AAKArxG4NjcBg/Yr9VOay5S1bjvLI5xPgFhVR43OGM4KCLraZ0EnEzJYeRXgp8xh7TlS0QEjAxzcjwKt1bIacgB+57kEW6F3mvBE4LMllY2AS7YysI3OlzzKCsRlOByt/ONLnYn4L35xpvFBdDSAqmt8yrBuNPjGV4K+Lucgy+EeaYHmsN9yiaOatOurOQBQSOPJe7d4UYLmzO/ErhuEXdIUGfkL0Oxt3KO+cIz9M7K2+5MHLiKCW4x4rzjHioltwBO7TheSXAfzbS4+aCYD/ADR0uNlDMr3Z7TCB5K46ubjIY4+aCU63z+1eGbzUQ64Ecoz7yqTcXEY6se8oJYzea8MvmokXB31WfvFe/ODvqx/vFBKdb+0vOsH1lGfOD/8AZ/FDcH/7P4oJMyD6y860Z5hRbq6R3fGPerTqmQn9cB7kEzxDmSfcnEPFRArZWjAlPwXnp0v9I791BM8Y8V5xDxyof02T+ld+6hrZCMda791BMca8yfAqF9Kk/pX/AAXhqZDzlegm2k9yF3n9iguvf3PePevOuf8AWf8AvIJ5z2gbkqkSsO3EoIyuPMu/eXgeB3H4oJ/iZ7Vi1fIuacYUWZM9x+KpLvL7UGaZW5A4hn2qriaBxEP4PHh71gB2Dkc1lx3CcR9S4h0Z2wUFfWtHM5XhmbjmsugggkpxxNBcCc/HZXjS04IHVhBHCVvIZJ8gnWtxuSCO5StO2KGqa4xtLfYrWpaBrcVkDf0TueB3oI4ztBOTzXoqGeKwV4gkOvZ4p17PFR6IM8zs8U69visEFMoM7rWeKda3xWAvRuEGcagAc8rxtU0nGPesLB8CmEGf6Q36y8NYPFYOE4d8DKDPbVA969FQCccRWBwO+qVlWyAy1QJB4W7koMtrpAMcPa7groknaGjh3Pcr9OBJVOfjZowr0MfW1ReeTUGN1lSHgOAHeqqmomgZ2iGnGVfaGyVDjISQPsAUTeJuJ7h3k8vBBgVEz5pC95JJVtEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREE9aK3MIaXdsDAB71JEjhGObRgrUopHxvDmHBCkorp2OF4Oe8oMi5T8T8ZWFkNjJ7yqZpmSuzx+fJUGVnIuKC/E4NiL8blIThxd4qw6VoAAOy9fMwNwCgusJM/ETgd6sSvAy47k8h4Kh0w4ezzVlzi45JQCcnK8REBERAREQEREFyB5jma8HkVv1JUF1PG4HYsBz5rnq3HTUwnt4jJ7TdkHS+i2/Osms7XcsgRGQRzeYJx+K3vXVsq+l7pdo6WKbFlt8scTMfT3DnH7SPcuMW9wLOqzuDkeRC+ivkrthNZc71PIxxpYTiMnfIbniQal8tnUMUdbZdE25wbS22naXsHIEf+srjNgoH0lKydz8x1Ha9iyul+quOoNeXm9SwyNjfUlrOLvYMcvtWDZ3TC0/pXHDXdgeSD3UF06muopojg007JP3SCv0JraaHV3Q+wEcfpVsDm/2uFfmzenPmqXgciMD2r9DPksXsX3oUtDpHh76cGnkz5H8ig5d0LQR6n6NdU9HleOKqtr5JYAefLIx8F8/6ooamgknga09fE8sII8F310j+jf5TAkd+jt92k4JPA8QwPvUJ8pXSTbLqx9wp4waS4N4wQNgSg4Xp64irgfSzuDZMHc9x8Ft1yjbYuj2WQgtq7zIIwDzEbcZPsOStV07paqvWsaagt4c1skgMzhyZHntO+GVK9Kt1ZcNSOo6J4dSW9gpoSOTiObviUGrQtDS892cAeA8ViF5bIBkblZb3COnx9I81i0zA+Rxd3ckGXG0jtHmAoW7uZJIT1naHcpeeQxxEqAJMtXuNicILlUwGOGMtIA3coa4Q9XKSxuGE9kqVqnvklfw8m7KuqgaaEMLA6Q8kGvFeKbp6GF2XPYMAKiWCn4w1sQxlBD4RS76eATBrY8DG6jKktM7uEYGdkFtERBUMHAJOFlxmna0bNcVhIgzXGE+q1oTLGtwC1YSIM8SR8OMtXhlb1eMt4e8d5WCiDKlnHV9W09jwWM5xcck7rxEBERAREQEREBERAREQEREBERAREQEREBERAREQSNpnxKGuPrbKY4Q4nK1mJ5Y8OBwtioJhPCDnD8ZI8s/mg9kbkbbFZdvmY+M0k4yx3j3FWXBW3tJw5uzggir3bpKOocQ0mJ27XdyjSFulNUQVMTqWrjDhjZx7lH3DT8bacy0ry5x5NQa2iuTQyQvLZG4KtoCIvWgk4AyUHizLbRS1cwa0ENHMrKtlomqZGue3gj8SpqV1PRM6imaC7kSEGNUxU0UDYI4mucBucLF9HjGMxtKyeEuOSck8148YCDElhjBx1TV5RwskkceEYCrmJLuEes7kslkYgi80FuVsTWgFoCrpo208T3bAP5K25pmka3uWTIziljhHqt5lAYBBTcQ9ZyqhzHTucdieSplcHStY3cNSVxklDW+qOaCkuNPSSSu2cQcZWtzPL3kk5UleaouIiadm/eopAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFM6XqRFVGJ3J/JQyuU8himZIOYKDolO7q6hjxyK33ou1VLpTUsVWTxUdUOpqW9xY7Ykj2Fc6t8zZ6RrgdyAQVLUr2yRmNwA28UHVek7S5nqW1lG4Pp5mF1M4eoWOzke3crl2orebX1VC3eRrC84GV0Po81dA2lGmNRSP9FJzRTncwu8D5E/esu9aKrIZ6qtkZHUS1A/QvBywsI5goOCB4mJhfCXF5JY4bYPJfY3yFJqil05dbBWPb2JBNEM55gfkvnG76GrWHrafHEDvw555XVfkn3K4WDpNhoLg2RsNXEYy475O+EHSflj6eklslDqikYRPSPBc5owQWuyFmV1O3pX6DKKqpuF9zihAbjnxtPL2nC6t0lWNmotHXS1cLXmSFxjAGSHAbL5b6MukP8AwT2O+2q4xOlex5fRxA7ddyx5DYII/WlLT9FGkH0jJGSatvMfVP4OdNEdjv3bZXD4Q7jLdjwesfE88/EqV1Re7nqC+1d5u0zpaqqeScnPA0jZoUdwiOPbmfuQY1Y8F+wSkZhvESrUh45OEDO6vykRw5HPCDEus/DGQ14BUZSP4nPlkw1oG2B3pWyRSOO54h3Lx7SKVsR2ycn2IPYncc3VsGxOSfFV1koEpawZI2ylIW8RlYMNaMbqy3eUBozk9ooMiJnDTAk9o88rHgjPWl5IwFXXO3DAdsc1baC2m59t2yC1WPDYHy57Z2CiFk18nFJwA7N+9YyAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLNttSYZRueHvCwl6Dg5CDbABKwSMdniGSRyXrQOaiLPW8GIXuPVndo8CphpzwHIId3oLNRCXEFgw7xVykrZ6UhsmSB8FdadiCMbr1zGkEY28EFbzaq4gyxN4u/AVqWxW2beOXh8lZfTR78ILT4hWzTyMHYlcgut07RA5fMSParraa0Unqsa9w7yMrHbDK4duZ3sVbKeNpyRxe1BVLWTSjqoW8EfkrUcXayefisjAxgbBU5ACCjhAyrE7gASVe4hvxbLHawzvOdmDmUFNJES7r5OTeWUqZ8k7ZzyVVXMAAxowB3DvVuljL5etziNqC7AOppzKc8ZOACr0eIoC55PG7deMIkl62Q4jHJeAh73Pf6gPZQVAtij4j68nJWKib0SAyYBc9paM+Piq3SRgGaXPCDwjyKhLjUunmLifLbkAgxpXF7y4nJVKIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiCf0xXmN/UvO3ctshceISxkE88Lm8MjopWvadwVutmr2VEAIPaA3CDZGGOYAtcS7mQ7x/Jbjo3pAudhhFvrohc7adjDOclg/YJ5e5aBE8tAe0796zGVDeAGQYz3oO72/UWgLxEH/ADpLa5CBxMq4+IDyBGdlI2q46Gs11pbo/WNuYYJQ4dTE7iIBz9UL53DWPBLJOaod6vC5/Eg+lukX5TkIglpNGWuSSZ7Sw1VVgAd2QBlfNd1uFfda6avuM5lqZnl7nH1cnwCtO4GtyseSTO/cgoka0ycW4A2Oe8+KxaqTGd+XJX5HgtWL+skweQKBTMw0ynmVgXKowS1r8FZNfUhjeBuygqqRznfcUHsTDJMHP9UcyvXh8kpcTj6LR4oHOhi4GkZPrZXsDS1pc85P0faguTgCJsOeFvMlKfhjjMnirIaZZAS7lzCVMuD1bN/JB5Geun3PZ8VRVz8LS7kRsFXIWsh2OCeajKqYyv8AIckFokkknmV4iICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgqjeWHxHeFL0Fa5jSHEPjx2c8woZVRvcw5aUG2RSNkAc12c9yu57itcpawN2JLT4+KlaetBbhxBCDPCpII5HKtNmjcPW4VUCCfWb8UFaLxwA3LgFbfNG1py/4ILhIHerEsgaMnZWzVFxxFGSfFytPkY08cp4n+AQV9qcb9lo71bqKkNxEwbDnjvVioqXPHCDwg8sLyOIPIMhIx9qD2Nr5peIbN7yVl+s4Nb2Yx6yo48gDYNHcFTJIMYkPC1u+yC85weT3Rt+1UzTMDe12W8seKxJ61vD3gDdue9R9RVSSkknmgvXCsfKRGD2WbNHgsFEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFl22sfSTBwJ4c7rERBvtBWtqI2mMgnvWcJWvGHDZc/oK6akeCxx4e8LZrfdoZwMu4XeCCcYWsyGuO6pPFGSS8nKxmVDcgkhXpahrgB2UFbpHFuO5Wi4BuAcqy6fB2O3grEsudx2coK5ZcnA5qxPOIm7Yz34WPU1TGDH0u7zUXPUl7zxO59yC7UzukLidwsaEH135OOQKpHHkue4BvcFVxGTG/CweCCoF0svG/AHeqnu4nBkfLuVovBOGcu8+KNeIwQzcnl5ILzniBmAAXlUNADS95AKsmQMPFKcu8FiTzukJA2agqqagvJaOX3rHREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAVyOV8Z7LiraIM2OuI9ZoKvsrYj4hRaIJj0uPHrH4rz0pnMNBUQvcnxQSj6pzhscD2q3kOOTJj3qPyfEpk+KCREsA5uBKq9MiGwKi0QZ0lZz4SR7Asd87znc7+JVlEHpJPMrxEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAXrXOactJBXiIJGmus0ez+2FIwXiF3rbFa6iDZvnJmTwOCx5q8l3NQQJHIpxO8SgkZp3PdkHkrWWDtntErD4neJTJ8SgzXPYQMnl3L3r2YxnAKwcnxXiDNdURgcLSrJqCM8I96sIg9c4uOXHK8REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z" alt="Peugeot 3008" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">Peugeot 3008</h3>
          <p class="card-desc">SUV robuste et élégant, parfait pour tous types de terrains et trajets au Sénégal.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">55 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('Peugeot 3008')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>

      <article class="vehicle-card reveal" data-category="berline" onclick="openVehicleModal('Mercedes Classe S')" style="cursor:pointer" aria-label="Mercedes Classe S">
        <div class="card-img-zone">
          <span class="badge badge-premium">Premium</span>
          <img class="card-img" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIyA+gDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAUCAwQGBwEICf/EAFgQAAEDAwICBgUGCgUJBgUFAQEAAgMEBREGIRIxBxNBUWFxFCIygZEIFUJSodEWIzNicoKSk7HBQ1NUg+EXJCU0REVVwtI1Y3OUorI2VoTw8RgmR6Piw//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACYRAQEAAgICAwEBAAIDAQAAAAABAhESIQMxE0FRYSIEMhRCcVL/2gAMAwEAAhEDEQA/APjJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARZdttlxuUvVW+hqauQ/RhjLz9i2q2dFuuq8AssNRTg9tSOq/92EGlIurUPQZqiXBrKygo/OTj/wDap+3dA9G3BumpPdTx/wDUtTG1NxwpF9LW7ob6PqUA1k9wrj28UvB/7VPUWhujKhwI9O08wH9e4yE/tK/H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E4xdutfhnpbhw2SpYezES9drPS7nRkyz+qcuPVH4LkiKcYbdXdrLTYa5rJpvWdxEmIqxJrHTzSeB87s83cHrH7ly9E4w26Sda2CMYZTVj/1W/esSr19TBuKO2vJ75HAfwytBRXRtMXnUdzueWyy9XF9RmwUOiKoIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//Z" alt="Mercedes Classe S" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">Mercedes Classe S</h3>
          <p class="card-desc">Berline de prestige, silencieuse et raffinée pour vos déplacements haut de gamme.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              3 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">60 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('Mercedes Classe S')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>

      <article class="vehicle-card reveal" data-category="van" onclick="openVehicleModal('Van Access')" style="cursor:pointer" aria-label="Van Access">
        <div class="card-img-zone">
          <span class="badge badge-accessible">Accessible</span>
          <img class="card-img" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAIyA+gDASIAAhEBAxEB/8QAHQABAAAHAQEAAAAAAAAAAAAAAAECAwQFBgcICf/EAFYQAAEDAwEFBAcEBgYGBwcEAwEAAgMEBREGBxIhMUETUWFxCBQiMoGRoUJSscEVIzNictEkQ1OCkqIWFzRjc+ElRIOTssLwNUVGVFWU8SY2o9JWhLP/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIEAwYF/8QAIhEBAQEBAQACAgEFAAAAAAAAABEBAgMEIQUSMRMWIkFx/9oADAMBAAIRAxEAPwDxkiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiLL6SsU+oLxHRRO7OP3ppTyjZ1JQVLRZ4ZbRVXWvldDTxtLYcc5JMcB5ZWEWwayucNRUx22gJFvoR2UIGBv45vOOZPitfQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREE8Mb5pWxRNL3vOGtHMlbtfHt0jpsWGGMsu1bGHV0mfaY0/1as9IU/6GoX6rrqcmOIllG1xwJZO8dSB4LWrhVz19bLWVLy+aVxc4+JQW6IiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAszpKyvvVzETnCKmiHaVErjgMaPHvWKp4ZaidkELC+R5DWtA4krc9Ryw6X09HpylLHXCoAlr5W8255R58kGJ1pf/ANMVMNLSjs7bRN7Klj72j7R8SteREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEUQCeQKCCKbcf913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jbvDIznmto0NsAtFPFFU364SVriAeyj9hgPdkc0HB9G0Fwo6uCtt0Ln+r8Xnjgt6rsVF6jUz0lfNTtnjBEjc88dy6tcbJpPS9CO0ggh3G4ZEzGXfBcM1trK20tTPHZ6WNkjs7jYj7EZ7z4oOi6517R6WsgFGWS3KpZ+ohHKEY94+S833q4z1NRNLNM6WaRxdI9x94nopLncp553zVExmnfjeeefksPNMS4k80Ej3k81Z1s7aeN0ruWOCrOfhuSRw71rd3rDUy7g4Mb3dUFnNI6WVz3HiSpERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREFWnl7N3H3TzWTpqgshO6ASfdCw6qwTOjPeEGz0soiaATnKug8HmfJYGmnErme17PUdVkIqgdput4nmQgyTfaOCqrXEPaQ4h7eLXA4cPJWkUueIPBV2SePPmg3XTm0G720sjq3euxs4B7juyNHdnqum2Datpuq3YrpE1rv8AeM7J2fPgCvP+8ByOFOAws3WhoHdhFeq7detJ1Yc+3XOEF49xzgd3yIWOdRUdbUzMrKynbA6MgOL15kDQOXBTtLjhpkdukYwTwRHoilqtN2GqiZX3ikFJT8msky5454wq2p/SBooYnwachcXY3RIG5OO7wXnAtaDjAIB4FTbxA4HCDa9Sa1veoJpJKmqdG1/MBxyfM9fJau+bDdxmMDmVQfKOO8cnvVvJMEFWaTdJOeJ5q0e8udnOPFU5nboL3EhvmsNc7gJB2cJIHVyCa715LjDC4FvUrEoiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgmY5zHbzTgq9oq0Mky8YJ5uVgiDYaSftXOLXYGeA8Ff0U8biQ5w59VqLJHsOWuIV3TXB8TdxzQ4d/VBuQbG8cCMd4UBAc5a7h4rXKK4tbFgzFruPAq+pbm90OS5vDlxQZNzZByx81LmY4JI4KyiuPasLjgccYyoMr2yxdpkN7gSgvS9wHEqR0hxkkrHi5QuaXOla0+KtXXiMMcCC52eGOWEGVc/DS53DCs6qvp42E75z3AcVhpbhUPaWtdutVo4lxySSUF1WV0043N4hncrREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBRBI5HCgiCO877x+aZPeVBEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q==" alt="Van Access" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">Van Access</h3>
          <p class="card-desc">Véhicule adapté aux personnes à mobilité réduite, avec rampe ou élévateur intégré.</p>
          <div class="card-meta">
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11v-1a4 4 0 018 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5" r="2.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 passagers
            </span>
            <span class="meta-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/><path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="rgba(255,195,0,0.7)" stroke-width="1.3"/></svg>
              4 bagages
            </span>
          </div>
          <div class="card-price">
            <span class="price-from">À partir de</span>
            <span class="price-val">60 000 FCFA</span>
          </div>
          <button class="card-cta" onclick="event.stopPropagation();openVehicleModal('Van Access')">
            <span>Découvrir ce véhicule →</span>
          </button>
        </div>
      </article>
    </div>

  </div>
</section>

<!-- MODAL -->
<div class="modal-overlay" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l11 11M12 1L1 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
    </button>
    <div class="modal-header">
      <h2 class="modal-name" id="m-name">—</h2>
      <p class="modal-type" id="m-type">—</p>
    </div>
    <div class="modal-stats">
      <div class="modal-stat">
        <svg class="modal-stat-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13v-1.5a4 4 0 018 0V13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.3"/></svg>
        <span class="modal-stat-val" id="m-pax">—</span><span class="modal-stat-lbl">Passagers</span>
      </div>
      <div class="modal-stat">
        <svg class="modal-stat-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5V4a2.5 2.5 0 015 0v1" stroke="currentColor" stroke-width="1.3"/></svg>
        <span class="modal-stat-val" id="m-bags">—</span><span class="modal-stat-lbl">Bagages</span>
      </div>
      <div class="modal-stat">
        <svg class="modal-stat-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        <span class="modal-stat-val" id="m-fuel">—</span><span class="modal-stat-lbl">Carburant</span>
      </div>
      <div class="modal-stat">
        <svg class="modal-stat-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1.5 7h13" stroke="currentColor" stroke-width="1.3"/></svg>
        <span class="modal-stat-val" id="m-price" style="font-size:13px">—</span><span class="modal-stat-lbl">Prix min.</span>
      </div>
      <div class="modal-stat">
        <svg class="modal-stat-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13h10M5.5 13V7M8 13V4M10.5 13V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        <span class="modal-stat-val" id="m-cat" style="font-size:13px">—</span><span class="modal-stat-lbl">Type</span>
      </div>
    </div>
    <div class="modal-sec">
      <p class="modal-sec-ttl">Votre chauffeur</p>
      <div class="chauffeur-row">
        <div class="chauffeur-info">
          <div class="chauffeur-av" id="m-av">A</div>
          <div>
            <div class="chauffeur-name"><span id="m-driver">—</span><span class="chauffeur-rating">⭐ <span id="m-rating">—</span></span></div>
            <div class="chauffeur-meta" id="m-meta">—</div>
          </div>
        </div>
        <span class="chauffeur-status">Disponible</span>
      </div>
    </div>
    <div class="modal-sec">
      <p class="modal-sec-ttl">Équipements</p>
      <div class="equip-grid" id="m-equip"></div>
    </div>
    <div class="rules-wrap">
      <div class="rules-hdr" onclick="toggleRules()">
        <div class="rules-hdr-title">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#110e40" stroke-width="1.2"/><path d="M7 5.5v4M7 4v.5" stroke="#110e40" stroke-width="1.4" stroke-linecap="round"/></svg>
          Règles et conditions
        </div>
        <svg id="r-chev" width="13" height="13" viewBox="0 0 13 13" fill="none" style="transition:transform 0.2s"><path d="M2.5 5l4 4 4-4" stroke="#110e40" stroke-width="1.4" stroke-linecap="round"/></svg>
      </div>
      <div class="rules-body open" id="r-body">
        <div class="rule-row"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#110e40" stroke-width="1.1"/><path d="M6.5 4.5v4M6.5 3.5v.3" stroke="#110e40" stroke-width="1.3" stroke-linecap="round"/></svg><div><div class="rule-t">Annulation gratuite jusqu'à 24h</div><div class="rule-s">50% de frais entre 24h–12h. Non remboursable &lt;12h.</div></div></div>
        <div class="rule-row"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="3" width="11" height="7.5" rx="1.5" stroke="#110e40" stroke-width="1.1"/><path d="M1 6h11" stroke="#110e40" stroke-width="1.1"/></svg><div><div class="rule-t">Acompte 30%</div><div class="rule-s">Solde en espèces ou carte au chauffeur.</div></div></div>
        <div class="rule-row"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#110e40" stroke-width="1.1"/><path d="M6.5 4v3l2 1.5" stroke="#110e40" stroke-width="1.2" stroke-linecap="round"/></svg><div><div class="rule-t">Attente incluse</div><div class="rule-s">15 min aéroport · 5 min autres destinations.</div></div></div>
        <div class="rule-row"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1C4.3 1 2.5 2.8 2.5 5c0 3.5 4 7 4 7s4-3.5 4-7C10.5 2.8 8.7 1 6.5 1z" stroke="#110e40" stroke-width="1.1"/><circle cx="6.5" cy="5" r="1" fill="#110e40"/></svg>
          <div><div class="rule-t" style="margin-bottom:6px">Suppléments</div>
          <div class="suppl-row"><span>Aéroport AIBD</span><span class="suppl-val">+2 000 FCFA</span></div>
          <div class="suppl-row"><span>Nuit (22h–6h)</span><span class="suppl-val">+5 000 FCFA</span></div>
          <div class="suppl-row"><span>Zone &gt;50km</span><span class="suppl-val">+10 000 FCFA</span></div></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-reserve">Réserver maintenant</button>
    </div>
  </div>
</div>

<script>
const VEHICLES = {
  'BMW Série 5': {type:'Berline',pax:4,bags:3,fuel:'Essence',price:'55 000 FCFA',cat:'Berline',driver:'Mamadou Diop',avatar:'M',rating:'4.8',meta:'280+ trajets · 3 ans · FR, EN',equip:['Climatisation', 'Wi-Fi', 'GPS', 'Sièges en cuir', 'Système audio', 'Chargeur USB', 'Caméra recul', 'Régulateur', 'Écran tactile', 'Toit ouvrant', 'ABS', 'Air bags']},
  'Tesla Model S': {type:'Berline',pax:4,bags:2,fuel:'Électrique',price:'54 000 FCFA',cat:'Berline',driver:'Amadou Ba',avatar:'A',rating:'4.9',meta:'320+ trajets · 4 ans · FR, EN, Wolof',equip:['100% Électrique', 'Wi-Fi', 'GPS', 'Autopilot', 'Chargement sans fil', 'Sièges en cuir', 'Régulateur', 'Audio premium', 'Écran tactile', 'Climatisation', 'Caméra recul', 'Chargeur USB']},
  'Tesla Model X': {type:'SUV',pax:6,bags:4,fuel:'Électrique',price:'53 000 FCFA',cat:'SUV',driver:'Ibrahima Sow',avatar:'I',rating:'4.7',meta:'210+ trajets · 2 ans · FR, Wolof',equip:['100% Électrique', 'Portes Falcon', 'Wi-Fi', 'GPS', 'Autopilot', 'Climatisation', 'Sièges cuir', 'Écran tactile', 'Chargeur USB', 'Chargement sans fil', 'Caméra 360°', 'Audio premium']},
  'Peugeot 3008': {type:'4x4 SUV',pax:4,bags:4,fuel:'Diesel',price:'55 000 FCFA',cat:'4x4 SUV',driver:'Oumar Ndiaye',avatar:'O',rating:'4.6',meta:'180+ trajets · 2 ans · FR, Wolof',equip:['Climatisation', 'GPS', 'Wi-Fi', 'Sièges cuir', 'Caméra recul', 'Chargeur USB', 'ABS', 'Régulateur', 'Écran tactile', 'Toit panoramique', 'Audio premium', 'Air bags']},
  'Mercedes Classe S': {type:'Berline Luxe',pax:4,bags:3,fuel:'Hybride',price:'60 000 FCFA',cat:'Berline Luxe',driver:'Cheikh Fall',avatar:'C',rating:'5.0',meta:'400+ trajets · 5 ans · FR, EN, Arabe',equip:['Hybride', 'Massage sièges', 'Clim 4 zones', 'Wi-Fi haut débit', 'GPS', 'Audio Burmester', 'Écran HD', 'Caméra 360°', 'Suspension pneumatique', 'Chargeur USB', 'Parfumeur', 'Vitres teintées']},
  'Van Access': {type:'Van Accessible',pax:4,bags:4,fuel:'Diesel',price:'60 000 FCFA',cat:'Van Accessible',driver:'Modou Mbaye',avatar:'M',rating:'4.8',meta:'150+ trajets · 3 ans · FR, Wolof',equip:['Rampe PMR', 'Climatisation', 'GPS', 'Ceintures adaptées', 'Espace fauteuil', 'Chargeur USB', 'Wi-Fi', 'Sièges modulables', 'Caméra recul', 'ABS', 'Éclairage', 'Audio premium']},
};

function openVehicleModal(name) {
  const v = VEHICLES[name];
  if(!v) return;
  document.getElementById('m-name').textContent = name;
  document.getElementById('m-type').textContent = v.type;
  document.getElementById('m-pax').textContent  = v.pax;
  document.getElementById('m-bags').textContent = v.bags;
  document.getElementById('m-fuel').textContent = v.fuel;
  document.getElementById('m-price').textContent= v.price;
  document.getElementById('m-cat').textContent  = v.cat;
  document.getElementById('m-driver').textContent = v.driver;
  document.getElementById('m-av').textContent   = v.avatar;
  document.getElementById('m-rating').textContent= v.rating;
  document.getElementById('m-meta').textContent = v.meta;
  document.getElementById('m-equip').innerHTML  = v.equip.map(e=>`<div class="equip-item"><div class="equip-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>${e}</div>`).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function toggleRules() {
  const b = document.getElementById('r-body');
  const c = document.getElementById('r-chev');
  b.classList.toggle('open');
  c.style.transform = b.classList.contains('open') ? 'rotate(180deg)' : '';
}
function filterCars(btn, cat) {
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  let visible=0;
  document.querySelectorAll('.vehicle-card').forEach((c,i)=>{
    const match = cat==='all' || c.dataset.category===cat;
    c.style.display = match ? 'flex' : 'none';
    if(match) { c.classList.remove('visible'); setTimeout(()=>c.classList.add('visible'), i*70); visible++; }
  });
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
const obs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), (e.target.dataset.i||0)*100);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.07});
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.dataset.i=i; obs.observe(el); });
document.querySelectorAll('.vehicle-card').forEach((el,i)=>{ el.dataset.i=i; obs.observe(el); });
</script>

<script>

const VEHICLES = {
  'BMW Série 5': {type:'Berline',pax:4,bags:3,fuel:'Essence',price:'55 000 FCFA',cat:'Berline',driver:'Mamadou Diop',avatar:'M',rating:'4.8',meta:'280+ trajets · 3 ans · FR, EN',equip:['Climatisation', 'Wi-Fi', 'GPS', 'Sièges en cuir', 'Système audio', 'Chargeur USB', 'Caméra recul', 'Régulateur', 'Écran tactile', 'Toit ouvrant', 'ABS', 'Air bags']},
  'Tesla Model S': {type:'Berline',pax:4,bags:2,fuel:'Électrique',price:'54 000 FCFA',cat:'Berline',driver:'Amadou Ba',avatar:'A',rating:'4.9',meta:'320+ trajets · 4 ans · FR, EN, Wolof',equip:['100% Électrique', 'Wi-Fi', 'GPS', 'Autopilot', 'Chargement sans fil', 'Sièges en cuir', 'Régulateur', 'Audio premium', 'Écran tactile', 'Climatisation', 'Caméra recul', 'Chargeur USB']},
  'Tesla Model X': {type:'SUV',pax:6,bags:4,fuel:'Électrique',price:'53 000 FCFA',cat:'SUV',driver:'Ibrahima Sow',avatar:'I',rating:'4.7',meta:'210+ trajets · 2 ans · FR, Wolof',equip:['100% Électrique', 'Portes Falcon', 'Wi-Fi', 'GPS', 'Autopilot', 'Climatisation', 'Sièges cuir', 'Écran tactile', 'Chargeur USB', 'Chargement sans fil', 'Caméra 360°', 'Audio premium']},
  'Peugeot 3008': {type:'4x4 SUV',pax:4,bags:4,fuel:'Diesel',price:'55 000 FCFA',cat:'4x4 SUV',driver:'Oumar Ndiaye',avatar:'O',rating:'4.6',meta:'180+ trajets · 2 ans · FR, Wolof',equip:['Climatisation', 'GPS', 'Wi-Fi', 'Sièges cuir', 'Caméra recul', 'Chargeur USB', 'ABS', 'Régulateur', 'Écran tactile', 'Toit panoramique', 'Audio premium', 'Air bags']},
  'Mercedes Classe S': {type:'Berline Luxe',pax:4,bags:3,fuel:'Hybride',price:'60 000 FCFA',cat:'Berline Luxe',driver:'Cheikh Fall',avatar:'C',rating:'5.0',meta:'400+ trajets · 5 ans · FR, EN, Arabe',equip:['Hybride', 'Massage sièges', 'Clim 4 zones', 'Wi-Fi haut débit', 'GPS', 'Audio Burmester', 'Écran HD', 'Caméra 360°', 'Suspension pneumatique', 'Chargeur USB', 'Parfumeur', 'Vitres teintées']},
  'Van Access': {type:'Van Accessible',pax:4,bags:4,fuel:'Diesel',price:'60 000 FCFA',cat:'Van Accessible',driver:'Modou Mbaye',avatar:'M',rating:'4.8',meta:'150+ trajets · 3 ans · FR, Wolof',equip:['Rampe PMR', 'Climatisation', 'GPS', 'Ceintures adaptées', 'Espace fauteuil', 'Chargeur USB', 'Wi-Fi', 'Sièges modulables', 'Caméra recul', 'ABS', 'Éclairage', 'Audio premium']},
};

function openVehicleModal(name) {
  const v = VEHICLES[name];
  if(!v) return;
  document.getElementById('m-name').textContent = name;
  document.getElementById('m-type').textContent = v.type;
  document.getElementById('m-pax').textContent  = v.pax;
  document.getElementById('m-bags').textContent = v.bags;
  document.getElementById('m-fuel').textContent = v.fuel;
  document.getElementById('m-price').textContent= v.price;
  document.getElementById('m-cat').textContent  = v.cat;
  document.getElementById('m-driver').textContent = v.driver;
  document.getElementById('m-av').textContent   = v.avatar;
  document.getElementById('m-rating').textContent= v.rating;
  document.getElementById('m-meta').textContent = v.meta;
  document.getElementById('m-equip').innerHTML  = v.equip.map(e=>`<div class="equip-item"><div class="equip-check"><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>${e}</div>`).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function toggleRules() {
  const b = document.getElementById('r-body');
  const c = document.getElementById('r-chev');
  b.classList.toggle('open');
  c.style.transform = b.classList.contains('open') ? 'rotate(180deg)' : '';
}
function filterCars(btn, cat) {
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  let visible=0;
  document.querySelectorAll('.vehicle-card').forEach((c,i)=>{
    const match = cat==='all' || c.dataset.category===cat;
    c.style.display = match ? 'flex' : 'none';
    if(match) { c.classList.remove('visible'); setTimeout(()=>c.classList.add('visible'), i*70); visible++; }
  });
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
const obs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), (e.target.dataset.i||0)*100);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.07});
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.dataset.i=i; obs.observe(el); });
document.querySelectorAll('.vehicle-card').forEach((el,i)=>{ el.dataset.i=i; obs.observe(el); });

</script>


<!-- ════════════════════════════════════════════════
     SECTION SOLUTIONS
════════════════════════════════════════════════ -->
<section id="solutions" style="background:#fafbfc; padding: 120px 24px;">

  <div style="max-width:1200px; margin:0 auto;">

    <!-- ── HEADER ─────────────────────────────────── -->
    <div style="text-align:center; margin-bottom:48px;" class="reveal-card">

      <!-- Label -->
      <p style="font-size:13px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#ffc300; margin-bottom:16px;">
        <span class="label-dot"></span>Nos services
      </p>

      <!-- Titre -->
      <h2 style="font-family:'Barlow Condensed',sans-serif; font-size:clamp(32px,5vw,52px); font-weight:900; line-height:1.1; letter-spacing:-0.01em; color:#111827; margin-bottom:18px;">
        Solutions adaptées à tous vos <span class="gradient-text">besoins</span>
      </h2>

      <!-- Sous-titre -->
      <p style="font-size:17px; color:#6b7280; max-width:580px; margin:0 auto; line-height:1.7; font-weight:400;">
        De l'aéroport aux événements spéciaux, en passant par vos déplacements quotidiens,
        nous avons la solution de transport qui vous convient.
      </p>
    </div>

    <!-- ── TOGGLE ──────────────────────────────────── -->
    <div style="display:flex; justify-content:center; margin-bottom:64px;" class="reveal-card">
      <div class="toggle-wrap" role="group" aria-label="Filtrer les services">
        <button class="toggle-btn active" id="btn-particulier" onclick="filterServices('particulier')">Particulier</button>
        <button class="toggle-btn" id="btn-entreprise"  onclick="filterServices('entreprise')">Entreprise</button>
      </div>
    </div>

    <!-- ── GRILLE ──────────────────────────────────── -->
    <div id="services-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:28px;">

      <!-- ── CARTE 1 — Transfert Aéroport ── -->
      <div class="card-wrap reveal-card" data-category="particulier">
        <article class="service-card popular" tabindex="0">
          <div class="card-img-wrap">
            <span class="badge-popular">⭐ Populaire</span>
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80"
                 alt="Transfert Aéroport AIBD" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Transfert Aéroport</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Service navette entre Dakar et l'aéroport AIBD</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              45–60 min
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Tarif fixe garanti</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Suivi de vol en temps réel</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Accueil personnalisé</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Véhicule climatisé</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:800; color:#111827; line-height:1;">25 000 FCFA</p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

      <!-- ── CARTE 2 — Transport Professionnel ── -->
      <div class="card-wrap reveal-card" data-category="entreprise">
        <article class="service-card" tabindex="0">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80"
                 alt="Transport Professionnel" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Transport Professionnel</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Déplacements d'affaires, réunions, rendez-vous clients</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              Flexible
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Véhicules haut de gamme</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Chauffeurs en costume</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Ponctualité garantie</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Discrétion assurée</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; line-height:1;">10 000 FCFA<span style="font-size:13px;font-weight:500;color:#6b7280;">/h</span></p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

      <!-- ── CARTE 3 — Transport Familial ── -->
      <div class="card-wrap reveal-card" data-category="particulier">
        <article class="service-card" tabindex="0">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80"
                 alt="Transport Familial" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Transport Familial</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Sorties en famille, courses, visites médicales</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              Flexible
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Véhicules spacieux</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Sièges enfants disponibles</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Flexibilité horaire</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Tarifs préférentiels</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; line-height:1;">35 000 FCFA<span style="font-size:13px;font-weight:500;color:#6b7280;">/h</span></p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

      <!-- ── CARTE 4 — Occasions Spéciales ── -->
      <div class="card-wrap reveal-card" data-category="particulier">
        <article class="service-card" tabindex="0">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                 alt="Occasions Spéciales" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Occasions Spéciales</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Mariages, anniversaires, événements privés</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              Sur mesure
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Véhicules décorés</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Service personnalisé</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Photographe disponible</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Forfaits sur mesure</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; line-height:1;">45 000 FCFA<span style="font-size:13px;font-weight:500;color:#6b7280;">/j</span></p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

      <!-- ── CARTE 5 — Navette Inter-régions ── -->
      <div class="card-wrap reveal-card" data-category="particulier">
        <article class="service-card" tabindex="0">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80"
                 alt="Navette Inter-régions" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Navette Inter-régions</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Transport vers les principales villes du Sénégal</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              Variable
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Destinations multiples</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Véhicules confortables</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Arrêts sur demande</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Bagages inclus</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:24px; font-weight:800; color:#111827; line-height:1;">40 000 FCFA</p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

      <!-- ── CARTE 6 — Mise à disposition ── -->
      <div class="card-wrap reveal-card" data-category="entreprise">
        <article class="service-card" tabindex="0">
          <div class="card-img-wrap">
            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80"
                 alt="Mise à disposition" loading="lazy">
          </div>
          <div style="padding:24px 24px 20px; flex:1; display:flex; flex-direction:column;">
            <h3 style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; margin-bottom:7px; letter-spacing:-0.01em;">Mise à disposition</h3>
            <p style="font-size:13.5px; color:#6b7280; margin-bottom:14px; line-height:1.6;">Chauffeur et véhicule à votre disposition</p>
            <div class="duration-tag" style="margin-bottom:18px;">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" stroke-width="1.2"/><path d="M6.5 3.5v3l2 1.5" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/></svg>
              Minimum 2h
            </div>
            <div style="display:flex; flex-direction:column; gap:9px; flex:1;">
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Disponibilité totale</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Itinéraire flexible</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Attente incluse</div>
              <div class="feature-item"><div class="feature-check"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Plusieurs arrêts possibles</div>
            </div>
          </div>
          <div style="border-top:1px solid #f3f4f6; padding:16px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:11px; color:#9ca3af; margin-bottom:2px;">À partir de</p>
              <p style="font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#111827; line-height:1;">10 000 FCFA<span style="font-size:13px;font-weight:500;color:#6b7280;">/h</span></p>
            </div>
            <button class="card-cta">Réserver <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M7 2.5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </article>
      </div>

    </div><!-- /grid -->
  </div><!-- /container -->
</section>

<!-- ── Responsive ── -->
<style>
@media (max-width: 1024px) {
  #services-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 640px) {
  #services-grid { grid-template-columns: 1fr !important; }
  section#solutions { padding: 80px 20px !important; }
}
</style>

<!-- ── JavaScript ── -->
<script>
  /* ── Toggle Particulier / Entreprise ──────────── */
  function filterServices(cat) {
    // Boutons toggle
    document.getElementById('btn-particulier').classList.toggle('active', cat === 'particulier');
    document.getElementById('btn-entreprise').classList.toggle('active', cat === 'entreprise');

    const cards = document.querySelectorAll('#services-grid .card-wrap');
    let visibleIndex = 0;

    cards.forEach((card) => {
      const match = card.dataset.category === cat;

      if (match) {
        // Montrer
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const delay = visibleIndex * 80;
        setTimeout(() => {
          card.style.transition = 'opacity 400ms ease, transform 400ms ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, delay + 10);
        visibleIndex++;
      } else {
        // Cacher immédiatement
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    filterServices('particulier');
  });

  /* ── IntersectionObserver — scroll reveal ─────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
    revealObs.observe(el);
  });
</script>


<script>

  tailwind.config = {
    theme: {
      extend: {
        fontFamily: { barlow: ['Barlow','sans-serif'], condensed: ['Barlow Condensed','sans-serif'] },
        colors: { accent: '#ffc300', 'accent-dark': '#e6a800', brand: '#110e40' }
      }
    }
  }


  /* ── Toggle Particulier / Entreprise ──────────── */
  function filterServices(cat) {
    // Boutons toggle
    document.getElementById('btn-particulier').classList.toggle('active', cat === 'particulier');
    document.getElementById('btn-entreprise').classList.toggle('active', cat === 'entreprise');

    const cards = document.querySelectorAll('#services-grid .card-wrap');
    let visibleIndex = 0;

    cards.forEach((card) => {
      const match = card.dataset.category === cat;

      if (match) {
        // Montrer
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const delay = visibleIndex * 80;
        setTimeout(() => {
          card.style.transition = 'opacity 400ms ease, transform 400ms ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, delay + 10);
        visibleIndex++;
      } else {
        // Cacher immédiatement
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    filterServices('particulier');
  });

  /* ── IntersectionObserver — scroll reveal ─────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
    revealObs.observe(el);
  });

</script>
<section id="faq" style="background:#ffffff;padding:120px 24px;">
<div style="max-width:1200px;margin:0 auto;">
<div id="faq-layout" style="display:flex;gap:72px;align-items:flex-start;">

  <!-- COLONNE GAUCHE sticky -->
  <div id="faq-left" style="width:38%;flex-shrink:0;" class="reveal">
    <div id="faq-sticky" style="position:sticky;top:96px;">
      <p style="font-size:12.5px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#ffc300;margin-bottom:14px;"><span class="label-dot"></span>Support</p>
      <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(32px,4vw,50px);font-weight:900;line-height:1.08;letter-spacing:-0.01em;color:#111827;margin-bottom:18px;">Questions<br><span class="gradient-text">fréquentes</span></h2>
      <p style="font-size:16px;color:#6b7280;line-height:1.7;margin-bottom:30px;max-width:320px;">Vous ne trouvez pas la réponse à votre question ? Notre équipe est disponible 7j/7 pour vous accompagner.</p>
      <a href="#contact" class="cta-contact">Nous contacter <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      <a href="tel:+221771234567" class="tel-link">Ou appelez le +221 77 123 45 67</a>
      <div class="stats-card">
        <div class="stat-row"><div class="stat-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#ffc300" stroke-width="1.4"/><path d="M8 5v3.5l2.5 1.5" stroke="#ffc300" stroke-width="1.4" stroke-linecap="round"/></svg></div><div><p style="font-size:13px;font-weight:700;color:#111827;line-height:1.2;">Disponible 7j/7</p><p style="font-size:12px;color:#6b7280;">De 6h à 23h</p></div></div>
        <div class="stat-row"><div class="stat-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 3H3a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="#ffc300" stroke-width="1.4"/><path d="M3 4l5 5 5-5" stroke="#ffc300" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><p style="font-size:13px;font-weight:700;color:#111827;line-height:1.2;">Réponse rapide</p><p style="font-size:12px;color:#6b7280;">Sous 15 minutes</p></div></div>
        <div class="stat-row"><div class="stat-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.9 3.8L14 5.7l-3 2.9.7 4.1L8 10.8l-3.7 1.9.7-4.1L2 5.7l4.1-.9L8 1z" stroke="#ffc300" stroke-width="1.3" stroke-linejoin="round"/></svg></div><div><p style="font-size:13px;font-weight:700;color:#111827;line-height:1.2;">98% satisfaction</p><p style="font-size:12px;color:#6b7280;">Sur 1 200+ trajets</p></div></div>
      </div>
    </div>
  </div>

  <!-- COLONNE DROITE accordéon -->
  <div style="flex:1;" class="reveal">

    <!-- Q1 -->
    <div class="faq-item open" id="faq-1">
      <button class="faq-btn" onclick="toggleFaq(1)" aria-expanded="true" aria-controls="ans-1">
        <span class="faq-q">Comment réserver un trajet avec SCOD VTC ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-1"><div class="faq-inner">
        <p>Réserver votre chauffeur privé avec SCOD VTC est simple et rapide :</p>
        <div class="faq-block"><div class="faq-block-title">En ligne (recommandé)</div><ol class="faq-ol"><li>Remplissez le formulaire de réservation sur notre site</li><li>Indiquez votre adresse de départ et de destination</li><li>Choisissez la date, l'heure et le type de véhicule</li><li>Recevez votre confirmation instantanée par email et SMS</li></ol></div>
        <div class="faq-block"><div class="faq-block-title">Par téléphone ou WhatsApp</div><p>Contactez-nous au <strong>+221 77 123 45 67</strong>, disponible 7j/7 de 6h à 23h.</p></div>
        <p style="font-size:13.5px;color:#6b7280;margin-top:8px;">Un SMS de confirmation avec les détails de votre chauffeur vous sera envoyé.</p>
      </div></div>
    </div>

    <!-- Q2 -->
    <div class="faq-item" id="faq-2">
      <button class="faq-btn" onclick="toggleFaq(2)" aria-expanded="false" aria-controls="ans-2">
        <span class="faq-q">Comment connaître le prix de ma course ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-2"><div class="faq-inner">
        <p>SCOD VTC pratique une politique de <strong>prix fixe et transparent</strong>. Pas de compteur, pas de surprise.</p>
        <div class="faq-block"><div class="faq-block-title">Obtenez votre tarif instantanément</div><ol class="faq-ol"><li>Utilisez notre formulaire de réservation en ligne</li><li>Renseignez votre trajet (départ et destination)</li><li>Le prix s'affiche immédiatement selon la gamme choisie</li></ol></div>
        <div class="faq-block"><div class="faq-block-title">Ce qui est inclus</div><ul class="faq-ul"><li>Prise en charge à l'adresse exacte</li><li>Accueil personnalisé (pancarte à l'aéroport)</li><li>Temps d'attente inclus (15 min aéroport, 5 min en ville)</li><li>Eau fraîche et WiFi à bord</li></ul></div>
        <div class="faq-tip"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="7.5" cy="7.5" r="6.5" stroke="#f59e0b" stroke-width="1.3"/><path d="M7.5 5v4M7.5 4v.3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>Le prix est garanti même en cas d'embouteillage.</div>
      </div></div>
    </div>

    <!-- Q3 -->
    <div class="faq-item" id="faq-3">
      <button class="faq-btn" onclick="toggleFaq(3)" aria-expanded="false" aria-controls="ans-3">
        <span class="faq-q">Quelle gamme de véhicule choisir ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-3"><div class="faq-inner">
        <p style="margin-bottom:12px;">SCOD VTC propose plusieurs gammes pour s'adapter à vos besoins :</p>
        <div class="faq-gamme"><span class="gamme-tag" style="background:rgba(255,195,0,0.12);color:#b45309;">BERLINE</span><div><p style="font-weight:600;color:#111827;font-size:14px;margin-bottom:2px;">Confort — 1 à 4 passagers</p><p style="font-size:13px;color:#6b7280;">BMW Série 5, Tesla Model S — Idéal pour les trajets quotidiens et professionnels.</p></div></div>
        <div class="faq-gamme"><span class="gamme-tag" style="background:rgba(255,195,0,0.12);color:#b45309;">SUV</span><div><p style="font-weight:600;color:#111827;font-size:14px;margin-bottom:2px;">Premium — 1 à 4 passagers</p><p style="font-size:13px;color:#6b7280;">Range Rover, Tesla Model X — Plus d'espace pour vos bagages.</p></div></div>
        <div class="faq-gamme"><span class="gamme-tag" style="background:rgba(139,92,246,0.1);color:#7c3aed;">VAN VIP</span><div><p style="font-weight:600;color:#111827;font-size:14px;margin-bottom:2px;">Jusqu'à 7 passagers</p><p style="font-size:13px;color:#6b7280;">Mercedes Classe V — Parfait pour les familles et groupes.</p></div></div>
        <div class="faq-gamme" style="margin-bottom:0;"><span class="gamme-tag" style="background:rgba(59,130,246,0.1);color:#2563eb;">PMR</span><div><p style="font-weight:600;color:#111827;font-size:14px;margin-bottom:2px;">Accessible</p><p style="font-size:13px;color:#6b7280;">Véhicule adapté avec rampe ou élévateur pour les personnes à mobilité réduite.</p></div></div>
        <div class="faq-tip" style="margin-top:12px;"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="7.5" cy="7.5" r="6.5" stroke="#f59e0b" stroke-width="1.3"/><path d="M7.5 5v4M7.5 4v.3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>Pour un transfert aéroport avec bagages, privilégiez le SUV ou le Van.</div>
      </div></div>
    </div>

    <!-- Q4 -->
    <div class="faq-item" id="faq-4">
      <button class="faq-btn" onclick="toggleFaq(4)" aria-expanded="false" aria-controls="ans-4">
        <span class="faq-q">Comment retrouver mon chauffeur à l'aéroport AIBD ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-4"><div class="faq-inner">
        <p>Votre chauffeur SCOD VTC vous attend à la sortie du terminal avec une <strong>pancarte à votre nom</strong>.</p>
        <div class="faq-block" style="margin-top:12px;"><div class="faq-block-title">Le processus</div><ol class="faq-ol"><li>À l'atterrissage, allumez votre téléphone</li><li>Vous recevez un SMS avec le nom et le numéro de votre chauffeur</li><li>Récupérez vos bagages tranquillement</li><li>Votre chauffeur vous attend en zone d'accueil, pancarte visible</li></ol></div>
        <div class="faq-tip" style="margin-top:12px;"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="7.5" cy="7.5" r="6.5" stroke="#f59e0b" stroke-width="1.3"/><path d="M7.5 5v4M7.5 4v.3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>Renseignez votre numéro de vol lors de la réservation. Nous suivons votre vol en temps réel et ajustons l'heure automatiquement en cas de retard.</div>
      </div></div>
    </div>

    <!-- Q5 -->
    <div class="faq-item" id="faq-5">
      <button class="faq-btn" onclick="toggleFaq(5)" aria-expanded="false" aria-controls="ans-5">
        <span class="faq-q">Que se passe-t-il si mon vol est en retard ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-5"><div class="faq-inner">
        <p>Aucun stress, SCOD VTC s'adapte à votre vol.</p>
        <div class="faq-grid-2">
          <div class="faq-block" style="margin:0;"><div class="faq-block-title">✓ Vol renseigné</div><ul class="faq-ul"><li>Suivi vol en temps réel</li><li>Horaire ajusté auto.</li><li><strong>15 min d'attente offerts</strong></li><li>Chauffeur informé</li></ul></div>
          <div class="faq-block" style="margin:0;"><div class="faq-block-title">Vol non renseigné</div><ul class="faq-ul"><li>Appelez-nous dès que possible</li><li>+221 77 123 45 67</li><li>Nous nous adaptons</li></ul></div>
        </div>
        <div class="faq-tip"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="7.5" cy="7.5" r="6.5" stroke="#f59e0b" stroke-width="1.3"/><path d="M7.5 5v4M7.5 4v.3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg><strong>Pas de frais supplémentaires</strong> en cas de retard de vol si celui-ci est renseigné.</div>
      </div></div>
    </div>

    <!-- Q6 -->
    <div class="faq-item" id="faq-6">
      <button class="faq-btn" onclick="toggleFaq(6)" aria-expanded="false" aria-controls="ans-6">
        <span class="faq-q">Quels modes de paiement acceptez-vous ?</span>
        <span class="faq-icon"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>
      <div class="faq-answer" id="ans-6"><div class="faq-inner">
        <p>SCOD VTC accepte plusieurs modes de paiement pour votre confort :</p>
        <div class="faq-grid-2">
          <div class="faq-block" style="margin:0;"><div class="faq-block-title">📱 Mobile</div><ul class="faq-ul"><li>Orange Money</li><li>Wave</li><li>Free Money</li></ul></div>
          <div class="faq-block" style="margin:0;"><div class="faq-block-title">💳 Autres</div><ul class="faq-ul"><li>Espèces (FCFA)</li><li>Carte bancaire</li><li>Virement (entreprises)</li></ul></div>
        </div>
        <div class="faq-block" style="margin-top:10px;"><div class="faq-block-title">🏢 Entreprises</div><p>Contrats avec <strong>facturation mensuelle</strong>. Contactez-nous pour un devis personnalisé.</p></div>
        <p style="font-size:13px;color:#6b7280;margin-top:10px;">Le paiement s'effectue à la fin de la course, directement au chauffeur ou par mobile.</p>
      </div></div>
    </div>

  </div><!-- /droite -->
</div><!-- /layout -->
</div><!-- /container -->
</section>

<script>
function toggleFaq(id) {
  document.querySelectorAll('.faq-item').forEach(item => {
    const num = parseInt(item.id.split('-')[1]);
    const answer = document.getElementById('ans-' + num);
    const btn = item.querySelector('.faq-btn');
    const isThis = num === id;
    const isOpen = item.classList.contains('open');
    if (isThis && !isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      item.classList.remove('open');
      answer.style.maxHeight = '0';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const a1 = document.getElementById('ans-1');
  if (a1) a1.style.maxHeight = a1.scrollHeight + 'px';

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
</script>
<script>

function toggleFaq(id) {
  document.querySelectorAll('.faq-item').forEach(item => {
    const num = parseInt(item.id.split('-')[1]);
    const answer = document.getElementById('ans-' + num);
    const btn = item.querySelector('.faq-btn');
    const isThis = num === id;
    const isOpen = item.classList.contains('open');
    if (isThis && !isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      item.classList.remove('open');
      answer.style.maxHeight = '0';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const a1 = document.getElementById('ans-1');
  if (a1) a1.style.maxHeight = a1.scrollHeight + 'px';

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

</script>
</body>
</html>

```

Analyse cette page comme un designer senior. Décris EN DÉTAIL :

1. STRUCTURE DU LAYOUT
   - Organisation grille/colonnes de chaque section
   - Flux de navigation utilisateur
   - Hiérarchie des informations

2. HIÉRARCHIE VISUELLE
   - Ce qui attire l'oeil en premier, en second, en troisième
   - Ordre de lecture naturel
   - Points d'attention mal placés

3. SYSTÈME D'ESPACEMENT
   - Le système 8px est-il respecté partout ?
   - Où l'espacement respire, où il étouffe ?
   - Cohérence entre sections

4. ÉCHELLE TYPOGRAPHIQUE
   - Analyse Barlow vs Barlow Condensed : usage correct ?
   - Tailles, poids, contraste entre titre/corps/meta
   - Comparaison avec l'échelle typo de Uber/Stripe

5. SYSTÈME DE COULEURS
   - #110E40 brand et #FFC300 accent : usage cohérent ?
   - Contraste WCAG AA respecté ?
   - Palette trop limitée ou suffisante ?

6. ÉLÉMENTS PREMIUM
   - Quels éléments font "premium" (micro-interactions, grain, glassmorphism) ?
   - Quels éléments font "template générique" ?
   - Que manque-t-il pour atteindre le niveau Uber ?

7. LES 5 PROBLÈMES VISUELS CRITIQUES
   - Pour chaque problème : description + impact + solution
   - Prioriser par impact sur la conversion

8. PLAN D'AMÉLIORATION
   - Les 10 quick wins pour passer de "bon" à "premium"
   - Les fonctionnalités manquantes pour le niveau Uber Pro

CONTEXTE BUSINESS :
- Cible : Dakarois CSP+, diaspora, touristes, entreprises
- Flotte : BMW Série 5, Tesla Model S/X, Range Rover, Mercedes Classe S/V, Van PMR
- Paiement : FCFA, Orange Money, Wave, Wave Business, Free Money, CB (Stripe), espèces
- Services : Transfert AIBD, trajets pro, famille, événements, inter-régions
- Chauffeurs : nom, photo, note, expérience visibles dès la réservation

Ne génère PAS de code. Sois précis, critique et opiniâtre.
Sauvegarde ton analyse dans ANALYSIS.md
