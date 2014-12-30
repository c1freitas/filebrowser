var assert  = require('chai').assert;
var fileBrowser = require('../filebrowser');

describe('Validating File browser', function() {

    var root = './test/test_files/example/';
    
    it('Does not show hidden files', function (done) {
        var fileSystem = fileBrowser(root, {hidden:false}, function( err, files){
            files.map(function(file){
                //console.log(file);
            });
            assert.equal(3, files.length, 'Should be 3 files');
            done();
        });
    });
    
    it('Does show hidden files', function (done) {
        var fileSystem = fileBrowser(root, {hidden:true}, function( err, files){
            files.map(function(file){
                //console.log(file);
            });
            assert.equal(4, files.length, 'Should be 4 files, one hidden');
            done();
        });
    });

    it('uses filters', function (done) {
        var fileSystem = fileBrowser(root, {hidden:false, filter:'.*\.pdf'}, 
            function( err, files){
                files.map(function(file){
                    //console.log(file);
                    assert.equal('example.pdf', file.name, 'Names should match');
                });
                assert.equal(1, files.length, 'Should be 1 file with pdf extension');
                done();
            });
    });

    it('Single File', function (done) {
        var fileSystem = fileBrowser(root + 'example.txt', {hidden:false}, 
            function( err, files){
                //console.log('File count: ' + files.length);
                files.map(function(file){
                    console.log(file);
                    assert.equal('example.txt', file.name, 'Names should match');
                });
                assert.equal(1, files.length, 'Should be 1 file');
                done();
            });
    });

    it('Show children files', function (done) {
        var fileSystem = fileBrowser(root, {hidden:false}, 
            function( err, files){
                console.log('File count: ' + files.length);
                var hasSubdirectories = false;
                files.map(function(file){
                    console.log(file);
                    if (file.isDirectory) {
                        hasSubdirectories = true;
                        assert.equal(2, file.children.length, 'Should have 2 child files');
                    }
                });
                assert.isTrue(hasSubdirectories, 'Should have Subdirectories');
                done();
            });
    });
    
});