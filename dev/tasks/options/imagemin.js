module.exports = {
    static: {                          // Target
        options: {                       // Target options
            optimizationLevel: 3
        }
    },
    dynamic: {                         // Another target
        files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'src/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}']   // Actual patterns to match
        }]
    }
};