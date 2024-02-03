import { validate } from "@/helpers/validate.helper";
import { CreatePostDto } from "../domain/dto/create-post.dto";
import PostBLService from "../domain/post.service";
import { PostDIContainer } from "../post.types";

export default class PostEntryPoints {
    private readonly postService: PostBLService;

    constructor(ctx: PostDIContainer) {
        this.postService = ctx.blService;
    }

    findMany() {
        return this.postService.findMany();
    }

    create(postDto: any) {
        const data = validate(CreatePostDto, postDto);

        return this.postService.create(data);
    }
}