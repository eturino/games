import { IClaims } from "@auth0/nextjs-auth0/dist/session/session";
import { User } from "../__generated__/lib/graphql-schema";

export function iClaimsToUser(iClaims: IClaims): User {
  return { id: iClaims.sub, name: iClaims.name || iClaims.nickname || iClaims.email, picture: iClaims.picture || null };
}
