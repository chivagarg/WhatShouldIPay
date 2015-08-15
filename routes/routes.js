module.exports = function(express, app, bodyParser, UtilityRent){

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();
router.get('/', function(req, res, next){
	res.render('index', {});
})

// router.get('/visualizeget', function(req, res, next){
// 	console.log("Recived!!!");
// 	res.render('visualize', {title: 'visualizing data for you!'});
// })

// router.get('/upload', function(req, res, next){
// 	console.log("Strigified answers - " + JSON.stringify(req.query));

// 	var context = JSON.stringify(req.query.context);
// 	console.log("Context is " + context);
// 	//console.log("zipcode is " + req.query.zipcode);
// 	var zipcode = parseInt(req.query.zipcode);
// 	var bedrooms = parseInt(req.query.bedrooms);
// 	var bathrooms = parseInt(req.query.bathrooms);
// 	var rent = parseInt(req.query.rent);

// 	res.send({title: 'Hey there delilah'});

// })

router.post('/upload', urlencodedParser, function(req, res, next){

console.log("Recived post from client!" + "req.body is " + req.body.length + JSON.stringify(req.params) + " and " + JSON.stringify(req.body));

var context = JSON.stringify(req.body.context);
var zipcode = parseInt(stripAlphaChars(req.body.zipcode));
var bedrooms = parseInt(stripAlphaChars(req.body.bedrooms));
var bathrooms = parseInt(stripAlphaChars(req.body.bathrooms));
var rent = parseInt(stripAlphaChars(req.body.rent));

var document = new UtilityRent({zipcode: zipcode, bedrooms: bedrooms, bathrooms: bathrooms, rental: rent});
// document.save(function(err){
// 	if (err)
// 		console.log(err);
// 	else
// 		console.log("Saved to DB yo!");
// });

console.log("Going to send response now. Name is john hehe");


var meanRent = 0;
var results = UtilityRent.find({zipcode:zipcode, bedrooms:bedrooms, bathrooms:bathrooms}, function(err, items){
  console.log("Number of items retrieved - " + items.length);
  var sum = 0;
  for (var i=0; i<items.length; ++i)
  {
    if (items[i].rental)
      sum+=items[i].rental;
  }
  meanRent = sum/items.length;
  console.log("Sum is " + sum + " and mean rent is " + meanRent);

  var resObj = {};
  resObj['user'] = meanRent;

  var avgRent = sum/items.length;
  res.json({
  			 userRent: rent,
  			 avgRent: avgRent
  		   }
  		  );

});

console.log("Val of mean rent outside " + meanRent);

//res.json(JSON.stringify(resObj));

//var obj = {"tid":meanRent};
//res.send(JSON.stringify(obj));
//res.send({tid : 20});
//res.json({test:'abc'});

})

app.use('/', router);
}

function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}