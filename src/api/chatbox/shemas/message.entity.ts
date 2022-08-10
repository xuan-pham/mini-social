import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/shemas/user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    public is: number;

    @Column()
    public content: string;

    @ManyToOne(() => User)
    public author: User

}