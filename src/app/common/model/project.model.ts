import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";

export interface ProjectModel {
  name: string;
  description?: Document;
  image?: Asset;
  technologies?: string[];
  gitHubUrl?: string;
  liveUrl?: string;
}