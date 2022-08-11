import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Comment } from '../comments/shemas/comment.entity';
import { User } from '../users/shemas/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column('text', { array: true, nullable: true })
  public images: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @RelationId((post: Post) => post.author)
  public authorId: number;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];
}
