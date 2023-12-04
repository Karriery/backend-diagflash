import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type tDocument = HydratedDocument<Document>;

@Schema({ timestamps: true })
export class Document {
  @Prop()
  civilite: string;

  @Prop()
  anneDeNaissance: string;

  @Prop()
  situationFamiliale: string;

  @Prop()
  nombreDenfants: number;

  @Prop()
  nombreDenfantsEleves: number;

  @Prop()
  etudeSuperieure: boolean;

  @Prop()
  ageSouhaiteDeDepart: boolean;

  @Prop()
  ageDuDebutdactiviteProfessionnelle: string;

  @Prop()
  avezVousEte: string;

  @Prop()
  avezVousRencontre: string;

  @Prop()
  niveauActuel: string;

  @Prop()
  titreIndividuel: string;

  @Prop()
  titreProfessionnelObligatoire: string;

  @Prop()
  titreProfessionnelFacultatif: string;

  @Prop()
  conjoint: string;

  @Prop()
  vie: string;

  @Prop()
  ageDeDepart: string;

  @Prop()
  trimestres: string;

  @Prop()
  complementaires: string;

  @Prop()
  supplimentaires: string;

  @Prop({ default: 'Document' })
  type: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
