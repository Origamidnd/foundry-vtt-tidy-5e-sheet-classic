import type { TidyConfig } from './registry.types';

declare global {
  interface CONFIG {
    TIDY5E_CLASSIC: TidyConfig;
  }
}
