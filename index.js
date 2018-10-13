var through = require('through2');

module.exports = {
    prepend: prepend
}

function prepend(text) {
    
    // creating a stream through which each file will pass
    let stream = through.obj(function (file, enc, cb) {
        //console.log(file.contents.toString());
        
        if (file.isBuffer()) {
            file.contents = new Buffer(text + "\n\n" + file.contents.toString());
        }

        if (file.isStream()) {
            throw new Error('stream files are not supported for insertion, they must be buffered');
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    });

    // returning the file stream
    return stream;    
}