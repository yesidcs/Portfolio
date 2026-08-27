import { Injectable } from '@angular/core';
import { Asset, createClient, EntrySkeletonType } from 'contentful';

import { environment } from '../../../environments/environment';
import { ProjectModel } from '../model';
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
        order: ['-sys.createdAt'],
        limit: 2
      })
      .then(response =>
        response.items.map(item => this.mapToProjectModel(item.fields))
      );
  }

  private mapToProjectModel(fields: ProjectSkeleton['fields']): ProjectModel {
    return {
      name: fields.name,
      description: fields.description,
      image: fields.image,
      technologies: fields.technologies ?? [],
      gitHubUrl: fields.gitHubUrl,
      liveUrl: fields.liveUrl
    };
  }
}