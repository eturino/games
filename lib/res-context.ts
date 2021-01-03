import { IncomingMessage, ServerResponse } from "http";

export type ResContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};
