var js = [
    {from: 'backbone', what: 'backbone-min.js'},
    {from: 'underscore', what: 'underscore-min.js'},
    {from: 'requirejs', what: 'require.js'},
    {from: 'requirejs-text', what: 'text.js'},
    {from: 'handlebars/dist', what: 'handlebars.min.js'},
    {from: 'jquery/dist', what: 'jquery.min.js'}
];

var styles = [];

var path = require('path');

var map = function(arr, dest) {
    return arr.map(function(entry) {
        var res = {
            expand: true,
            cwd: path.join('node_modules', entry.from),
            src: entry.what,
            dest: dest
        };
        if (entry.renameTo) {
            res.rename = function(dir) {
                return path.join(dir, entry.renameTo);
            }
        }
        return res;
    })
};

module.exports = {
    js: { files: map(js, 'src/main/webapp/js/libs/ext') },
    css: { files: map(styles, 'src/main/webapp/scss') }
};
