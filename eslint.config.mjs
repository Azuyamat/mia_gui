import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    packageManager: "npm",
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", "prettier"],
        settings: {
            next: {
                rootDir: "src-next",
            },
        },
    }),
];

export default eslintConfig;
