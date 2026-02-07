import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User, UserRole } from '../../../prisma/generated/client/client';
import { BaseModel } from '../../common/models/base.model';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType({
  description: 'User model',
})
export class UserModel extends BaseModel implements User {
  @Field(() => String, {
    description: 'Name of user model',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Email of user model',
  })
  @Field(() => String)
  email: string;

  @Field(() => String, {
    description: 'Password of user model',
  })
  @Field(() => String)
  password: string;

  @Field(() => String, {
    description: 'Role of user model',
  })
  @Field(() => UserRole)
  role: UserRole;
}
