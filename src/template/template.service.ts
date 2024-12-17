import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';
import { TemplateDto } from './template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repo: Repository<Template>,
  ) {}

  async createTemplate(templateDto: TemplateDto): Promise<Template> {
    const originalText = templateDto.originalText;

    const renderedTemplate = templateDto.templateText.replace(
      /{{\s*(\w+)\s*}}/g,
      (match: string, key: string) => {
        return templateDto.preview[key] !== undefined
          ? templateDto.preview[key]
          : match;
      },
    );

    const newTemplate = this.repo.create({
      templateText: renderedTemplate,
      originalText,
      preview: templateDto.preview,
    });

    return this.repo.save(newTemplate);
  }

  async getUserTemplates(): Promise<Template[]> {
    return this.repo.find();
  }

  async getTemplatePreview(id: number): Promise<string> {
    const template = await this.repo.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException('template not found');
    }

    let previewData: any;

    try {
      previewData =
        typeof template.preview === 'string'
          ? JSON.parse(template.preview)
          : template.preview;
    } catch (error) {
      throw new BadRequestException('invalid preview');
    }

    return previewData;
  }

  async updateTemplate(
    id: number,
    templateDto: TemplateDto,
  ): Promise<Template> {
    templateDto.id = id;
    console.log('updating template', templateDto);

    const template = await this.repo.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException('template not found');
    }

    template.originalText = templateDto.originalText;

    template.templateText = templateDto.originalText.replace(
      /{{\s*(\w+)\s*}}/g,
      (match: string, key: string) => {
        return templateDto.preview[key] !== undefined
          ? templateDto.preview[key]
          : match;
      },
    );

    // template.originalText = templateDto.originalText;
    // template.templateText = renderedTemplate;

    template.preview = templateDto.preview;

    // template.originaltext = templateDto.originalText;
    // if (templateDto.originalText) {
    //   template.originalText = templateDto.originalText;
    // }

    return this.repo.save(template);
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
