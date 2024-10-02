const fs = require('fs');
const path = require('path');


const dir_path = __dirname;
const lipsum_file_path = path.join(dir_path, 'lipsum.txt');
const file_name_path = path.join(dir_path, 'filenames.txt');
const upper_file_path = path.join(dir_path, 'upper.txt');
const lower_file_path = path.join(dir_path, 'lower.txt');
const sorted_file_path = path.join(dir_path, 'sorted.txt');



// function to read files
function readFile(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf-8', (err, file_data) => {
            if (err) {
                reject(err);
            }
            else{
            resolve(file_data);
            }
        })
    })
}

// function to append file_path to filename file
function appendFile(file_name_path, file_path) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file_name_path, `${file_path}\n`, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

// function to create filename file to store all filenames
function createFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_name_path, "", (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}


// 1. Read the given file lipsum.txt
function read_lipsum_file() {
    return new Promise((resolve, reject) => {
        readFile(lipsum_file_path)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
function upperCase() {
    return new Promise((resolve, reject) => {
        readFile(lipsum_file_path)
            .then((lipsum_data) => {
                const upper_data = lipsum_data.toUpperCase();
                return new Promise((resolve, reject) => {
                    fs.writeFile(upper_file_path, upper_data, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    })
                })
            })
            .then(() => {
                appendFile(file_name_path, upper_file_path)
            })
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
function lowerCase() {
    return new Promise((resolve, reject) => {
        readFile(upper_file_path)
            .then((upper_data) => {
                const lower_data = upper_data.toLowerCase()
                                   .split(".")
                                   .map((line) => line.trim())
                                   .join("\n")
                                   .trim();

                return new Promise((resolve, reject) => {
                    fs.writeFile(lower_file_path, lower_data, (err) => {
                        if (err) {
                            (reject(err));
                        }
                        else {
                            resolve();
                        }
                    });
                });
            })
            .then(() => {
                return appendFile(file_name_path, lower_file_path)
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
function sorted() {
    return new Promise((resolve, reject) => {
        readFile(lower_file_path)
            .then((lower_data) => {
                const sorted_data = lower_data.split("\n")
                                    .sort()
                                    .join("\n")
                                    .trim();

                return new Promise((resolve, reject) => {
                    fs.writeFile(sorted_file_path, sorted_data, (err) => {
                        if (err) {
                            (reject(err))
                        }
                        else {
                            resolve();
                        }
                    });
                });
            })
            .then(() => {
                return appendFile(file_name_path, sorted_file_path)
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
function delete_files() {
    return new Promise((resolve, reject) => {
        readFile(file_name_path)
            .then((filenames) => {
                const files = filenames.split("\n").filter(Boolean);
                let deleted_count = 0;
                files.forEach(file => {
                    fs.unlink(file, (err) => {
                        if (err) {
                            reject(err)
                        };
                        deleted_count++;
                        if (deleted_count == files.length) {
                            resolve();
                        }
                    })
                });
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = { read_lipsum_file, createFile, upperCase, lowerCase, sorted, delete_files };