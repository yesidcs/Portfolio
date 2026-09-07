import { Injectable } from '@angular/core';
import { Asset, createClient, EntrySkeletonType } from 'contentful';

import { environment } from '../../../environments/environment';
import { ProjectModel, WorkExperienceModel } from '../model';
import { Document } from '@contentful/rich-text-types';

interface ProjectSkeleton extends EntrySkeletonType {
  contentTypeId: 'project';
  fields: {
    name: string;
    description?: Document;
    image?: Asset;
    technologies?: string[];
    gitHubUrl?: string;
    liveUrl?: string;
    documentationUrl?: string;
    isFeatured?: boolean;
    featuredOrder?: number;
  };
}

interface WorkExperienceSkeleton extends EntrySkeletonType {
  contentTypeId: 'workExperience';
  fields: {
    jobTitle: string;
    company: string;
    description: Document;
    technologies: string[];
    startDate: string;
    endDate?: string;
    order: number;
  };
}

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {

  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.deliveryToken
  });

  getProjects(): Promise<ProjectModel[]> {
    return this.client
      .getEntries<ProjectSkeleton>({
        content_type: 'project',
        order: ['-sys.createdAt']
      })
      .then(response =>
        response.items.map(item => this.mapToProjectModel(item.fields))
      );
  }

  getFeaturedProjects(): Promise<ProjectModel[]> {
    return this.client
      .getEntries<ProjectSkeleton>({
        content_type: 'project',
        'fields.isFeatured': true,
        order: ['fields.featuredOrder'],
        limit: 2
      } as any )
      .then(response =>
        response.items.map(item => this.mapToProjectModel(item.fields))
      );
  }

  getWorkExperience(): Promise<WorkExperienceModel[]> {
    return this.client
      .getEntries<WorkExperienceSkeleton>({
        content_type: 'workExperience',
        order: ['fields.order']
      } as any )
      .then(response =>
        response.items.map(item => this.mapToWorkExperienceModel(item.fields))
      );
  }

  private mapToProjectModel(fields: ProjectSkeleton['fields']): ProjectModel {
    return {
      name: fields.name,
      description: fields.description,
      image: fields.image,
      technologies: fields.technologies ?? [],
      gitHubUrl: fields.gitHubUrl,
      liveUrl: fields.liveUrl,
      documentationUrl: fields.documentationUrl
    };
  }

  private mapToWorkExperienceModel(fields: WorkExperienceSkeleton['fields']): WorkExperienceModel {
    return {
      jobTitle: fields.jobTitle,
      company: fields.company,
      description: fields.description,
      technologies: fields.technologies,
      startDate: fields.startDate,
      endDate: fields.endDate      
    };
  }
}