import { Document } from "@contentful/rich-text-types";

export interface WorkExperienceModel {
  jobTitle: string;
  company: string;
  description: Document;
  technologies: string[];
  startDate: string;
  endDate?: string;
}