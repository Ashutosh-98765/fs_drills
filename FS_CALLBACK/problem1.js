const fs = require('fs');
const path = require('path');
const directory_path = __dirname;
// console.log(__dirname);
const directory_name = path.join(directory_path, 'randomJsonFiles');
// 1. Create a directory.
const create_directory = (callback) => {

    fs.mkdir(directory_name, { recursive: true }, (err) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, "Directory created successfully");
        }
    });
}

// 2. Create random JSON files
const create_files = (no_of_files, callback) => {
    let count = 0;
    for (let i = 0; i < no_of_files; i++) {
        const file_path = path.join(directory_name, `file${i + 1}.json`);
        fs.writeFile(file_path, `This is file${i + 1}.`, (err) => {
            if (err) {
                callback(err);
            }
            count++;
            if (count === no_of_files) {
                callback(null, "Files created successfully");
            }
        })
    }
}

//   3. Delete those files simultaneously 
const delete_files = (callback) => {
    let count = 0;
    fs.readdir(directory_name, (err, files) => {
        if (err) {
            callback(err);
        }
        if (files.length === 0) {
            callback(err);
        }

        files.forEach((file) => {
            let file_path = path.join(directory_name, file);
            fs.unlink(file_path, (err) => {
                if (err) {
                    callback(err);
                }
                count++;
                if (count == files.length) {
                    callback(null, "Files Deleted Successfully");
                }
            })
        });
    });
}

module.exports = { create_directory, create_files, delete_files };