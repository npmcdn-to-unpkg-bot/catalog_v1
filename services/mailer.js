var mailgun = require('mailgun.js');
var mg = mailgun.client({username: 'api', key: process.env.LIVE_MAILGUN_API_KEY});
var mail_domain = process.env.LIVE_MAILGUN_DOMAIN;

// not used for now but will be later
// var email_templates = {
//
//
//   admin_update:{
//     from: 'INFINITE.INDUSTRIES <info@infinite.industries>',
//     to: ['shifting.planes@gmail.com'],
//     subject: 'update',
//     text: 'Update here'
//   }
// }

module.exports = {

  sendAdminEmail:function(requested_action){

    //var mail_content = email_templates[which_email];
    var mail_content = {};
    mail_content.from = 'INFINITE.INDUSTRIES <info@infinite.industries>';
    mail_content.to = [process.env.ADMIN_EMAIL];
    mail_content.subject = process.env.MODE +': '+requested_action.subject;
    mail_content.text = requested_action.text;

    // console.log(mail_content);
    mg.messages.create(mail_domain,mail_content)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  },
  test:function(){
    console.log("yo!");
  }

}
