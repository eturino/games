/* 4762144368398d232b141c3ae2a2babd4c6b745f
 * This file is automatically generated by graphql-let. */

import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  viewer?: Maybe<User>;
  game?: Maybe<Game>;
};

export type QueryGameArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  createGame: Game;
  joinGame: Game;
  endGame: Game;
};

export type MutationCreateGameArgs = {
  input: NewGameInput;
};

export type MutationJoinGameArgs = {
  id: Scalars["ID"];
};

export type MutationEndGameArgs = {
  id: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  picture?: Maybe<Scalars["String"]>;
};

export type NewGameInput = {
  name: Scalars["String"];
  lastRoundNumber: Scalars["Int"];
};

export type Game = {
  __typename?: "Game";
  id: Scalars["ID"];
  name: Scalars["String"];
  lastRoundNumber: Scalars["Int"];
  players: Array<User>;
  status: Status;
  phase: Phase;
  round: Round;
};

export type Round = {
  __typename?: "Round";
  id: Scalars["ID"];
  number: Scalars["Int"];
  hands: Array<Hand>;
  cards: Array<Scalars["Int"]>;
};

export type Hand = {
  __typename?: "Hand";
  id: Scalars["ID"];
  playerID: Scalars["ID"];
  roundID: Scalars["ID"];
  cards: Array<Scalars["Int"]>;
};

export enum Status {
  Ready = "READY",
  Playing = "PLAYING",
  Victory = "VICTORY",
  Fail = "FAIL",
}

export enum Phase {
  Preparation = "PREPARATION",
  Playing = "PLAYING",
  Finished = "FINISHED",
}

export type GameFragment = { __typename?: "Game" } & Pick<
  Game,
  "id" | "lastRoundNumber" | "name" | "phase" | "status"
> & { round: { __typename?: "Round" } & RoundFragment; players: Array<{ __typename?: "User" } & PartialFragment> };

export type RoundFragment = { __typename?: "Round" } & Pick<Round, "id" | "cards"> & {
    hands: Array<{ __typename?: "Hand" } & HandFragment>;
  };

export type HandFragment = { __typename?: "Hand" } & Pick<Hand, "id" | "playerID" | "roundID" | "cards">;

export type PartialFragment = { __typename?: "User" } & Pick<User, "id" | "name" | "picture">;

export const HandFragmentDoc = gql`
  fragment Hand on Hand {
    id
    playerID
    roundID
    cards
  }
`;
export const RoundFragmentDoc = gql`
  fragment Round on Round {
    id
    cards
    hands {
      ...Hand
    }
  }
  ${HandFragmentDoc}
`;
export const PartialFragmentDoc = gql`
  fragment Partial on User {
    id
    name
    picture
  }
`;
export const GameFragmentDoc = gql`
  fragment Game on Game {
    id
    lastRoundNumber
    name
    phase
    status
    round {
      ...Round
    }
    players {
      ...Partial
    }
  }
  ${RoundFragmentDoc}
  ${PartialFragmentDoc}
`;
