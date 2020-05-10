import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDTO {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
  
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;
}

export interface AuthPayload {
  id: string;
  username: string;
  email: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;
}

export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}
