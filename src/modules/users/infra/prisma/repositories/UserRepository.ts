import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/entities/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserRepository implements IUserRepository {
  async findById(user_id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: user_id }
    })

    return user
  }

  async create({ email, firstname, lastname, password }: ICreateUserDTO): Promise<User> {
    const user = new User({
      email,
      firstname,
      lastname,
      password
    })

    const createdUser = await prisma.user.create({
      data: user
    })

    return createdUser
  }

  async find(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users
  }
}

export { UserRepository }
