import { IsString, IsArray, IsOptional } from 'class-validator';
import { ProfileResponse } from './user.dto';


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

export interface FindFeedQuery {
  limit?: number;
  offset?: number;
}

export interface FindAllQuery extends FindFeedQuery {
  tag?: string;
  author?: string;
  favorited?: string;
}

export interface ArticleResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  favorited: boolean | null;
  favoritesCount: number;
  author: ProfileResponse;
}
