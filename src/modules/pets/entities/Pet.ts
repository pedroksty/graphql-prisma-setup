import { Field, ID, ObjectType } from 'type-graphql'
import { v4 } from 'uuid'
import { User } from '../../users/entities/User'

@ObjectType()
export class Pet {
  @Field(() => ID)
  public readonly id: string

  @Field()
  public name: string

  @Field(() => User)
  public user?: User

  @Field()
  public user_id: string

  @Field()
  public created_at?: Date

  @Field()
  public updated_at?: Date

  constructor(props: Omit<Pet, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = v4()
      this.created_at = new Date()
      this.updated_at = new Date()
    }
  }
}
