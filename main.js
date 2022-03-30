var datasource = require('./datasource/simple-datasource')
var model = require('./model/model').create(datasource)
var landscapes = require('./model/Landscapes')
var express = require('express')
var app = express()

// connect to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@demo.svgfw.mongodb.net/demo?retryWrites=true&w=majority', function (err, db) {

    // if (err) throw err;
    // db.collection('user').findOne({}, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // })
    // if (err) throw err;
    // db.collection('user').find({}).toArray( function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // })
    console.log('Successfully connected');

});


app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
var router = express.Router()

router.use(express.static('public'))
var multer = require('multer')
var upload = multer({ dest: 'tmp/' })
var webconfig = require('./webconfig')
var urlencodedParser = require('body-parser').urlencoded({ extended: false })

function controller(name) {
    return require('./controllers/' + name + '-controller')
}

router.get('/', function (request, response) {
    controller('home').get(request, response, webconfig, model)
})

router.get('/login', function (request, response) {
    controller('login').get(request, response, webconfig, model)
})

router.post('/login', urlencodedParser, function (request, response) {
    controller('login').post(request, response, webconfig, model)
})

router.get('/logout', function (request, response) {
    controller('logout').get(request, response, webconfig)
})

var fetchController = require('./controllers/fetch-controller');
const cookieParser = require('cookie-parser');

router.get('/detail', function (request, response) {
    controller('detail').get(request, response, webconfig, model)
})

router.get('/edit-general-info', function (request, response) {
    controller('edit-general-info').get(request, response, webconfig, model)
})

router.post('/edit-general-info', upload.single('featureImage'), function (request, response) {
    controller('edit-general-info').post(request, response, webconfig, model)
})
router.get('/edit-contact', function (request, response) {
    controller('edit-contact').get(request, response, webconfig, model)
})

router.post('/edit-contact', urlencodedParser, function (request, response) {
    controller('edit-contact').post(request, response, webconfig, model)
})
router.get('/add-product', function (request, response) {
    controller('add-product').get(request, response, webconfig, model)
})

router.post('/add-product', upload.single('productImage'), function (request, response) {
    controller('add-product').post(request, response, webconfig, model)
})
router.get('/edit-product', function (request, response) {
    controller('edit-product').get(request, response, webconfig, model)
})

router.post('/edit-product', upload.single('productImage'), function (request, response) {
    controller('edit-product').post(request, response, webconfig, model)
})

router.get('/delete-product', function (request, response) {
    controller('delete-product').get(request, response, webconfig, model)
})

router.get('/add-about', function (request, response) {
    controller('add-about').get(request, response, webconfig, model)
})

router.post('/add-about', upload.single('productImage'), function (request, response) {
    controller('add-about').post(request, response, webconfig, model)
})
router.get('/edit-about', function (request, response) {
    controller('edit-about').get(request, response, webconfig, model)
})

router.post('/edit-about', upload.single('productImage'), function (request, response) {
    controller('edit-about').post(request, response, webconfig, model)
})

router.get('/delete-about', function (request, response) {
    controller('delete-about').get(request, response, webconfig, model)
})


app.use(webconfig.root, router)

//Start web app

app.listen(8080, function () {
    console.log('Server started OK')
})