import type { D1Database } from '@cloudflare/workers-types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

// If this file has no import/export statements (i.e. is a script file),
// convert it into a module by adding an empty export statement.
export {};
