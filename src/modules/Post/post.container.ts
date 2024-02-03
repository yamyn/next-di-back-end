import { asClass, asValue, createContainer, Lifetime } from "awilix";
import { ApiDIContainer } from "../types";
import PostRepository from "./data-access/post.repository";
import PostBLService from "./domain/post.service";
import PostEntryPoints from "./entry-points/post.ep";
import { PostDIContainer } from "./post.types";

export default function initPostContainer(ctx: ApiDIContainer) {
    const container = createContainer<PostDIContainer>({
        strict: true,
        injectionMode: 'PROXY'
    });

    container.register('prisma', asValue(ctx.prisma));

    container.register({
        repository: asClass(PostRepository, { lifetime: Lifetime.SINGLETON }),
    });

    container.register({
        blService: asClass(PostBLService, { lifetime: Lifetime.SINGLETON }),
    });

    container.register({
        ep: asClass(PostEntryPoints, { lifetime: Lifetime.SINGLETON }),
    });

    return container.cradle
}
