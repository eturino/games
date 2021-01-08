import { User } from "./lib/graphql-schema";

export declare global {
  interface Window {
    __user?: User | null;
  }
}
