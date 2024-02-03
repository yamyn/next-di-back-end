import UserBLService from "../domain/user.service";
import { UserDIContainer } from "../user.types";

export default class UserEntryPoints {
    private readonly userService: UserBLService;

    constructor(ctx: UserDIContainer) {
        this.userService = ctx.blService;
    }

    findMany() {
        return this.userService.findMany();
    }
}