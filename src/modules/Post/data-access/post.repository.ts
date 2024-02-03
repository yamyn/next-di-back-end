import TxScopeRepositoryFactory from "@/providers/prisma/tx-scope-repository";

export default class PostRepository extends TxScopeRepositoryFactory((prisma) => prisma.post) {
    
}
