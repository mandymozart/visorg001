const mailgun = require('mailgun-js');
exports.handler = function(event, context, callback) 
{
  callback(null, {
      statusCode: 200,
      body: "Mail sent"
  });
}
