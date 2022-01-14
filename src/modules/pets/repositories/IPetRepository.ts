import { ICreatePetDTO } from '@modules/pets/dtos/ICreatePetDTO'
import { User } from '@modules/users/entities/User'
import { Pet } from '../entities/Pet'

export interface IPetRepository {
  find(): Promise<Pet[]>
  findById(pet_id: string): Promise<Pet>
  create(data: ICreatePetDTO): Promise<Pet>
  findByUserId(user_id: string): Promise<Pet[]>
  findUserByPetId(pet_id: string): Promise<User>
}
