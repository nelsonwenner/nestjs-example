import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, ManyToMany, JoinTable, ManyToOne, RelationCount } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { UserEntity } from './user.entity';
import * as slugify from 'slug';


@Entity('articles')
export class ArticleEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  slug: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  description: string;

  @Column({nullable: false})
  body: string;

  @CreateDateColumn({type: "timestamp"})
  created_at: Date;

  @CreateDateColumn({type: "timestamp"})
  update_at: Date;

  @BeforeInsert() 
  generateSlug() {
    this.slug = slugify(this.title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  @ManyToMany(type => UserEntity, user => user.favorites, {eager: true})
  @JoinTable()
  favoritesBy: UserEntity[];

  @ManyToOne(type => UserEntity, user => user.articles, {eager: true})
  author: UserEntity;

  @RelationCount((article: ArticleEntity) => article.favoritesBy)
  favoritesCount: number;

  @Column('simple-array')
  tagList: string[];

  toJSON() {
    return classToPlain(this);
  }

  toArticle(user?: UserEntity) {
    let favorited = null;
    if (user) {
      favorited = this.favoritesBy.includes(user);
    }
    const article: any = this.toJSON();
    delete article.favoritedBy;
    return { ...article, favorited };
  }
}
