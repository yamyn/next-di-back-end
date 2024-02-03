import { ITXClientDenyList, JsPromise } from '@_prisma/client/runtime/library';
import { PrismaClient, Prisma } from '@_prisma/client';

import PRISMA_CONSTANTS from './prisma.constants';
import { PrismaService, TxClient } from './prisma.client';


export default function TxScopeRepositoryFactory<T>(
  getModel: (prismaClient: PrismaClient | TxClient) => T,
) {
  class TxScopeRepositoryClass {
    prisma: PrismaService

    private txScoped: this;

    get $() {
      return getModel(this.prisma);
    }

    constructor(ctx: { prisma?: PrismaService }) {
      if (!ctx.prisma) {
        throw new Error('Prisma not injected!')
      }

      const self = this;
      this.prisma = ctx.prisma;

      this.txScoped = new Proxy(this, {
        get(target: any, p, receiver) {
          if (p === '$') {
            return getModel(self.db);
          }

          if (p === 'prisma') {
            return self.db;
          }

          if (p === '$') {
            return getModel(self.db);
          }

          return target[p].bind(receiver);
        },
      });
    }

    get db() {
      const tx = this.prisma.txStorage.getStore();

      return tx || this.prisma;
    }

    tx() {
      return this.txScoped;
    }

    $transaction<R>(
      fn: (
        prisma: TxClient) => JsPromise<R>,
      options: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel } = {
        maxWait: PRISMA_CONSTANTS.DEFAULT_MAX_WAIT,
        timeout: PRISMA_CONSTANTS.DEFAULT_TIMEOUT,
      },
    ): JsPromise<R> {
      const tx = this.prisma.txStorage.getStore();
      if (tx) return fn(tx);

      return this.prisma.$tx(fn, options);
    }
  }

  return TxScopeRepositoryClass;
}
