import { PrismaService } from "@/providers/prisma/prisma.client";
import PostRepository from "./data-access/post.repository";
import PostBLService from "./domain/post.service";
import PostEntryPoints from "./entry-points/post.ep";

export type PostDIContainer = {
    prisma: PrismaService,
    repository: PostRepository,
    blService: PostBLService,
    ep: PostEntryPoints,
}