var url = "http://carrierpigeonfac-se-env.elasticbeanstalk.com/";

function bookingRequestEmail (order, sender) {
	var string = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
	'<html xmlns="http://www.w3.org/1999/xhtml">' +
	 	'<head>' +
	  		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	  		'<title>Demystifying Email Design</title>' +
	  		'<meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
	  		'<style type="text/css">' +
	  			'body {' +
				  	'font-family: arial, sans-serif;' +
				  	'margin: 0;' +
  					'padding-left: 20px;' +
	  			'}' +
				'h2, p {' +
					'color: black;' +
				'}' +
				'p {' +
				'font-size: 14px;' +
				'}' +
	  		'</style>' +
		'</head>' +
		'<body>' +
			'<div>' +
				'<p>Hi,</pp>' +
				'<p>Please find attached the booking request.</pp>' +
				'<p>Please confirm details by emailing ' + sender + '</p>' +
				'<p>Yours Sincerely,</p>' +
				'<p>Coot Freight Ltd</p>' +
			'</div>' +
		'</body>' +
	'</html>';
	return string;
}

module.exports = bookingRequestEmail;
