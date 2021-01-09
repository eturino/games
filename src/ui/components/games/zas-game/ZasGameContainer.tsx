import React, { FunctionComponent, useState } from "react";
import { UserFragment } from "../../../../lib/graphql/client/fragments/user.graphql";
import { initialGame } from "../../../../models/zas-game/game";
import { GameRunner } from "../../../../models/zas-game/runner";
import { makeUserId } from "../../../../utils/ids";
import { ZasGame } from "./ZasGame";

const makeUser = (): UserFragment => {
  const id = makeUserId();
  return { id, name: `Some User ${id}` };
};

const maxPoints = 20;
const users = [makeUser(), makeUser()];

const ZasGameContainer: FunctionComponent = () => {
  const [runner] = useState(new GameRunner(initialGame({ users, maxPoints })));
  return <ZasGame runner={runner} />;
};

export default ZasGameContainer;
