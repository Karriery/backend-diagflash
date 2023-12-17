import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type tDocument = HydratedDocument<Document>;
class Obj {
  status: string;
  text: string;
}

@Schema({ timestamps: true })
export class Document {
  @Prop()
  nom: string;

  @Prop()
  email: string;

  @Prop()
  tel: string;

  @Prop()
  civilite: string;

  @Prop()
  anneDeNaissance: string;

  @Prop()
  situationFamiliale: string[];

  @Prop()
  nombreDenfants: number;

  @Prop()
  nombreDenfantsEleves: number;

  @Prop()
  etudeSuperieure: string;

  @Prop()
  ageSouhaiteDeDepart: number;

  @Prop()
  ageDuDebutdactiviteProfessionnelle: string;

  @Prop()
  avezVousEte: string[];

  @Prop()
  avezVousRencontre: string[];

  @Prop()
  niveauActuel: string;

  @Prop()
  evolution: string;

  @Prop()
  titreIndividuel: string;

  @Prop()
  titreProfessionnelObligatoire: string;

  @Prop()
  titreProfessionnelFacultatif: string;

  @Prop({ type: Obj })
  risqueTrimestre: {
    status: string;
    text: string;
  };

  @Prop({ type: Obj })
  risqueComp: {
    status: string;
    text: string;
  };

  @Prop({ type: Obj })
  risqueSup: {
    status: string;
    text: string;
  };

  @Prop({ type: Obj })
  risqueAge: {
    status: string;
    text: string;
  };

  @Prop({ type: Obj })
  risqueTraindevie: {
    status: string;
    text: string;
  };

  @Prop({ type: Obj })
  risqueReversion: {
    status: string;
    text: string;
  };

  @Prop({ default: false })
  archived: boolean;

  @Prop({ default: "Document" })
  type: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
