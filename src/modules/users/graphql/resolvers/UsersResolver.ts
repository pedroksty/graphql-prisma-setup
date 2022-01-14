import { Pet } from '@modules/pets/entities/Pet'
import { PetRepository } from '@modules/pets/infra/prisma/repositories/PetRepository'
import { User } from '@modules/users/entities/User'
import { UserRepository } from '@modules/users/infra/prisma/repositories/UserRepository'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'

const usersRepository = new UserRepository()
const petsRepository = new PetRepository()

@Resolver(User)
export class UsersResolvers {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return usersRepository.find()
  }

  @Query(() => User)
  async getUserById(
    @Arg('user_id') user_id: string

  ): Promise<User> {
    return usersRepository.findById(user_id)
  }

  @Mutation(() => User)
  async createUsers(

    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('password') password: string

  ): Promise<User> {
    return usersRepository.create({
      firstname,
      lastname,
      email,
      password
    })
  }

  @FieldResolver(() => [Pet])
  async pets(
    @Root() root: User
  ): Promise<Pet[]> {
    return petsRepository.findByUserId(root.id)
  }
}
