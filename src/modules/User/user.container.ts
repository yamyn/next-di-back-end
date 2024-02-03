import { asClass, asValue, createContainer, Lifetime } from "awilix";
import { ApiDIContainer } from "../types";
import UserRepository from "./data-access/user.repository";
import UserBLService from "./domain/user.service";
import UserEntryPoints from "./entry-points/user.ep";
import { UserDIContainer } from "./user.types";

export default function initUserContainer(ctx: ApiDIContainer) {
    const container = createContainer<UserDIContainer>({
        strict: true,
        injectionMode: 'PROXY'
    });

    container.register('prisma', asValue(ctx.prisma));

    container.register({
        repository: asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
    });

    container.register({
        blService: asClass(UserBLService, { lifetime: Lifetime.SINGLETON }),
    });

    container.register({
        ep: asClass(UserEntryPoints, { lifetime: Lifetime.SINGLETON }),
    });

    return container.cradle
}
