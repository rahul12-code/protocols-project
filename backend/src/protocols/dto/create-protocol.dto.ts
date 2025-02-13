export class CreateProtocolDto {
  protocol_key: string;
  ra_lead?: string[];
  clinical_labelling_manager?: string[];
  cta_sm?: string[];
  cta_associate?: string[];
  study_lead?: string[];
}