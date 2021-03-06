/* 9e079797c0763628802d1e2cce6e6523962c0450
 * This file is automatically generated by graphql-let. */

export declare type Maybe<T> = T | null;
export declare type Exact<
  T extends {
    [key: string]: unknown;
  }
> = {
  [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]?: Maybe<T[SubKey]>;
  };
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]: Maybe<T[SubKey]>;
  };
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};
export declare type Query = {
  __typename?: "Query";
  viewer?: Maybe<User>;
};
export declare type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  picture?: Maybe<Scalars["String"]>;
};
export declare type UserFragment = {
  __typename?: "User";
} & Pick<User, "id" | "name" | "picture">;
export declare const UserFragmentDoc: import("@apollo/client").DocumentNode;
