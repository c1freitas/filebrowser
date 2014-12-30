/**
 * Returns an array of files and directories for a given path as a JSON object.
 */

var fs = require('fs')
  , path = require('path')
  , normalize = path.normalize
  , sep = path.sep
  , extname = path.extname
  , join = path.join;

var async = require('async');

module.exports = function browse(path, options, callback) {
    "use strict";
    var options = options || { hidden:false, filter:false };
    var hidden = options.hidden;
    var filter = options.filter;
    console.log('Options ', options);

    if (!path) { return {}; }

    console.log('processing ', path);

    function wallkFiles(err, files) {
        if (err) return callback(err);
        if (!hidden) files = removeHidden(files);
        if (filter) files = files.filter(function(filename, index, list) {
            var regex = filter;
            return (filename.search(regex) != -1);
        });
        files.sort();

        var fileResults = [];
        async.each(files, function(file, next){
            fs.stat(join(path, file), function(err, stat){
                if (err && err.code !== 'ENOENT') return next(err);
                if (stat.isDirectory()) {
                    var dirDetails =  fileDetails(path, file, stat); 
                    browse(join(path, file), options, function(err, results) {
                        if (err) {
                          return next(err);
                        }
                        dirDetails.children = results;
                        fileResults.push(dirDetails);
                        next();
                      });
                } else {
                    fileResults.push( fileDetails(path, file, stat) );
                    next();
                }
            });         
        }, function (err) {
            console.log('Finished Processing files');
            callback(err, fileResults);
        } );

    }

    fs.stat(path, function(err, stat){
        if (!stat.isDirectory()) {
            var re = /(\w+\.\w+)[^/]*$/;
            var filename = path.match(re);
            var file = fileDetails(path.slice(0, path.lastIndexOf('/')), filename[0], stat);
            return callback(null, [file]);
        }

        fs.readdir(path, wallkFiles);
    });

};

/**
 * Filter to remove hidden files (starts with a '.')
 */
function removeHidden(files) {
  return files.filter(function(file){
    return '.' != file[0];
  });
}

/**
 * Create a file object to return
 */
function fileDetails( path, filename, fileStat ) {
    return { name: filename, path: path, size: fileStat.size, isDirectory: fileStat.isDirectory() };
}