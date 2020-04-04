const {importOrderConfig} = require('listlab-build/eslintrcConfigBuilders');

module.exports = {
  "extends": [
    "../listlab-build/.eslintrc",
    "../listlab-build/ui.eslintrc"
  ],
  "parserOptions": {
    "project": ["./tsconfig.eslint.json"]
  },
  "rules": {
    "import/order": importOrderConfig('ququmber-ui'),
  },
  "overrides": [
    {
      "files": ["sample/**"],
      "rules": {
        "indent": "off",
        "import/order": "off",
      }
    }
  ]
}
