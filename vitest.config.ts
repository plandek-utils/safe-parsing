import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.{test,spec}.ts"],
		environment: "node",
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			exclude: ["**/*.{test,spec}.ts"],
		},
	},
});
