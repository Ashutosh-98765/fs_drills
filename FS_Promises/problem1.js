const fs = require('fs').promises;
const path = require('path');

const directory_path = __dirname;
// console.log(directory_path);
const directory_name = path.join(directory_path , 'randomJsonFiles');

// 1. Create a directory.
function create_directory(){
    return fs.mkdir(directory_name , {recursive : true});
}

// 2. make random json files.
function create_files(count){

    let paths = [];
    let promises = [];
    for(let i = 1 ; i <= count ; i++){
        const file_path = path.join(directory_name , `file${i}.json`);
        let pro = fs.writeFile(file_path , `this is file${i}.`);
        paths.push(file_path);
        promises.push(pro);
    }
    return Promise.all(promises).then(() => {
        return paths;
    })
    .catch(err => err)
}

// 3. Delete those files simultaneously 
function delete_files(files){

    let delete_promises = files.map((file) => {
        return fs.unlink(file)
        .then(() => {
            console.log(`File delete ${file}`);
        })
        .catch((err) => {
            console.log(err);
        })
    });
    return Promise.all(delete_promises);
}

module.exports = {create_directory , create_files , delete_files};
