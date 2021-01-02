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

//let pies = pieRepo.get();

//Create GET to return a list of all pies
router.get('/', function(reg, res, next){
    // res.send("Welcome to Amania Shop 'Faizul', New Product is Apple");
    pieRepo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "ok",
            "message" : "All pies retrieved.",
            "data" : data
        });
    },function(err){
        next(err);
    });
});

///Create GET/search?id=n&name=str to search for pies by 'id' and/or 'name' pie
///http://localhost:5000/api/search?id=1&name=A
///http://localhost:5000/api/search/?id=1&name=A
///http://localhost:5000/api/search?name=A
router.get('/search', function(req, res, next){
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };
    pieRepo.search(searchObject, function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function(err){
        next(err);
    });
});

///Create GET/ID to return a single pie
router.get('/:id', function(req, res,nest){
    pieRepo.getById(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single pie retrieved.",
                "data": data
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' Could not found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err){
        next(err);
    });
});


// Configur router so all routers are prefixed with /api/v1
app.use('/api/',router);

// Create server to listen on port 5000
var server = app.listen(5000,function(){
    console.log('Node Server is running on http://localhost:5000..');
});