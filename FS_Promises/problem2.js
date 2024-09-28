const fs = require('fs').promises;
const path = require('path');


const dir_path = __dirname;
const lipsum_file_path = path.join(dir_path , 'lipsum.txt');
const file_name_path = path.join(dir_path , 'filenames.txt');
const upper_file_path = path.join(dir_path , 'upper.txt');
const lower_file_path = path.join(dir_path , 'lower.txt');
const sorted_file_path = path.join(dir_path , 'sorted.txt');


// 1. Read the given file lipsum.txt
function createFile(){
    return fs.writeFile(file_name_path , "");
}

function readFile(){
    return fs.readFile(lipsum_file_path , 'utf-8')
    .then(lipsum_data => lipsum_data)
    .catch((err) => err);
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
function upperCase(lipsum_data){
    const upper_data = lipsum_data.toUpperCase();
    return fs.writeFile(upper_file_path , upper_data)
    .then(() => {

        return fs.appendFile(file_name_path , `${upper_file_path}\n`)
        .then(() => {
            return upper_data;
        })
        .catch(err => err);
    })
    .catch(err => err);
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
function lowerCase(upper_data){
    let lower_data = upper_data.toLowerCase()
                                .split(".")
                                .map(line => line.trim())
                                .join("\n")
                                .trim();

    return fs.writeFile(lower_file_path , lower_data)
    .then(() => {
        return fs.appendFile(file_name_path , `${lower_file_path}\n`)
        .then(() => {
            return lower_data;
        })
        .catch(err => err);
    })
    .catch(err => err);
}

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
function sorted(lower_data){
    const sorted_data = lower_data.split("\n").sort().join("\n").trim();
    return fs.writeFile(sorted_file_path , sorted_data)
    .then(() => {
        return fs.appendFile(file_name_path , `${sorted_file_path}\n`)
        .then(() => {
            return sorted_data;
        })
        .catch(err => err);
    })
    .catch(err => err);
}

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
function delete_files(){
    return fs.readFile(file_name_path , 'utf-8')
    .then((file_data) => {
        let files = file_data.split("\n").filter(Boolean);
        const promise_deletion = files.map((file) => {
            return fs.unlink(file)
            .then(() => {
                console.log(`File deleted ${file}`);
            })
            .catch(err => err);
        })
        return Promise.all(promise_deletion);
    })
    .catch(err => err)
}

module.exports = {createFile , readFile , upperCase, lowerCase, sorted, delete_files };
