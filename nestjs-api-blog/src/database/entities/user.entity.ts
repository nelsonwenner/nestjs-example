import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';


@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
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

  toResponseObject() {
    const { id, username, email, bio, followers, following, created_at, update_at } = this;
    return { id, username, email, bio, followers, following, created_at, update_at }
  }
  
  toProfile(user: UserEntity) {
    delete user.password;
    const following = this.followers.includes(user);
    const profile: any = this.toResponseObject();
    delete profile.followers;
    return { ...profile, following };
  }

  @ManyToMany(type => UserEntity, user => user.following)
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany(type => UserEntity, user => user.followers)
  following: UserEntity[];
}
