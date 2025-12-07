import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import path from "path";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],

    /**
     * react, react-dom 등은 peerDependencies로 두고 external 처리
     */
    external: ["react", "react-dom"],

    plugins: [
      resolve({
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      }),
      commonjs(),
      vanillaExtractPlugin({
        outputCss: true,
      }),
      typescript({
        tsconfig: path.resolve("./tsconfig.json"),
      }),
    ],
  },

  /**
   * 2) .d.ts 번들
   */
  {
    input: "dist/types/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
