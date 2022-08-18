import { Request } from 'express';
import { User } from '../../../api/users/shemas/user.entity';

export interface RequestWithUser extends Request {
    user: User;
}

