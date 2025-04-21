// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/admin";

const rules = {
  $default: {
    allow: {
      $default: "false",
    },
  },
} satisfies InstantRules;

export default rules;
