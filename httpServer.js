const http = require('http');
const app = require('./expressApp');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = server;
