import { Component, OnInit } from '@angular/core';

import { TemplateService } from './template.service';
import { MatDialog } from '@angular/material/dialog';
import { Template } from './template.model';

import { DialogComponent } from '../dialog/dialog.component';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  templates: Template[] = [];

  constructor(
    private templateService: TemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.savedTemplates();
  }

  savedTemplates(): void {
    this.templateService.getUsersTemplate().subscribe((templates) => {
      this.templates = templates;
    });
  }

  CreateDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') this.savedTemplates();
    });
  }

  editTemplate(template: Template): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { mode: 'edit', template },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') this.savedTemplates();
    });
  }

  deleteTemplate(id: number): void {
    this.templateService.deleteTemplate(id).subscribe(() => {
      this.savedTemplates();
    });
  }

  preview(id: number): void {
    this.templateService.getTemplatePreview(id).subscribe((preview) => {
      this.dialog.open(PreviewComponent, {
        width: '500px',
        data: { preview },
      });
    });
  }
}
