import { customAlphabet } from "nanoid";
import { nolookalikesSafe } from "nanoid-dictionary";

export const makeUserId = customAlphabet(nolookalikesSafe, 10);
export const makeGameId = customAlphabet(nolookalikesSafe, 10);
