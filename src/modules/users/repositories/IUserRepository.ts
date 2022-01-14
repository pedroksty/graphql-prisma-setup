import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

export interface IUserRepository {
  find(): Promise<User[]>
  findById(user_id: string): Promise<User>
  create(data: ICreateUserDTO): Promise<User>
}
