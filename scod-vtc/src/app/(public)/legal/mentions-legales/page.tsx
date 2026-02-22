import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions Légales — SCOD VTC",
  description: "Mentions légales du site SCOD VTC, premier service VTC premium au Sénégal.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions Légales" updatedAt="1er février 2026">

      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>scodvtc.sn</strong> est édité par :
      </p>
      <ul>
        <li><strong>Dénomination sociale :</strong> SCOD VTC</li>
        <li><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</li>
        <li><strong>Capital social :</strong> 5 000 000 FCFA</li>
        <li><strong>Siège social :</strong> Dakar, Plateau, Sénégal</li>
        <li><strong>NINEA :</strong> 00X-XXXX-X (numéro d'identification nationale des entreprises et associations)</li>
        <li><strong>RCCM :</strong> SN-DKR-20XX-B-XXXXX (Registre du Commerce et du Crédit Mobilier)</li>
        <li><strong>Téléphone :</strong> +221 77 123 45 67</li>
        <li><strong>Email :</strong> <a href="mailto:contact@scodvtc.sn">contact@scodvtc.sn</a></li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication du site <strong>scodvtc.sn</strong> est :<br />
        <strong>Ousmane Diallo</strong>, Co-fondateur et Directeur Général de SCOD VTC.<br />
        Email : <a href="mailto:direction@scodvtc.sn">direction@scodvtc.sn</a>
      </p>

      <h2>3. Hébergeur</h2>
      <p>
        Le site est hébergé par :
      </p>
      <ul>
        <li><strong>Société :</strong> Vercel Inc.</li>
        <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
        <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a></li>
      </ul>
      <p>
        La base de données est hébergée par <strong>Supabase Inc.</strong> sur infrastructure AWS,
        région Europe (eu-west-1).
      </p>

      <h2>4. Activité réglementée</h2>
      <p>
        SCOD VTC exerce une activité de <strong>transport de personnes à titre onéreux avec
        chauffeur</strong> (VTC), soumise à la réglementation sénégalaise en matière de transport
        public de personnes.
      </p>
      <p>
        Tous nos chauffeurs sont titulaires des autorisations requises par les autorités compétentes
        sénégalaises et d'un permis de conduire de catégorie B valide depuis au moins 3 ans.
        Les véhicules sont couverts par une assurance responsabilité civile professionnelle.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments constituant le site <strong>scodvtc.sn</strong> — notamment la
        marque SCOD VTC, le logo, les textes, les photographies, les illustrations, les icônes,
        le code source et l'architecture du site — sont la propriété exclusive de SCOD VTC ou font
        l'objet d'une licence d'utilisation accordée à SCOD VTC.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, transmission ou dénaturation,
        totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit et sur
        quelque support que ce soit, est interdite sans l'autorisation préalable et écrite de
        SCOD VTC, sous peine de poursuites judiciaires.
      </p>
      <p>
        Les photographies de véhicules utilisées sur ce site sont issues de licences libres de
        droits (Unsplash) ou constituent la propriété de SCOD VTC.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site <strong>scodvtc.sn</strong> peut contenir des liens vers des sites tiers. Ces liens
        sont fournis à titre informatif. SCOD VTC n'exerce aucun contrôle sur ces sites et décline
        toute responsabilité quant à leur contenu, leur disponibilité ou leur politique de
        confidentialité.
      </p>
      <p>
        Toute demande d'autorisation pour établir un lien hypertexte vers le site scodvtc.sn doit
        être adressée à <a href="mailto:contact@scodvtc.sn">contact@scodvtc.sn</a>.
      </p>

      <h2>7. Limitation de responsabilité</h2>
      <p>
        SCOD VTC s'efforce de maintenir le site accessible 24h/24 et 7j/7 mais ne peut garantir
        une disponibilité continue. Des interruptions peuvent survenir pour maintenance ou en raison
        de circonstances indépendantes de notre volonté.
      </p>
      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif et peuvent être
        modifiées sans préavis. SCOD VTC ne saurait être tenu responsable des erreurs ou omissions
        présentes dans le contenu du site, ni des dommages résultant de l'utilisation des
        informations publiées.
      </p>

      <h2>8. Données personnelles et cookies</h2>
      <p>
        Le traitement des données personnelles collectées via ce site est décrit dans notre{" "}
        <a href="/legal/confidentialite">Politique de Confidentialité</a>.
      </p>
      <p>
        Le site utilise des cookies techniques nécessaires à son fonctionnement ainsi que des
        cookies analytiques (avec votre consentement). Vous pouvez à tout moment modifier vos
        préférences via le gestionnaire de cookies.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Le présent site et ces mentions légales sont soumis au <strong>droit sénégalais</strong>.
        Tout litige relatif à l'utilisation de ce site sera de la compétence exclusive des
        juridictions de <strong>Dakar, Sénégal</strong>.
      </p>

      <h2>10. Contact</h2>
      <p>Pour toute question relative au site ou à nos services :</p>
      <ul>
        <li><strong>Email général :</strong> <a href="mailto:contact@scodvtc.sn">contact@scodvtc.sn</a></li>
        <li><strong>Email DPO (données personnelles) :</strong> <a href="mailto:privacy@scodvtc.sn">privacy@scodvtc.sn</a></li>
        <li><strong>Téléphone :</strong> +221 77 123 45 67</li>
        <li><strong>WhatsApp :</strong> <a href="https://wa.me/221771234567" target="_blank" rel="noopener">wa.me/221771234567</a></li>
        <li><strong>Adresse :</strong> SCOD VTC, Dakar Plateau, Sénégal</li>
      </ul>

      <hr />
      <p className="text-[13px] text-grey-400">
        Ces mentions légales sont susceptibles d'être modifiées à tout moment. La version en vigueur
        est celle accessible en ligne à la date de votre consultation.
      </p>
    </LegalLayout>
  );
}
