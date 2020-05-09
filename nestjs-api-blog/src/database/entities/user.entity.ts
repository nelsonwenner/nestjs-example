import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, CreateDateColumn } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';


@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({unique: true})
  email: string;
  
  @Column()
  @Exclude()
  password: string;

  @Column({default: ''})
  bio: string

  @Column({default: null, nullable: true})
  image: string | null;

  @CreateDateColumn({type: "timestamp"})
  created_at: Date;

  @CreateDateColumn({type: "timestamp"})
  update_at: Date;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
  }
  
  async comparePassword(attempt: string) {
      return await bcrypt.compare(attempt, this.password);
  }

  toJSOM() {
      return classToPlain(this);
  }

  //@OneToMany(() => Articles, article => article.user)
  //articles: Articles[]
}
