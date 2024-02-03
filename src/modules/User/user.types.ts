import { PrismaService } from "@/providers/prisma/prisma.client";
import UserRepository from "./data-access/user.repository";
import UserService from "./domain/user.service";
import UserEntryPoints from "./entry-points/user.ep";

export type UserDIContainer = {
    prisma: PrismaService,
    repository: UserRepository,
    blService: UserService,
    ep: UserEntryPoints,
}