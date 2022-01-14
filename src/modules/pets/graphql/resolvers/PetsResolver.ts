import { Pet } from '@modules/pets/entities/Pet'
import { PetRepository } from '@modules/pets/infra/prisma/repositories/PetRepository'
import { User } from '@modules/users/entities/User'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'

const petsRepository = new PetRepository()

@Resolver(Pet)
export class PetsResolvers {
  @Query(() => [Pet])
  async getPets(): Promise<Pet[]> {
    return petsRepository.find()
  }

  @Query(() => Pet)
  async getPetById(
    @Arg('pet_id') pet_id: string

  ): Promise<Pet> {
    return petsRepository.findById(pet_id)
  }

  @Mutation(() => Pet)
  async createPet(

    @Arg('name') name: string,
    @Arg('user_id') user_id: string

  ): Promise<Pet> {
    return petsRepository.create({
      name,
      user_id
    })
  }

  @FieldResolver(() => User)
  async user(
    @Root() root: Pet
  ): Promise<User> {
    return petsRepository.findUserByPetId(root.id)
  }
}
