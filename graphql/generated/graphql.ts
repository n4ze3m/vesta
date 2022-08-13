import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://langford.stepzen.net/api/keeppt/__graphql", {
    method: "POST",
    ...({"headers":{"Authorization":"apikey langford::stepzen.net+1000::7cd83a30b35ab571b850b49d37e9f1579b2a78b479be820d2ff2ce919561e2a5","Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Keeps = {
  __typename?: 'Keeps';
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  is_link?: Maybe<Scalars['Boolean']>;
  keep_type?: Maybe<Scalars['String']>;
  link?: Maybe<Array<Maybe<Link>>>;
  note?: Maybe<Scalars['String']>;
  sort_no?: Maybe<Scalars['ID']>;
  user_id?: Maybe<Scalars['ID']>;
};

export type Link = {
  __typename?: 'Link';
  created_at?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  keep_id?: Maybe<Scalars['ID']>;
  keeps?: Maybe<Keeps>;
  target_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type Mutation = {
  __typename?: 'Mutation';
  deleteKeeps?: Maybe<Response>;
  deleteLink?: Maybe<Link>;
  insertKeeps?: Maybe<Keeps>;
  insertKeepsWithLink?: Maybe<Response>;
  insertLink?: Maybe<Link>;
  moveKeeps?: Maybe<Response>;
  updateKeeps?: Maybe<Response>;
  updateSortWhenDown?: Maybe<Response>;
  updateSortWhenUp?: Maybe<Response>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteKeepsArgs = {
  id: Scalars['ID'];
  keep_type: Scalars['String'];
  user_id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteLinkArgs = {
  id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertKeepsArgs = {
  note: Scalars['String'];
  user_id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertKeepsWithLinkArgs = {
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  is_link: Scalars['Boolean'];
  target_url: Scalars['String'];
  title: Scalars['String'];
  user_id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertLinkArgs = {
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  keep_id: Scalars['ID'];
  target_url: Scalars['String'];
  title: Scalars['String'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationMoveKeepsArgs = {
  current_keep_type: Scalars['String'];
  keep_id: Scalars['ID'];
  new_keep_type: Scalars['String'];
  user_id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateKeepsArgs = {
  id: Scalars['ID'];
  note: Scalars['String'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateSortWhenDownArgs = {
  keep_id: Scalars['ID'];
  keep_type: Scalars['String'];
  newPosition: Scalars['Int'];
  oldPosition: Scalars['Int'];
  user_id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateSortWhenUpArgs = {
  keep_id: Scalars['ID'];
  keep_type: Scalars['String'];
  newPosition: Scalars['Int'];
  oldPosition: Scalars['Int'];
  user_id: Scalars['ID'];
};

/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type Query = {
  __typename?: 'Query';
  getKeeps?: Maybe<Keeps>;
  getKeepsByType?: Maybe<Array<Maybe<Keeps>>>;
  getLinkList?: Maybe<Array<Maybe<Link>>>;
  getLinkUsingKeep_id?: Maybe<Array<Maybe<Link>>>;
  getUserKeeps?: Maybe<Array<Maybe<Keeps>>>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetKeepsArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetKeepsByTypeArgs = {
  id: Scalars['ID'];
  keep_type: Scalars['String'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetLinkUsingKeep_IdArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetUserKeepsArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']>;
};

export type GetKeepsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']>;
}>;


export type GetKeepsQuery = { __typename?: 'Query', getUserKeeps?: Array<{ __typename?: 'Keeps', id: string, is_link?: boolean | null, keep_type?: string | null, note?: string | null, sort_no?: string | null, link?: Array<{ __typename?: 'Link', id: string, image?: string | null, target_url?: string | null, title?: string | null, description?: string | null } | null> | null } | null> | null };

export type GetKeepsWithTypeQueryVariables = Exact<{
  userId: Scalars['ID'];
  keep_type: Scalars['String'];
}>;


export type GetKeepsWithTypeQuery = { __typename?: 'Query', getKeepsByType?: Array<{ __typename?: 'Keeps', id: string, is_link?: boolean | null, keep_type?: string | null, note?: string | null, sort_no?: string | null, link?: Array<{ __typename?: 'Link', id: string, image?: string | null, target_url?: string | null, title?: string | null, description?: string | null } | null> | null } | null> | null };

export type WhenKeepUpMutationVariables = Exact<{
  keep_id: Scalars['ID'];
  newPosition: Scalars['Int'];
  oldPosition: Scalars['Int'];
  user_id: Scalars['ID'];
  keep_type: Scalars['String'];
}>;


export type WhenKeepUpMutation = { __typename?: 'Mutation', updateSortWhenUp?: { __typename?: 'Response', message?: string | null } | null };

export type WhenKeepDownMutationVariables = Exact<{
  keep_id: Scalars['ID'];
  newPosition: Scalars['Int'];
  oldPosition: Scalars['Int'];
  user_id: Scalars['ID'];
  keep_type: Scalars['String'];
}>;


export type WhenKeepDownMutation = { __typename?: 'Mutation', updateSortWhenDown?: { __typename?: 'Response', message?: string | null } | null };

export type DeleteKeepMutationVariables = Exact<{
  id: Scalars['ID'];
  user_id: Scalars['ID'];
  keep_type: Scalars['String'];
}>;


export type DeleteKeepMutation = { __typename?: 'Mutation', deleteKeeps?: { __typename?: 'Response', message?: string | null } | null };

export type InsertKeepMutationVariables = Exact<{
  user_id: Scalars['ID'];
  note: Scalars['String'];
}>;


export type InsertKeepMutation = { __typename?: 'Mutation', insertKeeps?: { __typename?: 'Keeps', created_at?: any | null } | null };

export type UpdateKeepMutationVariables = Exact<{
  id: Scalars['ID'];
  note: Scalars['String'];
}>;


export type UpdateKeepMutation = { __typename?: 'Mutation', updateKeeps?: { __typename?: 'Response', message?: string | null } | null };

export type MoveKeepsMutationVariables = Exact<{
  current_keep_type: Scalars['String'];
  new_keep_type: Scalars['String'];
  user_id: Scalars['ID'];
  keep_id: Scalars['ID'];
}>;


export type MoveKeepsMutation = { __typename?: 'Mutation', moveKeeps?: { __typename?: 'Response', message?: string | null } | null };


export const GetKeepsDocument = `
    query GetKeeps($userId: ID) {
  getUserKeeps(id: $userId) {
    id
    is_link
    keep_type
    note
    sort_no
    link {
      id
      image
      target_url
      title
      description
    }
  }
}
    `;
export const useGetKeepsQuery = <
      TData = GetKeepsQuery,
      TError = unknown
    >(
      variables?: GetKeepsQueryVariables,
      options?: UseQueryOptions<GetKeepsQuery, TError, TData>
    ) =>
    useQuery<GetKeepsQuery, TError, TData>(
      variables === undefined ? ['GetKeeps'] : ['GetKeeps', variables],
      fetcher<GetKeepsQuery, GetKeepsQueryVariables>(GetKeepsDocument, variables),
      options
    );
export const GetKeepsWithTypeDocument = `
    query GetKeepsWithType($userId: ID!, $keep_type: String!) {
  getKeepsByType(id: $userId, keep_type: $keep_type) {
    id
    is_link
    keep_type
    note
    sort_no
    link {
      id
      image
      target_url
      title
      description
    }
  }
}
    `;
export const useGetKeepsWithTypeQuery = <
      TData = GetKeepsWithTypeQuery,
      TError = unknown
    >(
      variables: GetKeepsWithTypeQueryVariables,
      options?: UseQueryOptions<GetKeepsWithTypeQuery, TError, TData>
    ) =>
    useQuery<GetKeepsWithTypeQuery, TError, TData>(
      ['GetKeepsWithType', variables],
      fetcher<GetKeepsWithTypeQuery, GetKeepsWithTypeQueryVariables>(GetKeepsWithTypeDocument, variables),
      options
    );
export const WhenKeepUpDocument = `
    mutation WhenKeepUp($keep_id: ID!, $newPosition: Int!, $oldPosition: Int!, $user_id: ID!, $keep_type: String!) {
  updateSortWhenUp(
    keep_id: $keep_id
    newPosition: $newPosition
    oldPosition: $oldPosition
    user_id: $user_id
    keep_type: $keep_type
  ) {
    message
  }
}
    `;
export const useWhenKeepUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<WhenKeepUpMutation, TError, WhenKeepUpMutationVariables, TContext>) =>
    useMutation<WhenKeepUpMutation, TError, WhenKeepUpMutationVariables, TContext>(
      ['WhenKeepUp'],
      (variables?: WhenKeepUpMutationVariables) => fetcher<WhenKeepUpMutation, WhenKeepUpMutationVariables>(WhenKeepUpDocument, variables)(),
      options
    );
export const WhenKeepDownDocument = `
    mutation WhenKeepDown($keep_id: ID!, $newPosition: Int!, $oldPosition: Int!, $user_id: ID!, $keep_type: String!) {
  updateSortWhenDown(
    keep_id: $keep_id
    newPosition: $newPosition
    oldPosition: $oldPosition
    user_id: $user_id
    keep_type: $keep_type
  ) {
    message
  }
}
    `;
export const useWhenKeepDownMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<WhenKeepDownMutation, TError, WhenKeepDownMutationVariables, TContext>) =>
    useMutation<WhenKeepDownMutation, TError, WhenKeepDownMutationVariables, TContext>(
      ['WhenKeepDown'],
      (variables?: WhenKeepDownMutationVariables) => fetcher<WhenKeepDownMutation, WhenKeepDownMutationVariables>(WhenKeepDownDocument, variables)(),
      options
    );
export const DeleteKeepDocument = `
    mutation DeleteKeep($id: ID!, $user_id: ID!, $keep_type: String!) {
  deleteKeeps(id: $id, user_id: $user_id, keep_type: $keep_type) {
    message
  }
}
    `;
export const useDeleteKeepMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteKeepMutation, TError, DeleteKeepMutationVariables, TContext>) =>
    useMutation<DeleteKeepMutation, TError, DeleteKeepMutationVariables, TContext>(
      ['DeleteKeep'],
      (variables?: DeleteKeepMutationVariables) => fetcher<DeleteKeepMutation, DeleteKeepMutationVariables>(DeleteKeepDocument, variables)(),
      options
    );
export const InsertKeepDocument = `
    mutation InsertKeep($user_id: ID!, $note: String!) {
  insertKeeps(user_id: $user_id, note: $note) {
    created_at
  }
}
    `;
export const useInsertKeepMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertKeepMutation, TError, InsertKeepMutationVariables, TContext>) =>
    useMutation<InsertKeepMutation, TError, InsertKeepMutationVariables, TContext>(
      ['InsertKeep'],
      (variables?: InsertKeepMutationVariables) => fetcher<InsertKeepMutation, InsertKeepMutationVariables>(InsertKeepDocument, variables)(),
      options
    );
export const UpdateKeepDocument = `
    mutation UpdateKeep($id: ID!, $note: String!) {
  updateKeeps(id: $id, note: $note) {
    message
  }
}
    `;
export const useUpdateKeepMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateKeepMutation, TError, UpdateKeepMutationVariables, TContext>) =>
    useMutation<UpdateKeepMutation, TError, UpdateKeepMutationVariables, TContext>(
      ['UpdateKeep'],
      (variables?: UpdateKeepMutationVariables) => fetcher<UpdateKeepMutation, UpdateKeepMutationVariables>(UpdateKeepDocument, variables)(),
      options
    );
export const MoveKeepsDocument = `
    mutation MoveKeeps($current_keep_type: String!, $new_keep_type: String!, $user_id: ID!, $keep_id: ID!) {
  moveKeeps(
    current_keep_type: $current_keep_type
    new_keep_type: $new_keep_type
    user_id: $user_id
    keep_id: $keep_id
  ) {
    message
  }
}
    `;
export const useMoveKeepsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<MoveKeepsMutation, TError, MoveKeepsMutationVariables, TContext>) =>
    useMutation<MoveKeepsMutation, TError, MoveKeepsMutationVariables, TContext>(
      ['MoveKeeps'],
      (variables?: MoveKeepsMutationVariables) => fetcher<MoveKeepsMutation, MoveKeepsMutationVariables>(MoveKeepsDocument, variables)(),
      options
    );