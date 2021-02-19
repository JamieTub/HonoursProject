const { title } = require('process');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res, next){
    res.render('/', { title: 'Express' })
});

module.exports = router;