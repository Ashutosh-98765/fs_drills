const { create_directory, create_files, delete_files } = require('../solution1.js');

async function asyncAwait() {
    try {
        await create_directory();
        console.log("Directory created");

        await create_files(3);
        console.log("Files created");

        await delete_files();
        console.log("Files deleted");
    }
    catch (error) {
        console.lof(error);
    }
}
asyncAwait();