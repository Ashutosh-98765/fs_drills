const fs = require('fs').promises;
const path = require('path');

const directory_path = __dirname;
const directory_name = path.join(directory_path, 'randomJsonFiles');

// 1. Create a directory.
async function create_directory() {
    try {
        await fs.mkdir(directory_name, { recursive: true });
    } catch (error) {
        tconsole.log(error);
    }
}

// 2. Create random JSON files
async function create_files(count) {
    try {
        for (let i = 0; i < count; i++) {
            const file_path = path.join(directory_name, `file${i + 1}.json`);
            await fs.writeFile(file_path, `This is file${i + 1}.`);
        }
    } catch (error) {
        console.log(error);
    }
}


//  3. Delete those files simultaneously 
async function delete_files() {
    try {
        const filenames = await fs.readdir(directory_name, 'utf-8');
        filenames.map(async (file) => {
            const file_path = path.join(directory_name, file);
            await fs.unlink(file_path);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { create_directory, create_files, delete_files };
