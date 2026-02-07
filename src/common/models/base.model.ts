import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Basid fields model',
  isAbstract: true,
})
export class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updateddAt: Date;
}
