find . -name package.json  \( -not -path "*/node_modules/*" \
  -or -path "*/nodejs/node_modules/app/package.json" \) \
  -exec bash -c "npm --prefix \$(dirname {}) install --production --no-audit" \;
