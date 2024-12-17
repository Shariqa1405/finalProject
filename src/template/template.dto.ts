import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';

export class TemplateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  templateText: string;

  @IsOptional()
  @IsString()
  originalText: string;

  @IsNotEmpty()
  @IsObject()
  preview: Record<string, any>;
}
