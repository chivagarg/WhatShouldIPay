module.exports = function(express, app, bodyParser, mongoose){

//app.use(express.bodyParser());

//var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


var router = express.Router();
router.get('/', function(req, res, next){
	res.render('index', {});
})

router.post('/upload', urlencodedParser, function(req, res, next){

console.log("Recived post from client!" + "req.body is " + req.body.length + JSON.stringify(req.params) + " and " + JSON.stringify(req.body));

var context = JSON.stringify(req.body.context);
var zipcode = parseInt(stripAlphaChars(JSON.stringify(req.body.zipcode)));
var bedrooms = parseInt(stripAlphaChars(JSON.stringify(req.body.bedrooms)));
var bathrooms = parseInt(stripAlphaChars(JSON.stringify(req.body.bathrooms)));
var rent = parseInt(stripAlphaChars(JSON.stringify(req.body.rent)));

var UtilityRent = mongoose.model('UtilityRent', { zipcode: Number, bedrooms: Number, bathrooms: Number, rental: Number });

var document = new UtilityRent({zipcode: zipcode, bedrooms: bedrooms, bathrooms: bathrooms, rental: rent});
document.save(function(err){
	if (err)
		console.log(err);
	else
		console.log("Saved to DB");

var obj = {
    		tid: 555
		  };

res.statusCode = 200;
res.send(JSON.stringify(obj));
res.end();

});

})

app.use('/', router);
}

function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}