import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — SCOD VTC",
  description: "Conditions générales de vente du service SCOD VTC, premier service VTC premium au Sénégal.",
};

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions Générales de Vente" updatedAt="1er février 2026">
      <div className="note">
        Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des prestations de
        transport proposées par <strong>SCOD VTC</strong> à ses clients particuliers et entreprises.
        Toute réservation vaut acceptation pleine et entière de ces conditions.
      </div>

      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le
        cadre de la mise à disposition de services de transport avec chauffeur privé proposés par
        SCOD VTC sur l'ensemble du territoire sénégalais.
      </p>
      <p>
        SCOD VTC est un service de VTC (Véhicule de Tourisme avec Chauffeur) proposant des
        prestations de transport de personnes à titre onéreux, incluant les transferts aéroport,
        les trajets urbains, les mises à disposition de chauffeur et le transport événementiel.
      </p>

      <h2>Article 2 — Conditions de réservation</h2>
      <p>
        La réservation peut être effectuée par les canaux suivants :
      </p>
      <ul>
        <li>Via le site web <strong>scodvtc.sn</strong> — disponible 24h/24, 7j/7</li>
        <li>Par téléphone au <strong>+221 77 123 45 67</strong></li>
        <li>Par WhatsApp au même numéro</li>
        <li>Par email à <strong>contact@scodvtc.sn</strong></li>
      </ul>
      <p>
        Toute réservation donne lieu à un <strong>accusé de réception par SMS</strong> contenant les
        informations du chauffeur assigné (nom, photo, plaque d'immatriculation) ainsi que les
        détails du trajet confirmé.
      </p>
      <p>
        Le client s'engage à fournir des informations exactes lors de la réservation (adresse de
        départ, adresse d'arrivée, date, heure, nombre de passagers). SCOD VTC ne saurait être
        tenu responsable d'un retard ou d'une impossibilité d'exécution résultant d'informations
        erronées communiquées par le client.
      </p>
      <p>
        Les réservations peuvent être effectuées <strong>jusqu'à 12 mois à l'avance</strong> et au
        minimum <strong>30 minutes avant le départ</strong> pour les trajets immédiats.
      </p>

      <h2>Article 3 — Tarifs et paiement</h2>
      <p>
        Les tarifs sont <strong>fixes et garantis en FCFA</strong> dès la confirmation de la
        réservation. Aucun supplément lié aux embouteillages ou aux conditions de circulation n'est
        appliqué, sauf exceptions listées ci-après.
      </p>
      <p><strong>Suppléments applicables :</strong></p>
      <ul>
        <li>Prise en charge ou dépose de nuit (22h – 6h) : <strong>+5 000 FCFA</strong></li>
        <li>Zone hors Dakar (distance supérieure à 50 km du centre) : <strong>+10 000 FCFA</strong></li>
        <li>Transfert aéroport AIBD (depuis/vers Dakar) : supplément inclus dans le tarif affiché</li>
        <li>Attente au-delà de 15 minutes (aéroport) ou 10 minutes (autres points) : <strong>5 000 FCFA / 15 min supplémentaires</strong></li>
      </ul>
      <p><strong>Moyens de paiement acceptés :</strong></p>
      <ul>
        <li><strong>Mobile Money (PayTech)</strong> : Orange Money, Wave, Free Money — paiement sécurisé par redirection</li>
        <li><strong>Carte bancaire (Stripe)</strong> : Visa, Mastercard, American Express, Apple Pay, Google Pay — données traitées par Stripe (PCI-DSS Level 1)</li>
        <li><strong>Wave Business</strong> : facturation mensuelle pour les comptes entreprises</li>
        <li><strong>Espèces</strong> : réglées directement au chauffeur en fin de course</li>
      </ul>
      <p>
        Un <strong>acompte de 30 %</strong> du montant total est requis pour confirmer toute
        réservation, à l'exception des paiements en espèces et des comptes entreprises sous
        contrat de facturation mensuelle.
      </p>

      <h2>Article 4 — Annulation et remboursement</h2>
      <ul>
        <li><strong>Annulation plus de 24h avant la course</strong> : remboursement intégral de l'acompte, sans frais.</li>
        <li><strong>Annulation entre 2h et 24h avant la course</strong> : retenue de 50 % du montant total. Le solde est remboursé sous 5 à 10 jours ouvrés selon le moyen de paiement.</li>
        <li><strong>Annulation moins de 2h avant la course ou non-présentation</strong> : aucun remboursement. La totalité du montant est conservée à titre d'indemnisation du chauffeur mobilisé.</li>
        <li><strong>Annulation par SCOD VTC</strong> (force majeure, absence de chauffeur disponible) : remboursement intégral sous 48h, sans pénalité.</li>
      </ul>
      <p>
        Le vol de départ pour les transferts aéroport est suivi en temps réel. En cas de retard de
        vol renseigné lors de la réservation, le chauffeur adapte son heure de départ sans frais
        supplémentaires pour le client.
      </p>

      <h2>Article 5 — Responsabilités</h2>
      <p>
        SCOD VTC s'engage à fournir un service de transport dans des conditions de sécurité
        optimales, avec des chauffeurs professionnels vérifiés et des véhicules conformes à la
        réglementation en vigueur.
      </p>
      <p>
        La responsabilité de SCOD VTC ne saurait être engagée en cas de :
      </p>
      <ul>
        <li>Retard imputable à des conditions de circulation exceptionnelles (accident, manifestation, intempéries)</li>
        <li>Informations de réservation incorrectes fournies par le client</li>
        <li>Force majeure au sens du droit sénégalais</li>
        <li>Vol ou perte d'objets personnels non signalés dans les 24h suivant la course</li>
      </ul>
      <p>
        Le client est responsable du comportement des passagers qu'il transporte. SCOD VTC se
        réserve le droit d'interrompre une course en cas de comportement inapproprié sans remboursement.
      </p>

      <h2>Article 6 — Assurance</h2>
      <p>
        Tous les véhicules SCOD VTC sont couverts par une <strong>assurance tous risques</strong>{" "}
        incluant la responsabilité civile professionnelle du transporteur, conformément à la
        réglementation sénégalaise relative au transport de personnes à titre onéreux.
      </p>
      <p>
        En cas d'accident, SCOD VTC communique les informations d'assurance au client dans les
        plus brefs délais. Les démarches de sinistre sont gérées par notre service client.
      </p>

      <h2>Article 7 — Réclamations</h2>
      <p>
        Toute réclamation relative à une prestation doit être adressée dans un délai de{" "}
        <strong>30 jours</strong> suivant la course, par email à{" "}
        <a href="mailto:contact@scodvtc.sn">contact@scodvtc.sn</a> ou via le formulaire de
        contact disponible sur <strong>/assistance</strong>.
      </p>
      <p>
        SCOD VTC s'engage à accuser réception sous 24h et à apporter une réponse sous{" "}
        <strong>5 jours ouvrés</strong>.
      </p>

      <h2>Article 8 — Propriété intellectuelle</h2>
      <p>
        La marque SCOD VTC, le logo, le site web et l'ensemble des contenus associés sont la
        propriété exclusive de SCOD VTC. Toute reproduction ou utilisation non autorisée est
        interdite.
      </p>

      <h2>Article 9 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont soumises au <strong>droit sénégalais</strong>. En cas de litige, les
        parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.
      </p>
      <p>
        À défaut d'accord amiable, tout litige sera soumis aux juridictions compétentes de
        <strong> Dakar, Sénégal</strong>.
      </p>

      <hr />
      <p className="text-[13px] text-grey-400">
        Pour toute question relative à ces CGV, contactez-nous à{" "}
        <a href="mailto:contact@scodvtc.sn">contact@scodvtc.sn</a>.
      </p>
    </LegalLayout>
  );
}
