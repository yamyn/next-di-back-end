const PRISMA_CONSTANTS = {
  DEFAULT_MAX_WAIT: 20 * 1000, // ms
  DEFAULT_TIMEOUT: 30 * 1000, // ms
  HANDLE_SLOW_OP_FROM: 7 * 1000, // ms
} as const;

export default PRISMA_CONSTANTS;
