const fs = require('fs/promises');
const path = require('path');

const dir_path = __dirname;

const lipsum_file_path = path.join(dir_path, 'lipsum.txt');
const file_name_path = path.join(dir_path, 'filenames.txt');
const upper_file_path = path.join(dir_path, 'upper.txt');
const lower_file_path = path.join(dir_path, 'lower.txt');
const sorted_file_path = path.join(dir_path, 'sorted.txt');

async function read_file(file_path) {
    try {
        const data = await fs.readFile(file_path, 'utf-8');
        return data;
    } catch (error) {
        return error;
    }
}

async function append_file(file_path) {
    try {
        await fs.appendFile(file_name_path, `${file_path}\n`);
    } catch (error) {
        return error;
    }
}

// 1. Read the given file lipsum.txt
async function read_lipsum_file() {
    try {
        const lipsum_data = await read_file(lipsum_file_path);
        console.log(lipsum_data);
        return lipsum_file_path;
    } catch (error) {
        return error;
    }
}

async function create_file() {
    try {
        await fs.writeFile(file_name_path, "");
        return file_name_path;
    } catch (error) {
        return error;
    }
}

async function upper_case(lipsum_file_path) {
    try {
        const lipsum_data = await read_file(lipsum_file_path);
        const upper_data = lipsum_data.toUpperCase();
        const promise1 = fs.writeFile(upper_file_path, upper_data);
        const promise2 = append_file(upper_file_path);
        Promise.all([await promise1 , await promise2]);
        console.log(upper_data);
        return upper_file_path;
    } catch (error) {
        return error;
    }
}

async function lower_case(upper_file_path) {
    try {
        const upper_data = await read_file(upper_file_path);
        const lower_data = upper_data.toLowerCase()
                           .split(".")
                           .map(line => line.trim())
                           .join("\n")
                           .trim();

        const promise1 = fs.writeFile(lower_file_path, lower_data);
        const promise2 = append_file(lower_file_path);
        Promise.all([await promise1 , await promise2]);
        console.log(lower_data);
        return lower_file_path;
    } catch (error) {
        return error;
    }
}

async function sorted_file(lower_file_path) {
    try {
        const data = await read_file(lower_file_path);
        const sorted_data = data.split("\n")
                            .sort()
                            .join("\n")
                            .trim();

        const promise1 = fs.writeFile(sorted_file_path, sorted_data);
        const promise2 = append_file(sorted_file_path);
        Promise.all([await promise1 , await promise2]);
        console.log(sorted_data);
        return sorted_data;
    } catch (error) {
        return error;
    }
}

async function delete_files(file_name_path) {
    try {
        const filenames = await read_file(file_name_path);
        const files = filenames.split("\n").filter(Boolean);
        files.map(async (file) => {
            await fs.unlink(file);
        })
    } catch (error) {
        return error;
    }
}

module.exports = { read_lipsum_file, create_file, upper_case, lower_case, sorted_file, delete_files };