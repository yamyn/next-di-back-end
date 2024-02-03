import prisma from '@/providers/prisma/prisma.client';

import { asFunction, createContainer, asValue, Lifetime, } from 'awilix';

import UserContainer from './User/user.container';
import PostContainer from './Post/post.container';
import { ApiDIContainer } from './types';

export function createDIContainer() {
    const container = createContainer<ApiDIContainer>({
        strict: true,
        injectionMode: 'PROXY'
    });

    container.register('prisma', asValue(prisma));

    container.register({
        user: asFunction(UserContainer, { lifetime: Lifetime.SINGLETON }),
        post: asFunction(PostContainer, { lifetime: Lifetime.SINGLETON }),
    });

    return container;
}

