const { create_directory, create_files, delete_files } = require('../problem1.js');

callBackHell = () => {
    create_directory((err, msg) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(msg);
        }

        create_files(3, (err, msg) => {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(msg);
            }

            delete_files((err, msg) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log(msg);
                }
            });
        });
    })
}

callBackHell();
