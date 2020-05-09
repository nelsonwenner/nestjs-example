import { UpdateUserDTO } from './../../database/models/user.dto';
import { UserEntity } from './../../database/entities/user.entity';
import { RepositoryService } from './../repository/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(private repoRepository: RepositoryService) {}

  async findByUser(email: string): Promise<any> {
    const user = await this.repoRepository.userRepository.findOne({where: {email: email}});
    return user.toResponseObject();
  }

  async updateUser(email: string, data): Promise<UpdateUserDTO> {
    await this.repoRepository.userRepository.update({ email }, data);
    return await this.findByUser(email);
  }

}
