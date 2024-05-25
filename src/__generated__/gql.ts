/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Login($email: String!) {\n  users(where: {email: {_eq: $email}}) {\n    password\n  }\n}": types.LoginDocument,
    "mutation NEW_USER($email: String!, $name: String!, $password: String!) {\n  insert_users_one(object: {email: $email, name: $name, password: $password}) {\n    id\n  }\n}": types.New_UserDocument,
    "query MyQuery {\n  users {\n    email\n    id\n    name\n    password\n  }\n}\n": types.MyQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Login($email: String!) {\n  users(where: {email: {_eq: $email}}) {\n    password\n  }\n}"): (typeof documents)["query Login($email: String!) {\n  users(where: {email: {_eq: $email}}) {\n    password\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation NEW_USER($email: String!, $name: String!, $password: String!) {\n  insert_users_one(object: {email: $email, name: $name, password: $password}) {\n    id\n  }\n}"): (typeof documents)["mutation NEW_USER($email: String!, $name: String!, $password: String!) {\n  insert_users_one(object: {email: $email, name: $name, password: $password}) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MyQuery {\n  users {\n    email\n    id\n    name\n    password\n  }\n}\n"): (typeof documents)["query MyQuery {\n  users {\n    email\n    id\n    name\n    password\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;