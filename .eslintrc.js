module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "project": "./tsconfig.json",
                "sourceType": "module",
                "ecmaVersion": "latest"
            },
            "plugins": [
                "@angular-eslint",
                "@typescript-eslint",
            ],
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:@angular-eslint/recommended",
            ],
            "rules": {
                // angular specific rules
                "@angular-eslint/contextual-decorator": "error",
                "@angular-eslint/no-attribute-decorator": "error",
                "@angular-eslint/no-lifecycle-call": "error",
                "@angular-eslint/no-pipe-impure": "error",
                "@angular-eslint/prefer-on-push-component-change-detection": "off",
                "@angular-eslint/use-injectable-provided-in": "error",
                "@angular-eslint/use-lifecycle-interface": "error",
                "@angular-eslint/component-max-inline-declarations": "error",
                "@angular-eslint/no-forward-ref": "error",
                "@angular-eslint/relative-url-prefix": "error",
                "@angular-eslint/use-component-selector": "error",
                "@angular-eslint/use-pipe-transform-interface": "error",
                "@angular-eslint/no-queries-metadata-property": "error",
                "@angular-eslint/sort-ngmodule-metadata-arrays": "error",
                // ts specific rules
                "@typescript-eslint/no-explicit-any": "warn",
                "@typescript-eslint/ban-ts-comment": "warn",
                "@typescript-eslint/ban-types": [
                    "error",
                    {
                        "types": {
                            "MuiSubscription": {
                                "message": "Please use next syntax: fromEvent(eventName).pipe(takeUntil(this.destroy$)).subscribe...",
                            },
                        },
                    },
                ],
                "@typescript-eslint/comma-spacing": "error",
                "@typescript-eslint/member-delimiter-style": ["error",
                    {
                        "multiline": {
                            "delimiter": "semi",
                            "requireLast": true,
                        },
                        "singleline": {
                            "delimiter": "comma",
                            "requireLast": false,
                        },
                    },
                ],
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/no-unnecessary-type-arguments": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-optional-chain": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/require-array-sort-compare": "error",
                "@typescript-eslint/typedef": ["error",
                    {
                        "arrowParameter": false,
                        "memberVariableDeclaration": false,
                    },
                ],
                "@typescript-eslint/explicit-function-return-type": "error",
                "@typescript-eslint/unified-signatures": "error",
                "@typescript-eslint/brace-style": "error",
                "@typescript-eslint/func-call-spacing": "error",
                "@typescript-eslint/no-unused-vars": ["error",
                    {
                        "args": "none",
                    },
                ],
                "@typescript-eslint/return-await": "error",
                "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-function-type": "error",
                "@typescript-eslint/quotes": [
                    "error",
                    "double",
                    {
                        "allowTemplateLiterals": true,
                    },
                ],
                "@typescript-eslint/semi": [
                    "error",
                    "always",
                ],
                "@typescript-eslint/type-annotation-spacing": "error",
                "@typescript-eslint/no-useless-constructor": "error",
                "@typescript-eslint/no-unused-expressions": [
                    "error",
                    {
                        "allowShortCircuit": true,
                        "allowTernary": true,
                    },
                ],
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/switch-exhaustiveness-check": "error",
                "@typescript-eslint/no-dupe-class-members": "error",
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/prefer-reduce-type-parameter": "error",
                "@typescript-eslint/keyword-spacing": "error",
                "@typescript-eslint/no-invalid-void-type": "error",
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/prefer-literal-enum-member": "error",
                "@typescript-eslint/prefer-enum-initializers": "error",
                "@typescript-eslint/no-implicit-any-catch": "error",
                "@typescript-eslint/no-loop-func": "error",
                "@typescript-eslint/no-shadow": [
                    "error",
                    {
                        "hoist": "all",
                        "builtinGlobals": false,
                    },
                ],
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "default",
                        format: ["camelCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "variable",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "property",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "enumMember",
                        format: ["UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                    },
                ],
                "@typescript-eslint/comma-dangle": ["error", {
                    "arrays": "always-multiline",
                    "objects": "only-multiline",
                    "imports": "always-multiline",
                    "exports": "always-multiline",
                    "functions": "always-multiline",
                    "enums": "only-multiline",
                    "generics": "always-multiline",
                    "tuples": "always-multiline",
                }],
                "@typescript-eslint/no-duplicate-imports": "error",
                "@typescript-eslint/space-infix-ops": "error",
                "@typescript-eslint/non-nullable-type-assertion-style": "error",
                "@typescript-eslint/sort-type-union-intersection-members": "error",
                "@typescript-eslint/object-curly-spacing": ["error", "always"],
                "@typescript-eslint/no-meaningless-void-operator": "error",
                "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
                "@typescript-eslint/prefer-regexp-exec": "error",

                // eslint native rules
                "array-callback-return": "error",
                "consistent-return": "error",
                "default-case": "error",
                "arrow-parens": "error",
                "arrow-spacing": "error",
                "no-confusing-arrow": "error",
                "grouped-accessor-pairs": "error",
                "no-constructor-return": "error",
                "no-else-return": [
                    "error",
                    {
                        "allowElseIf": false,
                    },
                ],
                "no-extend-native": "error",
                "no-iterator": "error",
                "no-labels": "error",
                "no-new": "error",
                "no-proto": "error",
                "no-self-compare": "error",
                "no-useless-call": "error",
                "no-useless-concat": "error",
                "curly": "error",
                "eol-last": "error",
                "eqeqeq": [
                    "error",
                    "smart",
                ],
                "guard-for-in": "off",
                "max-len": [
                    "error",
                    {
                        "code": 200
                    }
                ],
                "no-bitwise": "error",
                "no-caller": "error",
                "no-console": [
                    "error",
                    {
                        "allow": [
                            "debug",
                            "log",
                            "warn",
                            "dir",
                            "timeLog",
                            "assert",
                            "clear",
                            "count",
                            "countReset",
                            "group",
                            "groupEnd",
                            "table",
                            "dirxml",
                            "error",
                            "groupCollapsed",
                            "Console",
                            "profile",
                            "profileEnd",
                            "timeStamp",
                            "context",
                        ],
                    },
                ],
                "no-eval": "error",
                "no-extra-bind": "error",
                "no-new-func": "error",
                "no-new-wrappers": "error",
                "no-return-await": "error",
                "no-template-curly-in-string": "error",
                "no-trailing-spaces": "error",
                "no-undef-init": "error",
                "no-const-assign": "error",
                "no-dupe-args": "error",
                "no-dupe-class-members": "error",
                "no-dupe-keys": "error",
                "no-unreachable": "error",
                "valid-typeof": "error",
                "no-mixed-operators": "error",
                "no-tabs": "error",
                "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
                "one-var": ["error", "never"],
                "radix": "error",
                "spaced-comment": "error",
                "require-atomic-updates": "error",
                "default-case-last": "error",
                "no-promise-executor-return": "error",
                "no-unreachable-loop": "error",
                "no-restricted-globals": ["error", "event", "name", "length"],
                "no-empty": ["error", {
                    "allowEmptyCatch": false,
                }],
                "no-inner-declarations": ["error", "both"],
                "generator-star-spacing": "error",
                "no-useless-computed-key": ["error", {
                    "enforceForClassMembers": true,
                }],
                "no-useless-rename": "error",
                "object-shorthand": "error",
                "prefer-arrow-callback": "error",
                "symbol-description": "error",
                "yield-star-spacing": "error",

                // bad recommended rules
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-return": "off",
                "@typescript-eslint/no-floating-promises": "off",
                "@typescript-eslint/restrict-plus-operands": "off",
                "@typescript-eslint/unbound-method": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/restrict-template-expressions": "off",
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/no-unnecessary-type-assertion": "off",
                "@typescript-eslint/no-unsafe-argument": "off",
                "no-useless-escape": "off",
                "ngrx/no-typed-store": "off",
                "ngrx/no-multiple-actions-in-effects": "off",
                "rxjs/no-implicit-any-catch": "off",
            },
        },
        {
            "files": ["*.html"],
            "parser": "@angular-eslint/template-parser",
            "plugins": ["@angular-eslint/template"],
            "rules": {
                "@angular-eslint/template/no-negated-async": "error",
                "@angular-eslint/template/banana-in-box": "error",
                "@angular-eslint/template/no-any": "error",
                "@angular-eslint/template/conditional-complexity": "error",
                "@angular-eslint/template/no-duplicate-attributes": "error",
                "@angular-eslint/template/eqeqeq": "error",
            },
        }],
};
