import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column({ nullable: true })
    public phoneNumber?: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: true })
    public password: string;

    @Column({ default: false })
    public isStatus: boolean;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts?: Post[];

    @Column({ nullable: true })
    public avatar: string;

    @Column({ nullable: false, default: 'user' })
    public role: string;

    @Column({ default: false })
    public isRegisteredWithGoogle: boolean;
}