import { TSESTree as es } from "@typescript-eslint/experimental-utils";
import { createRule,  } from "../utils";

const defaultOptions: Record<string, boolean | string>[] = [];

const rule = createRule({
    name: "no-const-enum",
  defaultOptions,
  meta: {
    docs: {
      description: "Don't use const enum",
      recommended: "error",
    },
    messages: {
      forbidden: "Do not use const with enum declaration.",
    },
    schema: [],
    type: "problem",
  },
  create: (context) => {
    return {
      TSEnumDeclaration: (node: es.TSEnumDeclaration) => {
        const hasConst = Reflect.has(node, "const");

        if (hasConst) {
          context.report({
            node,
            messageId: "forbidden",
          });
        }
      },
    };
  },
});

export default rule;