import { UserEntity } from './../../database/entities/user.entity';
import { UpdateUserDTO } from './../../database/models/user.dto';
import { RepositoryService } from './../repository/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(private repoRepository: RepositoryService) {}

  async findByUser(username: string): Promise<any> {
    const user = await this.repoRepository.userRepository.findOne({where: {username: username}});
    return user.toResponseObject();
  }

  async updateUser(username: string, data): Promise<UpdateUserDTO> {
    await this.repoRepository.userRepository.update({ username }, data);
    return await this.findByUser(username);
  }

  async followUser(currentUser: UserEntity, username: string) {
    const user = await this.repoRepository.userRepository.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await this.repoRepository.userRepository.save(user);
    return user.toProfile(currentUser);
  }

  async unfollowUser(currentUser: UserEntity, username: string) {
    const user = await this.repoRepository.userRepository.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers = user.followers.filter(follower => follower !== currentUser);
    await this.repoRepository.userRepository.save(user);
    return user.toProfile(currentUser);
  }

}
