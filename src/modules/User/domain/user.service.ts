import UserRepository from "../data-access/user.repository";
import { UserDIContainer } from "../user.types";

export default class UserBLService {
    private readonly userRepository: UserRepository;

    constructor(ctx: UserDIContainer) {
        this.userRepository = ctx.repository;
    }

    findMany() {
        return this.userRepository.$.findMany();
    }
}