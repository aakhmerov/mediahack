module.exports = {
    server: {
        options: {
            port: 9000,
            base: 'src/main/webapp',
            keepalive: false,
            open: 'http://localhost:9000',
            middleware: function (connect, options) {
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];
                options.base.forEach(function(base) {
                    middlewares.push(connect.static(base));
                });
                var directory = options.directory || options.base[options.base.length - 1];
                middlewares.push(connect.directory(directory));
                return middlewares;
            }
        },
        proxies: [
            {
                context: '/api',
                host: 'localhost',
                port: 7777,
                https: false,
                xforward: false,
                rewrite: {
                    '^/api': ''
                }
            }
        ]
    }
};