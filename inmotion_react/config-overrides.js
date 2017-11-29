module.exports = (config, env) => {
    const newDevServer = {};
    Object.assign(newDevServer, config.devServer);
    newDevServer.disableHostCheck = true;
    config.devServer = newDevServer;
    console.log(newDevServer);
    return config;
};