import { PrismaService } from "@/providers/prisma/prisma.client"
import { PostDIContainer } from "./Post/post.types"
import { UserDIContainer } from "./User/user.types"

export type ApiDIContainer = {
    prisma: PrismaService,
    user: UserDIContainer,
    post: PostDIContainer,
}
