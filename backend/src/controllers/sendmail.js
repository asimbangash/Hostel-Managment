const nodeMailer = require("nodemailer");
const sendmail = async (Options) => {

    try {

        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },
        })

        const mailRes = await transporter.sendMail(Options);
        console.log({ mailRes })
    } catch (error) {
        console.log(error?.message);
    }
};

module.exports = { sendmail }

