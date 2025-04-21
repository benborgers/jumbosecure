// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/admin";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.any(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    accounts: i.entity({
      email: i.string().unique(),
      passed_level_1: i.boolean(),
      passed_level_2: i.boolean(),
      passed_level_3: i.boolean(),
    }),
    posts: i.entity({
      title: i.string(),
      body: i.string(),
      published: i.boolean(),
    }),
  },
  links: {
    accountPosts: {
      forward: { on: "posts", has: "one", label: "account" },
      reverse: { on: "accounts", has: "many", label: "posts" },
    },
  },
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
