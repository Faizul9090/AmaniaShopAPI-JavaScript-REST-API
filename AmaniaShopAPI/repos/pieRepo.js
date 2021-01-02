/// "fs" buildin node module which is work with reading and writing fiels
let fs = require('fs');

const FILE_NAME = './assets/pies.json';

let pieRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    }, /// added new function for Get Data by Id
    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie);
            }
        });
    },
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let pies =JSON.parse(data);
                // Perform search
                if(searchObject){
                    //Example search object
                    // let searchObject = {
                    //      "id": 1,
                    //      "name": 'A'
                    //};
                    pies = pies.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }
                resolve(pies);
            }
        });
    },
    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                pies.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(newData);
                    }
                });
            }
        });
    },
    update: function(newData, id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                let pie = pies.find(p => p.id == id);
                if(pie){
                    Object.assign(pie, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(newData);
                        }
                    });
                }
            }
        });
    }
};

// let pieRepo = {
//     get: function(){
//         return [
//             {"id": 1, "name": "Apple"},
//             {"id": 2, "name": "Cherry"},
//             {"id": 3, "name": "Peach"}
//         ];
//     }
// } 

module.exports = pieRepo;