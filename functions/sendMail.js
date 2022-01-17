// modern JS style - encouraged
const mailgun = require('mailgun-js');

exports.handler = function(event, context, callback) 
{
    const mg = mailgun({
        apiKey: "cfe71b280c7f36240bead1d5ae32e9b9-ef80054a-fd1f9646a", 
        domain: "viennastruggle.com"
    });

    const data = {
        from: 'Name <support@viennastruggle.com>',
    to: 'mandymozart@viennastruggle.com',
    subject: 'Test',
    text: 'TEXT',
    html: 'HTML'
    };
console.log(data, context, event)
   mg.messages().send(data, (error, body) => 
   {
        if (error)
        {
            return console.log(error);
        }

        callback(null, {
            statusCode: 200,
            body: "Mail sent"
        });
   });
}

// from: process.env.MAILGUN_SENDER,
// to: destination,
// subject: `Order confirmation! (${type})`,
// text: `We got your order.${JSON.stringify(content)}`,