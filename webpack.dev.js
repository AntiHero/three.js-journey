const { merge } = require('webpack-merge');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');
const commonConfiguration = require('./webpack.common');

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: portFinderSync.getPort(9000),
    open: true,
    https: false,
    onAfterSetupMiddleware(server) {
      const { port } = server.options;
      const https = server.options.https ? 's' : '';
      const localIp = ip.v4.sync();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );
    },
  },
});
