import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './auth.user';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthUser => {
        const { user } = ctx.switchToHttp().getRequest();
        if (!user) {
            return null;
        }
        const userId = user.id;
        const username = user.username;
        return {
            userId,
            username,
        };
    },
);
