import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectModel } from '../../common/model';
import { ContentfulService } from '../../common/services';
import { Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  private contentfulService = inject(ContentfulService);
  projectList = signal<ProjectModel[]>([]);

  ngOnInit(): void {
      this.contentfulService.getFeaturedProjects()
        .then(projects => {
          this.projectList.set(projects);
        })
        .catch(error => {
          console.error('Error loading projects:', error);
        });
    }
  
    trackByProjectId(index: number, project: ProjectModel): string {
      return project.name;
    }
  
    getDescription(description?: Document): string {
      if (!description) {
        return '';
      }
  
      return documentToHtmlString(description);
    }
}