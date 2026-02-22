import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — SCOD VTC",
  description: "Politique de confidentialité et protection des données personnelles de SCOD VTC.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de Confidentialité" updatedAt="1er février 2026">
      <div className="note">
        SCOD VTC accorde une importance capitale à la protection de vos données personnelles. Cette
        politique décrit comment nous collectons, utilisons, stockons et protégeons vos informations
        conformément à la législation sénégalaise sur la protection des données personnelles (Loi n°
        2008-12 du 25 janvier 2008) et au RGPD pour les résidents européens.
      </div>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement de vos données personnelles est :<br />
        <strong>SCOD VTC</strong><br />
        Siège social : Dakar, Sénégal<br />
        Email DPO : <a href="mailto:privacy@scodvtc.sn">privacy@scodvtc.sn</a><br />
        Téléphone : +221 77 123 45 67
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les catégories de données suivantes :</p>
      <p><strong>Données d'identité et de contact :</strong></p>
      <ul>
        <li>Prénom, nom de famille</li>
        <li>Numéro de téléphone (utilisé pour l'authentification OTP via SMS)</li>
        <li>Adresse email (optionnelle)</li>
        <li>Photo de profil (optionnelle)</li>
      </ul>
      <p><strong>Données de réservation et de trajet :</strong></p>
      <ul>
        <li>Adresses de départ et d'arrivée</li>
        <li>Date, heure et durée des courses</li>
        <li>Type de véhicule sélectionné</li>
        <li>Historique des réservations</li>
        <li>Numéro de vol (pour les transferts aéroport)</li>
      </ul>
      <p><strong>Données de paiement :</strong></p>
      <ul>
        <li>Numéro de téléphone Mobile Money (Orange Money, Wave, Free Money) — tokenisé via PayTech</li>
        <li>Données de carte bancaire — traitées exclusivement par Stripe, jamais stockées sur nos serveurs</li>
        <li>Historique des transactions (montants, dates, statuts)</li>
      </ul>
      <p><strong>Données techniques :</strong></p>
      <ul>
        <li>Adresse IP, type de navigateur, système d'exploitation</li>
        <li>Données de géolocalisation (uniquement lors de l'utilisation du service, avec votre consentement)</li>
        <li>Cookies et identifiants de session</li>
        <li>Logs d'accès et données de performance</li>
      </ul>
      <p><strong>Données pour les comptes entreprises :</strong></p>
      <ul>
        <li>Raison sociale, NINEA, adresse du siège</li>
        <li>Nom et coordonnées du responsable de compte</li>
        <li>Liste des collaborateurs autorisés</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont traitées pour les finalités suivantes :</p>
      <ul>
        <li><strong>Exécution du service</strong> : création et gestion de votre compte, traitement des réservations, dispatch des chauffeurs, suivi de course en temps réel</li>
        <li><strong>Paiement</strong> : traitement sécurisé des transactions via nos prestataires de paiement</li>
        <li><strong>Communication</strong> : envoi de confirmations de réservation, notifications de statut, alertes chauffeur par SMS et email</li>
        <li><strong>Sécurité</strong> : vérification d'identité via OTP, prévention de la fraude, journalisation des accès</li>
        <li><strong>Amélioration du service</strong> : analyse des données d'usage agrégées et anonymisées, évaluation de la qualité</li>
        <li><strong>Obligations légales</strong> : conservation des données de facturation, conformité fiscale et réglementaire</li>
        <li><strong>Marketing</strong> (avec votre consentement explicite) : informations sur nos nouveaux services et offres spéciales</li>
      </ul>

      <h2>4. Base légale du traitement</h2>
      <ul>
        <li><strong>Exécution d'un contrat</strong> : traitement nécessaire à la fourniture du service de transport</li>
        <li><strong>Obligation légale</strong> : conservation des données de facturation (10 ans)</li>
        <li><strong>Intérêt légitime</strong> : prévention de la fraude, amélioration du service</li>
        <li><strong>Consentement</strong> : géolocalisation, communications marketing</li>
      </ul>

      <h2>5. Stockage et sécurité</h2>
      <p>
        Vos données sont hébergées sur <strong>Supabase</strong> (infrastructure PostgreSQL sur AWS
        eu-west-1, région Europe). Supabase est conforme aux normes SOC 2 Type II et ISO 27001.
      </p>
      <p>
        Nous mettons en œuvre les mesures de sécurité suivantes :
      </p>
      <ul>
        <li>Chiffrement en transit (TLS 1.3) et au repos (AES-256)</li>
        <li>Authentification à deux facteurs (OTP SMS) pour l'accès aux comptes</li>
        <li>Row-Level Security (RLS) sur toutes les tables Supabase</li>
        <li>Journalisation et monitoring des accès anormaux</li>
        <li>Sauvegardes quotidiennes chiffrées avec rétention de 30 jours</li>
      </ul>
      <p><strong>Durées de conservation :</strong></p>
      <ul>
        <li>Données de compte : durée de la relation contractuelle + 3 ans après clôture</li>
        <li>Données de facturation : 10 ans (obligation légale)</li>
        <li>Données de course : 5 ans</li>
        <li>Logs techniques : 12 mois</li>
        <li>Données marketing : jusqu'au retrait du consentement</li>
      </ul>

      <h2>6. Partage avec des tiers</h2>
      <p>
        Nous partageons uniquement les données strictement nécessaires à l'exécution du service
        avec les prestataires suivants, liés par des accords de traitement des données (DPA) :
      </p>
      <ul>
        <li>
          <strong>Supabase Inc.</strong> — Hébergement de la base de données et authentification.
          Politique : <a href="https://supabase.com/privacy" target="_blank" rel="noopener">supabase.com/privacy</a>
        </li>
        <li>
          <strong>Google Maps Platform (Google LLC)</strong> — Géolocalisation, calcul d'itinéraires,
          autocomplétion d'adresses. Politique : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>
        </li>
        <li>
          <strong>PayTech</strong> — Traitement des paiements Mobile Money (Orange Money, Wave, Free Money).
          Prestataire agréé par la BCEAO. Politique disponible sur paytech.sn
        </li>
        <li>
          <strong>Stripe Inc.</strong> — Traitement des paiements par carte bancaire (PCI-DSS Level 1).
          Politique : <a href="https://stripe.com/privacy" target="_blank" rel="noopener">stripe.com/privacy</a>
        </li>
        <li>
          <strong>Twilio Inc.</strong> — Envoi de SMS de confirmation et d'OTP.
          Politique : <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener">twilio.com/legal/privacy</a>
        </li>
        <li>
          <strong>Resend</strong> — Envoi d'emails transactionnels (confirmations, reçus, factures).
          Politique : <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener">resend.com/legal/privacy-policy</a>
        </li>
        <li>
          <strong>Wave Business (Wave Mobile Money)</strong> — Facturation mensuelle pour les comptes entreprises.
          Prestataire agréé par la BCEAO.
        </li>
        <li>
          <strong>Vercel Inc.</strong> — Hébergement de l'application web.
          Politique : <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">vercel.com/legal/privacy-policy</a>
        </li>
      </ul>
      <p>
        Nous ne vendons, ne louons et ne cédons jamais vos données personnelles à des tiers à des
        fins commerciales.
      </p>

      <h2>7. Vos droits</h2>
      <p>Conformément à la législation applicable, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données (sous réserve des obligations légales de conservation)</li>
        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible</li>
        <li><strong>Droit d'opposition</strong> : vous opposer au traitement à des fins de marketing</li>
        <li><strong>Droit à la limitation</strong> : limiter le traitement dans certaines circonstances</li>
        <li><strong>Droit de retirer votre consentement</strong> : à tout moment, sans porter atteinte à la légalité du traitement antérieur</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez notre DPO à{" "}
        <a href="mailto:privacy@scodvtc.sn">privacy@scodvtc.sn</a>. Nous répondons dans un délai
        maximum de <strong>30 jours</strong>.
      </p>

      <h2>8. Cookies</h2>
      <p>Notre site utilise les catégories de cookies suivantes :</p>
      <ul>
        <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (session, authentification, panier). Pas de consentement requis.</li>
        <li><strong>Cookies de performance</strong> (avec consentement) : mesure d'audience anonymisée pour améliorer l'expérience</li>
        <li><strong>Cookies fonctionnels</strong> (avec consentement) : mémorisation de vos préférences (langue, véhicule favori)</li>
      </ul>
      <p>
        Vous pouvez gérer vos préférences de cookies via le bandeau de consentement affiché à votre
        première visite ou en modifiant les paramètres de votre navigateur.
      </p>

      <h2>9. Transferts internationaux</h2>
      <p>
        Certains de nos prestataires sont établis aux États-Unis (Google, Stripe, Twilio, Vercel).
        Ces transferts sont encadrés par des clauses contractuelles types approuvées et des garanties
        appropriées conformément au droit applicable.
      </p>

      <h2>10. Contact et réclamations</h2>
      <p>
        Pour toute question relative au traitement de vos données, contactez notre Délégué à la
        Protection des Données (DPO) :<br />
        <strong>Email :</strong> <a href="mailto:privacy@scodvtc.sn">privacy@scodvtc.sn</a><br />
        <strong>Courrier :</strong> SCOD VTC — DPO, Dakar, Sénégal
      </p>
      <p>
        En cas de désaccord non résolu, vous disposez du droit d'introduire une réclamation auprès
        de la <strong>Commission de Protection des Données Personnelles (CDP) du Sénégal</strong>.
      </p>

      <hr />
      <p className="text-[13px] text-grey-400">
        Cette politique peut être mise à jour. La date de dernière modification est indiquée en haut
        de cette page. En cas de modification substantielle, nous vous en informons par email ou par
        notification dans l'application.
      </p>
    </LegalLayout>
  );
}
