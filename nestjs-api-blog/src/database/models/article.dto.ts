import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  description: string;

  @IsArray()
  tagList: string[];
}

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tagList: string[];
}