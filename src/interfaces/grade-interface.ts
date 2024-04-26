import { IBenefit } from "./benefit-interface";

export interface IGrade {
  id: number;
  name: string;
  prefix: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  benefits: IBenefit[];
}
