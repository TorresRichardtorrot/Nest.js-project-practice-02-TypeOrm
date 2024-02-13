/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private userService: UsersService
    ){}

    async createPost(post: CreatePostDto){
        const userFonud = await this.userService.getUser(post.authorId)

        if(!userFonud){
            return new HttpException("usuario no encontrado",HttpStatus.NOT_FOUND)
        }

        const newPost = this.postRepository.create(post)

        return this.postRepository.save(newPost)
    }

    getPosts(){
       return this.postRepository.find({
        relations:['author']
       })
    }

}
