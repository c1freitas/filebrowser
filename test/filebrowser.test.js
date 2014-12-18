var assert  = require('chai').assert;
var fileBrowser = require('../filebrowser');

describe('Validating File browser', function() {

    var root = './test/test_files/';
    
    it('Does not show hidden files', function (done) {
        var fileSystem = fileBrowser(root, 'example', {hidden:false})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
            });
            assert.equal(2, files.length, 'Should be two files');
            done();
        });
    });
    
    it('Does show hidden files', function (done) {
        var fileSystem = fileBrowser(root, 'example', {hidden:true})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
            });
            assert.equal(3, files.length, 'Should be 3 files, one hidden');
            done();
        });
    });

    it('uses filters', function (done) {
        var fileSystem = fileBrowser(root, 'example', {hidden:false, filter:'.*\.pdf'})
        fileSystem(function( err, files){
            files.map(function(file){
                console.log(file);
                assert.equal('example.pdf', file.name, 'Names should match');
            });
            assert.equal(1, files.length, 'Should be 1 file with pdf extension');
            done();
        });
    });

    it('Single File', function (done) {
        var fileSystem = fileBrowser(root, 'example/example.txt', {hidden:false})
        fileSystem(function( err, files){
            console.log('File count: ' + files.length);
            files.map(function(file){
                console.log(file);
                assert.equal('example.txt', file.name, 'Names should match');
            });
            assert.equal(1, files.length, 'Should be 1 file');
            done();
        });
    });
    
});