const gh = require('gh-pages');
const path = require('path');
gh.publish(path.join(process.cwd()));
