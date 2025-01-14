export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-html/astro",
    "stylelint-prettier",
  ],
  ignoreFiles: ["dist/**"],
};
