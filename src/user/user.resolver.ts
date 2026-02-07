import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { UserRole } from '../../prisma/generated/client/enums';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  getMe(@Authorized() user: UserModel) {
    return user;
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    name: 'GetAllUsers',
    description: 'Get all users method',
  })
  async getUsers() {
    return await this.userService.findAll();
  }
}
