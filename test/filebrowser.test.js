var assert  = require('chai').assert;
var fileBrowser = require('../filebrowser');

describe('Validating File browser', function() {

    var root = './test/';
    
    it('Does not show hidden files', function (done) {
        var fileSystem = fileBrowser(root, 'finance', {hidden:false})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
            });
            done();
        });
    });
    
    it('Does show hidden files', function (done) {
        var fileSystem = fileBrowser(root, 'finance', {hidden:true})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
            });
            done();
        });
    });

    it('uses filters', function (done) {
        var fileSystem = fileBrowser(root, 'finance', {hidden:false, filter:'.*\.pdf'})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
            });
            done();
        });
    });

    it('Single File', function (done) {
        var fileSystem = fileBrowser(root, 'finance/example.txt', {hidden:false, filter:'.*\.pdf'})
        fileSystem(function( err, files){
            console.log('File count: ' + files.length);
            files.map(function(file){
                console.log(file);
            });
            done();
        });
    });
    
});