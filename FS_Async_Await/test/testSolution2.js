const { read_lipsum_file, create_file, upper_case, lower_case, sorted_file, delete_files } = require('../solution2.js');

async function asyncAwait() {
    try {
        let lipsum_file_path = await read_lipsum_file();
        let filename_path = await create_file();
        let upper_file_path = await upper_case(lipsum_file_path);
        let lower_file_path = await lower_case(upper_file_path);
        await sorted_file(lower_file_path);
        await delete_files(filename_path);
        console.log("File deleted succesfully");

    } catch (error) {
        console.log(error);
    }
}
asyncAwait();