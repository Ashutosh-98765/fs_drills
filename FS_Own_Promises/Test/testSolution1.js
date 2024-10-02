const { create_directory, create_files, delete_files } = require('../solution1.js');

create_directory().then(() => {
    console.log("Directory created successfully!");
    return create_files(3);
})
.then((files) => {
    console.log("Files created successfully!");
    return delete_files(files);
})
.then(() => {
    console.log("Files deleted successfully!");
})
.catch((err) => {
    console.log(err);
});