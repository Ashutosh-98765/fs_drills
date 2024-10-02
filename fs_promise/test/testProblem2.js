const {readFile , createFile , upperCase , lowerCase , sorted , delete_files} = require('../problem2.js');

createFile()
.then(() => {
    console.log("filename file created successfully");
    return readFile();
})
.then((lipsum_data) => {
    console.log(lipsum_data);
    return upperCase(lipsum_data);
})
.then((upper_data) => {
    console.log(upper_data);
    return lowerCase(upper_data);
})
.then((lower_data) => {
    console.log(lower_data);
    return sorted(lower_data);
})
.then((sorted_data) => {
    console.log(sorted_data);
    return delete_files();
})
.then(() => {
    console.log("All files deleted successfully!");
})
.catch((error) => {
    console.log(error);
})
