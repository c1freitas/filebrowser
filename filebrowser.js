/**
 * Returns an array of files and directories for a given path as a JSON object.
 *
 * TODO: Add walking child directories, and markers for is directory to the returned file object.
 */

var fs = require('fs')
  , path = require('path')
  , normalize = path.normalize
  , sep = path.sep
  , extname = path.extname
  , join = path.join;

var async = require('async');

module.exports = function browse(root, dir, options){
    var options = options || { hidden:false, filter:false };
    var hidden = options.hidden;
    var filter = options.filter;
    console.log('Options ', options);

    // join / normalize from root dir
    var path = normalize(join(root, dir));

    if (!path) { return {}; }

    console.log('processing ', path);
    return function browseFileSystem( callback ) {
        fs.stat(path, function(err, stat){
            if (err && err.code === 'ENOENT') {
                return callback();
            }
            if (err) {
                return callback(err);
            }
            if (!stat.isDirectory()) {
                var re = /(\w+\.\w+)[^/]*$/;
                var filename = path.match(re);
                var file = fileDetails(path.slice(0, path.lastIndexOf('/')), filename[0], stat);
                return callback(null, [file]);
            }
            fs.readdir(path, function(err, files){
                if (err) return callback(err);
                if (!hidden) files = removeHidden(files);
                if (filter) files = files.filter(function(filename, index, list) {
                    var regex = filter;
                    return (filename.search(regex) != -1);
                });
                files.sort();
                processFiles(path, files, callback);

            });
        });
    }

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
 * Allow for recusive directory walking
 */
function processFiles(path, files, cb) {
    var fileStats = [];
    async.each(files, function(file, callback){
        fs.stat(join(path, file), function(err, stat){
            if (err && err.code !== 'ENOENT') return callback(err);
            fileStats.push( fileDetails(path, file, stat) );
            callback();
        });         
    }, function (err) {
        if (err) return cb(err);
        console.log('Finished Processing files');
        cb(null, fileStats);
    } );
}

/**
 * Create a file object to return
 */
function fileDetails( path, filename, fileStat ) {
    return { name: filename, path: path, size: fileStat.size };
}