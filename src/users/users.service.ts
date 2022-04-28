import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserModel } from './users.interface';
import { PostsService } from '../../dist/posts/posts.service';

@Injectable()
export class UsersService {
  private users: Array<UserModel> = [];
  private readonly logger = new Logger(PostsService.name);
  public findAll(): Array<UserModel> {
    return this.users;
  }
  public findOne(id: string): UserModel {
    const user: UserModel = this.users.find((users) => users.id === id);
    if (!user) {
      throw new NotFoundException('user not found.');
    }
    return user;
  }
  public create(user: UserModel): UserModel {
    const userExists: boolean = this.users.some(
      (item) => item.name === user.name,
    );
    if (userExists) {
      throw new UnprocessableEntityException('user already exists.');
    }
    const newUser: UserModel = {
      id: `${new Date().valueOf()}`,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  public delete(id: string): void {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found.');
    }
    this.users.splice(index, 1);
  }

  public update(id: string, user: UserModel): UserModel {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found.');
    }
    const nameExists: boolean = this.users.some(
      (item) => item.name === user.name && item.id !== id,
    );
    if (nameExists) {
      throw new UnprocessableEntityException('user name already exists.');
    }
    const updateUser: UserModel = {
      ...user,
      id,
    };
    this.users[index] = updateUser;
    return updateUser;
  }
}
