/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    constent: string

    @Column()
    authorId:number

    @ManyToOne(()=> User, user => user.posts)
    author:User
}