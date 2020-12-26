//Bring the Express server and Create Application
let express = require('express');
let app = express();
/////read data from another file with path
let pieRepo = require('./repos/pieRepo');

//Use the express router object
let router = express.Router();
// let pies = [
//     {"id": 1, "name": "Apple"},
//     {"id": 2, "name": "Cherry"},
//     {"id": 3, "name": "Peach"}
// ];
let pies = pieRepo.get(); 
//Create GET to return a list of all pies
router.get('/', function(reg, res, next){
    // res.send("Welcome to Amania Shop 'Faizul', New Product is Apple");
    res.status(200).json({
        "status": 200,
        "statusText": "ok",
        "message" : "All pies retrieved.",
        "data" : pies
    });
    send(pies);
});

// Configur router so all routers are prefixed with /api/v1
app.use('/api/',router);

// Create server to listen on port 5000
var server = app.listen(5000,function(){
    console.log('Node Server is running on http://localhost:5000..');
});