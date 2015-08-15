var express = require('express'),
	path = require('path'),
	config = require(path.join(__dirname, 'config/config.js')),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	plotly = require('plotly')("chivagarg", "mr62ip755t")


mongoose.connect(config.dbURL);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('host', config.host);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);


var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(app.get('port'), function() {
	console.log("Utility Percentiles running on port " + app.get('port'));
})

// var trace1 = {
//   x: [1, 2, 3, 4, 5],
//   y: [10, 15, 13, 17, 22],
//   type: "scatter"
// };
// var trace2 = {
//   x: [1, 2, 3, 4],
//   y: [16, 5, 11, 9],
//   type: "scatter"
// };
// var data = [trace1, trace2];
// var graphOptions = {filename: "privacy-false", world_readable: true, fileopt: "overwrite"};
// plotly.plot(data, graphOptions, function (err, msg) {
//     console.log(msg);
// });
var arrx = [19097, 18601, 15595, 13546, 12026, 7434, 5419];
var arry = [43, 47, 56, 80, 86, 93, 80];

var trace1 = {
  x: [52698, 43117],
  y: [53, 31],
  mode: "markers",
  name: "North America",
  text: ["United States", "Canada"],
  marker: {
    color: "rgb(164, 194, 244)",
    size: 12,
    line: {
      color: "white",
      width: 0.5
    }
  },
  type: "scatter"
};
var trace2 = {
  x: [39317, 37236, 35650, 30066, 29570, 27159, 23557, 21046, 18007],
  y: [33, 20, 13, 19, 27, 19, 49, 44, 38],
  mode: "markers",
  name: "Europe",
  text: ["Germany", "Britain", "France", "Spain", "Italy", "Czech Rep.", "Greece", "Poland"],
  marker: {
    color: "rgb(255, 217, 102)",
    size: 12,
    line: {
      color: "white",
      width: 0.5
    }
  },
  type: "scatter"
};
var trace3 = {
  x: [42952, 37037, 33106, 17478, 9813, 5253, 4692, 3899],
  y: [23, 42, 54, 89, 14, 99, 93, 70],
  mode: "markers",
  name: "Asia/Pacific",
  text: ["Australia", "Japan", "South Korea", "Malaysia", "China", "Indonesia", "Philippines", "India"],
  marker: {
    color: "rgb(234, 153, 153)",
    size: 12,
    line: {
      color: "white",
      width: 0.5
    }
  },
  type: "scatter"
};
var trace4 = {
  x: arrx,
  y: arry,
  mode: "markers",
  name: "Latin America",
  //text: ["Chile", "Argentina", "Mexico", "Venezuela", "Venezuela", "El Salvador", "Bolivia"],
  marker: {
    color: "rgb(142, 124, 195)",
    size: 12,
    line: {
      color: "white",
      width: 0.5
    }
  },
  type: "scatter"
};
var data = [trace1, trace2, trace3, trace4];
var layout = {
  title: "Quarter 1 Growth",
  xaxis: {
    title: "GDP per Capita",
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    title: "Percent",
    showline: false
  }
};
var graphOptions = {layout: layout, filename: "line-style", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});


// define the Model outside of the routes. 
// Todo - export this
var UtilityRent = mongoose.model('UtilityRent', { zipcode: Number, bedrooms: Number, bathrooms: Number, rental: Number });


//var Potato = mongoose.model('Potato', PotatoSchema);

// var potatoBag = [{ zipcode: 98103, bedrooms: 2, bathrooms: 1.5, rental: 1995 },
//                 { zipcode: 98103, bedrooms: 2, bathrooms: 1, rental: 2225 },
//                 { zipcode: 98103, bedrooms: 1, bathrooms: 1, rental: 1575 },
//                 { zipcode: 98103, bedrooms: 1, bathrooms: 1, rental: 1795 },
//                 { zipcode: 98103, bedrooms: 2, bathrooms: 1, rental: 1550 },
//                 { zipcode: 98103, bedrooms: 4, bathrooms: 3, rental: 3950 },
//                 { zipcode: 98103, bedrooms: 3, bathrooms: 2, rental: 3000 },
//                 { zipcode: 98103, bedrooms: 2, bathrooms: 1.5, rental: 1980 },
//                 { zipcode: 98103, bedrooms: 3, bathrooms: 3, rental: 2500 }
//                 ];

// UtilityRent.collection.insert(potatoBag, onInsert);


function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}

require(path.join(__dirname, 'routes/routes.js'))(express, app, bodyParser, UtilityRent);


