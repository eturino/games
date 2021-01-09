import { customAlphabet } from "nanoid";
import { nolookalikesSafe } from "nanoid-dictionary";

export const makeUserId = customAlphabet(nolookalikesSafe, 5);
export const makeGameId = customAlphabet(nolookalikesSafe, 5);
