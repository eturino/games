/* 9b2784fe1778febc5e11b76eded389f403035a20
 * This file is automatically generated by graphql-let. */

import * as Apollo from "@apollo/client";
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
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  picture?: Maybe<Scalars["String"]>;
};

export type ViewerQueryVariables = Exact<{ [key: string]: never }>;

export type ViewerQuery = { __typename?: "Query" } & { viewer?: Maybe<{ __typename?: "User" } & UserFragment> };

export type UserFragment = { __typename?: "User" } & Pick<User, "id" | "name" | "picture">;

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    picture
  }
`;
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
  return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
}
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
  return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;
