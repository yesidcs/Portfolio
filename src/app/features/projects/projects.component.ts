import { Component, inject, signal } from '@angular/core';
import { ProjectModel } from '../../common/model';
import { CommonModule } from '@angular/common';
import { ContentfulService } from '../../common/services';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
	private contentfulService = inject(ContentfulService);

  projectList = signal<ProjectModel[]>([]);
 
  ngOnInit(): void {
    this.contentfulService.getProjects()
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