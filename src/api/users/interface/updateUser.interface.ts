import { Request } from 'express';
import { User } from '../shemas/user.entity';

export interface updateUserInterface extends Request {
    user: User;
}