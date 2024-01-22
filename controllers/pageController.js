const nodemailer = require('nodemailer')
exports.getIndexPage= (req,res)=>{
    res.status(200).render("index",{
        page_name:"index"
    })
}

exports.getAboutPage= (req,res)=>{
    res.status(200).render("about",{
        page_name:"about"
    })
}

exports.getRegisterPage= (req,res)=>{
    res.status(200).render("register",{
        page_name:"register"
    })
}

exports.getLoginPage= (req,res)=>{
    res.status(200).render("login",{
        page_name:"login"
    })
}

exports.getContactPage= (req,res)=>{
    res.status(200).render("contact",{
        page_name:"contact"
    })
}

exports.sendEmail= async (req,res)=>{
   const outputMessage=
   `
   <h1>Mail Details</h1>
   <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
   </ul>
   <h1>Message</h1>
   <p>${req.body.message}</p>
   `
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mail.emresen@gmail.com",
      pass: "jgre cfct yknx wxgl",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"SmartEDU Contact Form 👻" <mail.emresen@gmail.com>', // sender address
      to: "siyah.and@gmail.com", // list of receivers
      subject: "SmartED8 cantact form new message  ✔", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview Url: %s",nodemailer.getTestMessageUrl(info))
 }
 main().catch(console.error);
 res.status(200).redirect('/contact')
}