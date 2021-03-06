/* 9b2784fe1778febc5e11b76eded389f403035a20
 * This file is automatically generated by graphql-let. */

import * as Apollo from "@apollo/client";
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
export declare type ViewerQueryVariables = Exact<{
  [key: string]: never;
}>;
export declare type ViewerQuery = {
  __typename?: "Query";
} & {
  viewer?: Maybe<
    {
      __typename?: "User";
    } & UserFragment
  >;
};
export declare type UserFragment = {
  __typename?: "User";
} & Pick<User, "id" | "name" | "picture">;
export declare const UserFragmentDoc: Apollo.DocumentNode;
export declare const ViewerDocument: Apollo.DocumentNode;
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
export declare function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>
): Apollo.QueryResult<
  ViewerQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>
): Apollo.QueryTuple<
  ViewerQuery,
  Exact<{
    [key: string]: never;
  }>
>;
export declare type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export declare type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export declare type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;
