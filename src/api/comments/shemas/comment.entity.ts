import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/post.entity";
import { User } from "../../users/shemas/user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('text')
    public body: string;

    @ManyToOne(type => User)
    @JoinTable()
    author: User;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}