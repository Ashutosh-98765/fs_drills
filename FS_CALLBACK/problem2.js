const fs = require('fs');
const path = require('path');


const dir_path = __dirname;


// 1. Read the given file lipsum.txt
const file_path = path.join(dir_path , 'lipsum.txt');
const readFile = (callback) => {
    fs.readFile(file_path , 'utf-8' , (err , data) => {
        if(err){
            callback(err);
        }
        else{
            callback(null , data);
        }
    })
}

const filename_path = path.join(dir_path , 'filenames.txt');
const createFile = (callback) => {
    fs.writeFile(filename_path , "" , (err , file_path) => {
        if(err){
            callback(err);
        }
        else{
            console.log("File Created Successfully");
            callback(null , filename_path);
        }
    });
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
const upperCase = (lipsum_data , callback) => {
    const upper_file_path = path.join(dir_path , 'upper_case_file.txt');
    const upper_data = lipsum_data.toUpperCase();
    fs.writeFile(upper_file_path , upper_data , (err) => {
        if(err){
            callback(err);
        }
        else{
            fs.appendFile(filename_path , `${upper_file_path}\n` , ((err) => {
                if(err){
                    callback(err);
                }
                else{
                    console.log("Upper File Created Successfully");
                    callback(null , upper_data);
                }
            }))
        }
    });
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
const lowerCase = (upper_data , callback) => {
    const lower_file_path = path.join(dir_path , 'lower_case_file.txt');
    const lower_data = upper_data.toLowerCase()
                                .split('.')
                                .map((line) => line.trim())
                                .join('\n')
                                .trim();
    fs.writeFile(lower_file_path , lower_data , ((err) => {
        if(err){
            callback(err);
        }
        else{
            fs.appendFile(filename_path , `${lower_file_path}\n` , ((err) => {
                if(err){
                    callback(err);
                }
                else{
                    console.log("lower File Created Successfully");
                    callback(null , lower_data);
                }
            }))
        }
    }));
}

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
const sorted = (lower_data , callback) => {
    const sorted_path = path.join(dir_path , 'sorted.txt');
    const sorted_data = lower_data.split('\n')
                                    .sort()
                                    .join("\n")
                                    .trim();
    fs.writeFile(sorted_path , sorted_data , ((err) => {
        if(err){
            callback(err);
        }
        else{
            fs.appendFile(filename_path , `${sorted_path}\n` , ((err) => {
                if(err){
                    callback(err);
                }
                else{
                    console.log("sorted File Created Successfully");
                    callback(null);
                }
            }))
        }
    }));
}

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.3
const delete_files = (filename , callback) => {
    fs.readFile(filename , 'utf-8' , (err , file_names) => {
        if(err){
            callback(err);
        }
        else{
            const file_path = file_names.split('\n').filter(Boolean);
            let count = 0;
            file_path.forEach((file) => {
                fs.unlink(file , (err) => {
                    if(err){
                        callback(err);
                    }
                    else{
                        count++;

                        if(count === file_path.length){
                            console.log("All files deleted successfully");
                            callback(null);
                        }
                    }
                })
            });
        }
    })
}



module.exports = {readFile , createFile , upperCase , lowerCase , sorted , delete_files};
