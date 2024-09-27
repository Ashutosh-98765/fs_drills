const {readFile , createFile , upperCase , lowerCase , sorted , delete_files} = require('../problem2.js');

callBackHell = () => {readFile((err , file_data) => 
    {
        if(err){
            return console.log(err);
        }
        console.log(file_data);

        createFile((err , filename_path) => {
            if(err){
                return console.log(err);
            }

            upperCase(file_data , (err , upper_data) => {
                if(err){
                    return console.log(err);
                }

                lowerCase(upper_data , (err , lower_data) => {
                    if(err){
                        return console.log(err);
                    }
                    
                    sorted(lower_data , (err) => {
                        if(err){
                            return console.log(err);
                        }
                            
                        delete_files(filename_path , (err) => {
                            if(err){
                                return console.log(err);
                            }

                        });

                    });

                });

            });

        });

    });

}

callBackHell();
