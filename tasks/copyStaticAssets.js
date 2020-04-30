const shell = require('shelljs');
const path = require('path');

shell.cp("-R", path.resolve(__dirname, "../server/public/css"), path.resolve(__dirname, "../dist/public"));
shell.cp("-R", path.resolve(__dirname, "../server/public/images"), path.resolve(__dirname, "../dist/public"));
shell.cp("-R", path.resolve(__dirname, "../server/middleware/graphql/*.graphql"), path.resolve(__dirname, "../dist/middleware/graphql"));


