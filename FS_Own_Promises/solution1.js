const fs = require('fs');
const path = require('path');

const directory_path = __dirname;
const directory_name = path.join(directory_path, 'randomJsonFiles');

// 1. Create a directory.
function create_directory() {
    return new Promise((resolve, reject) => {
        fs.mkdir(directory_name, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();  
            }
        })
    })
}

// 2. make random json files.
function create_files(count) {
    return new Promise((resolve, reject) => {
        let created_count = 0;
        const files = [];
        for (let i = 0; i < count; i++) {
            const file_path = path.join(directory_name, `file${i + 1}.json`)
            files.push(file_path);
            fs.writeFile(file_path, `This is file${i + 1}.`, (err) => {
                if (err) {
                    reject();
                }
                created_count++;

                if (created_count === count) {
                    resolve(files);
                }
            });
        }
    })
}

// 3. Delete those files simultaneously 
function delete_files(files) {
    return new Promise((resolve, reject) => {
        let deleted_count = 0;
        files.map((file) => {
            fs.unlink(file, (err) => {
                if (err) {
                    reject(err);
                }
                deleted_count++;
                if (deleted_count === files.length) {
                    resolve();
                }
            });
        });
    });
}

module.exports = { create_directory, create_files, delete_files };