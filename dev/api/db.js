module.exports = {
    run: function() {
        var path = require('path');
        var base = path.join(__dirname, 'json');
        return {
            elements: require(base + '/elements.json')
        }
    }
};