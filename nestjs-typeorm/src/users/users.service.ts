/* eslint-disable prettier/prettier */
import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user'
import { UpdateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor( 
        @InjectRepository(User) private userRepository: Repository <User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) {}

    //? Funcion para crear usuarios
    async createUser(user:CreateUserDto){

       const userFound = await this.userRepository.findOne({
            where:{
                username:user.username
            }
       }) 
       if(userFound) return new HttpException('Usuario existente', HttpStatus.CONFLICT) 

       const newUser = this.userRepository.create(user)
       return this.userRepository.save(newUser)
    }

    //?Funcion para Obtener todos los usuarios
    getUsers() {
        return this.userRepository.find()
    }

    //?Funcion para Obtener un usuario por id
    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where:{
                id
            },relations:['posts','profile']
        })
        if(!userFound){
            return new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
        }
        return userFound
    }

    //?Funcion para Eleiminar un usuario
    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id })
        if(result.affected === 0){
            return new HttpException("Usuario no encontrado",HttpStatus.NOT_FOUND)
        }
    }

    //?Funcion para modificar a un usuario
    async updateUser(id:number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({where:{id}})
        if(!userFound){
            return new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
        }
        
        const updateUser = Object.assign(userFound,user)
        return this.userRepository.save(updateUser)
    }

    async createProfile(id:number,profile:createProfileDto){
      const userFound = await this.userRepository.findOne({where:{id}})

      if(!userFound){
        return new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
        }

        const newProfile = this.profileRepository.create(profile)

        const saveProfile = await this.profileRepository.save(newProfile)
        
        userFound.profile =saveProfile

        return this.userRepository.save(userFound)


    }
}