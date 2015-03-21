var express = require('express');
var http = require('http');
var path = require('path');
var elements = require('../api/json/elements.json');

module.exports = function (grunt) {
    grunt.registerTask('server_stub', 'Custom backend stub', function() {
        var done = this.async();
        var backend = express();

        backend.use('/elements', function(req, res, next) {
            var results = elements.slice(0);
            if (req.query.groupReason) {
                results = results.filter(function(item) {
                    return req.query.groupReason.indexOf(item.groupReason) !== -1;
                });
            }
            var limit = req.query.limit || 3;
            var page = req.query.page || 0;
            var start = page * limit < results.length ? page * limit : results.length;
            var end = start + limit < results.length ? start + limit : results.length;
            results = results.slice(start, end);
            return res.end(JSON.stringify(results));
        });
        backend.use('/', function(req, res, next) {
            return res.end("Nothing's here");
        });
        http.createServer(backend).listen(7777).on('close', done);
    });
};