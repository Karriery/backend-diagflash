export class CreateDocumentDto {
  nom: string;

  email: string;

  tel: string;

  civilite: string;

  anneDeNaissance: string;

  situationFamiliale: string[];

  nombreDenfants: number;

  nombreDenfantsEleves: number;

  etudeSuperieure: string;

  ageSouhaiteDeDepart: number;

  ageDuDebutdactiviteProfessionnelle: string;

  avezVousEte: string[];

  avezVousRencontre: string[];

  niveauActuel: string;

  evolution: string;

  titreIndividuel: string;

  titreProfessionnelObligatoire: string;

  titreProfessionnelFacultatif: string;

  risqueTrimestre: {
    status: string;
    text: string;
  };

  risqueComp: {
    status: string;
    text: string;
  };

  risqueSup: {
    status: string;
    text: string;
  };

  risqueAge: {
    status: string;
    text: string;
  };

  risqueTraindevie: {
    status: string;
    text: string;
  };

  risqueReversion: {
    status: string;
    text: string;
  };
}
