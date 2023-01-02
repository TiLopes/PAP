const nodemailer = require("nodemailer");

module.exports.newCondomino = (condomino, password) => {
  var transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    auth: {
      user: "tlcondominiospt@gmail.com",
      pass: "rXKzLv5cPNATJnMj",
    },
  });

  var mailOptions = {
    from: "tlcondominiospt@gmail.com",
    to: condomino,
    subject: "Acesso à nossa plataforma",
    html: `<!doctype html>
    <html>
      <body>
        <p>Email: ${condomino}</p>
        <p>Password: ${password}</p>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
