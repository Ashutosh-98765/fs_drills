const {read_lipsum_file , createFile , upperCase , lowerCase , sorted , delete_files} = require('../solution2.js');

createFile()
.then(() => {
    console.log("filename file created successfully");
    return read_lipsum_file();
})
.then(() => {
    console.log("lipsum file read");
    return upperCase();
})
.then(() => {
    console.log("Upper file created");
    return lowerCase();
})
.then(() => {
    console.log("Lower file created");
    return sorted();
})
.then(() => {
    console.log("sorted file created");
    return delete_files();
})
.then(() => {
    console.log("All files deleted successfully!");
})
.catch((error) => {
    console.log(error);
});