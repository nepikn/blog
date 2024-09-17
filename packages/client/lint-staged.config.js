import baseConfig from "../../lint-staged.config";

export default {
  "*.{js,jsx}": "eslint",
  ...baseConfig,
};
