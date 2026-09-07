import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectModel, WorkExperienceModel } from '../../common/model';
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
  workExperienceList = signal<WorkExperienceModel[]>([]);

  ngOnInit(): void {
    this.contentfulService.getWorkExperience()
      .then(workExperience => {
        this.workExperienceList.set(workExperience);
      })
      .catch(error => {
        console.error('Error loading work experience: ', error);
      })

    this.contentfulService.getFeaturedProjects()
      .then(projects => {
        this.projectList.set(projects);
      })
      .catch(error => {
        console.error('Error loading projects: ', error);
      });    
  }
  
  trackByProjectId(index: number, project: ProjectModel): string {
    return project.name;
  }

  trackByWorkExperienceId(index: number, workExperience: WorkExperienceModel): string {
    return workExperience.jobTitle;
  }
  
  getDescription(description?: Document): string {
    if (!description) {
      return '';
    }

    return documentToHtmlString(description);
  }

  getYear(dateString: string): number {
    return new Date(dateString).getFullYear();
  }

  getDateRange(exp: WorkExperienceModel): string {
    const start = this.getYear(exp.startDate);
    const end = exp.endDate ? this.getYear(exp.endDate) : 'Presente';
    return `${start} — ${end}`;
  }
}