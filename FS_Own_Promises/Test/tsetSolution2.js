const {read_lipsum_file , createFile , upperCase , lowerCase , sorted , delete_files} = require('../solution2.js');

createFile()
.then(() => {
    console.log("filename file created successfully");
    return read_lipsum_file();
})
.then((lipsum_data) => {
    console.log(lipsum_data);
    return upperCase();
})
.then((upper_data) => {
    console.log(upper_data);
    return lowerCase();
})
.then((lower_data) => {
    console.log(lower_data);
    return sorted();
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