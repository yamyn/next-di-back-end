import TxScopeRepositoryFactory from "@/providers/prisma/tx-scope-repository";

export default class UserRepository extends TxScopeRepositoryFactory((prisma) => prisma.user) {
    
}
