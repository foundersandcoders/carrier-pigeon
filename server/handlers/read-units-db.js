var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

var selectUnits = function (req, res) {
	var data = req.url;
	strng = data.replace(/\/units\?/g, "")

	db.selectUnits('units',strng,function (units) {

		var unit = JSON.stringify(units);

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(unit);
	})
};

module.exports = selectUnits;