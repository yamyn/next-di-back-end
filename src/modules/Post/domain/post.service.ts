import { Prisma } from "@_prisma/client";
import PostRepository from "../data-access/post.repository";
import { PostDIContainer } from "../post.types";

export default class PostBLService {
    private readonly postRepository: PostRepository;

    constructor(ctx: PostDIContainer) {
        this.postRepository = ctx.repository;
    }

    findMany() {
        return this.postRepository.$.findMany();
    }

    create(postDto: Prisma.PostUncheckedCreateInput) {
        return this.postRepository.$.create({
            data: postDto,
        })
    }
}