import { ICreatePetDTO } from '@modules/pets/dtos/ICreatePetDTO'
import { Pet } from '@modules/pets/entities/Pet'
import { IPetRepository } from '@modules/pets/repositories/IPetRepository'
import { User } from '@modules/users/entities/User'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PetRepository implements IPetRepository {
  async findUserByPetId(pet_id: string): Promise<User> {
    const pet = await prisma.pet.findUnique({
      where: { id: pet_id },
      include: {
        user: true
      }
    })

    return pet.user
  }

  async findByUserId(user_id: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        user_id
      }
    })

    return pets
  }

  async find(): Promise<Pet[]> {
    const pets = await prisma.pet.findMany()

    return pets
  }

  async findById(pet_id: string): Promise<Pet> {
    const pet = await prisma.pet.findUnique({
      where: { id: pet_id }
    })

    return pet
  }

  async create({ name, user_id }: ICreatePetDTO): Promise<Pet> {
    const pet = new Pet({
      name,
      user_id
    })

    const createdPet = await prisma.pet.create({
      data: {
        id: pet.id,
        name: pet.name,
        user_id: pet.user_id
      }
    })

    return createdPet
  }
}

export { PetRepository }
