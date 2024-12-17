import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { AuthGuard } from '../guards/auth.guards';
import { Template } from './template.entity';
import { TemplateDto } from './template.dto';

@Controller('template')
@UseGuards(AuthGuard)
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('/create')
  async createTemplate(@Body() templateDto: TemplateDto): Promise<Template> {
    if (!templateDto.templateText || !templateDto.preview) {
      throw new BadRequestException('templateText and Preview are required');
    }

    try {
      return this.templateService.createTemplate(templateDto);
    } catch (error) {
      console.error('error creating template:', error);
      throw new BadRequestException('invalid data');
    }
  }

  @Get('/:id')
  async getUserTemplates(): Promise<Template[]> {
    return this.templateService.getUserTemplates();
  }

  @Get('/:id/preview')
  async getTemplatePreview(
    @Param('id') id: number,
  ): Promise<{ preview: string }> {
    const preview = await this.templateService.getTemplatePreview(id);

    if (!preview) {
      throw new NotFoundException('preview not found');
    }

    return { preview };
  }

  @Put('/:id')
  async updateTemplate(
    @Param('id') id: number,
    @Body() TemplateDto: TemplateDto,
  ): Promise<Template> {
    return this.templateService.updateTemplate(id, TemplateDto);
  }

  @Delete('/:id')
  async deleteTemplate(@Param('id') id: number): Promise<void> {
    return this.templateService.deleteTemplate(id);
  }
}
