import { Pet } from '@modules/pets/entities/Pet'
import { Field, ID, ObjectType } from 'type-graphql'
import { v4 } from 'uuid'

@ObjectType()
export class User {
  @Field(() => ID)
  public readonly id: string

  @Field()
  public firstname: string

  @Field()
  public lastname: string

  @Field()
  public email: string

  @Field()
  public password: string

  @Field()
  public created_at?: Date

  @Field()
  public updated_at?: Date

  @Field(() => [Pet])
  public pets?: Pet[]

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = v4()
      this.created_at = new Date()
      this.updated_at = new Date()
    }
  }
}
