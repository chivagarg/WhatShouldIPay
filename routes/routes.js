module.exports = function(express, app, bodyParser, mongoose){

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();
router.get('/', function(req, res, next){
	res.render('index', {});
})

router.get('/visualize', function(req, res, next){
	res.render('visualize', {});
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
		console.log("Saved to DB yo!");
});

res.send({redirect: '/visualize'});

})

app.use('/', router);
}

function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}