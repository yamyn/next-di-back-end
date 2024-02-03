import { ITXClientDenyList, JsPromise } from '@_prisma/client/runtime/library';
import { Prisma, PrismaClient } from '@_prisma/client';

import { AsyncLocalStorage } from 'node:async_hooks';


import PRISMA_CONSTANTS from './prisma.constants';

export type TxClient = Omit<PrismaClient, ITXClientDenyList>;

export class PrismaService extends PrismaClient {
  readonly txStorage = new AsyncLocalStorage<TxClient>();

  constructor() {
    super({
      log: ['info'],
    });

    this.onModuleInit();
  }

  async onModuleInit() {
    await this.$connect();
  }

  $tx<R>(
    fn: (
      prisma: TxClient) => JsPromise<R>,
    options: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel } = {
      maxWait: PRISMA_CONSTANTS.DEFAULT_MAX_WAIT,
      timeout: PRISMA_CONSTANTS.DEFAULT_TIMEOUT,
    },
  ): JsPromise<R> {
    return this.$transaction(async (tx) => {
      return this.txStorage.run(tx, () => fn(tx));
    }, options);
  }

  initTxOrUseExist<R>(
    fn: (prisma: TxClient) => JsPromise<R>,
    tx?: TxClient,
    options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel },
  ) {
    if (tx) {
      return fn(tx);
    }

    return this.$tx(fn, options);
  }
}

const globalForPrisma = global as unknown as { prisma: PrismaService }

export const prisma = globalForPrisma.prisma || new PrismaService()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;