module.exports = {
    files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    options: {
        sub: true,
        globals: {
            jQuery: true
        },
        ignores: ['**/libs/**/*.js']
    }
};