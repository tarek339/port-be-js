const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const moment = require("moment");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT | 4000;

app.get("/", (req, res) => {
  res.send(
    `⚡️[server]: Server is running at http://localhost:${port}, ${moment()
      .locale("de")
      .format("DD.MM.YYYY, LT")}`
  );
});

app.post("/", async (req, res, next) => {
  const male = "geehrter Herr";
  const female = "geehrte Frau";
  const checkGender = req.body.salutation === "Frau" ? female : male;
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tarekjassine@gmail.com",
        pass: "wonoytjxbqgxhjtm",
      },
    });

    await transport.sendMail({
      from: "tarekjassine@gmail.com",
      to: req.body.email,
      subject: `Ihre Anfrage am ${moment()
        .locale("de")
        .format("DD.MM.YYYY, LT")}`,
      html: `<p>Sehr ${checkGender} ${req.body.lastName},</p>
                <p>Herzlichen Dank für Ihre Anfrage.<br>
                Ich freue mich über Ihr Interesse und möchte Ihnen versichern,<br>
                dass ich Ihre Anfrage schnellstmöglich bearbeiten werde.</p>
                <p>Ich werde mich in Kürze mit Ihnen in Verbindung setzen,<br>
                um weitere Details zu besprechen und auf Ihre Anforderungen einzugehen.<br>
                Dabei stehen Ihre individuellen Bedürfnisse im Vordergrund, und ich werde mein Bestes geben,<br>
                um Ihnen optimalen Service zu bieten.</p>
                <p>Falls in der Zwischenzeit weitere Fragen auftreten sollten,<br>
                zögern Sie bitte nicht, mich zu kontaktieren.<br>
                Ich bin gerne für Sie da und freue mich darauf, Ihnen weiterzuhelfen.</p>
                <p>Mit freundlichen Grüßen</p>
                <p>Tarek Jassine</p>
                <p>Transportberatung Hamburg<br>
                Classenweg 21<br>
                22391 Hamburg<br>
                USt.-IdNr.: DE355575992<br>
                Tel.: +49151/ 2525 8758<br>
                E-Mail: info@transportberatunghamburg.de</p>`,
    });

    await transport.sendMail({
      from: "tarekjassine@gmail.com",
      to: "tarekjassine@gmail.com",
      subject: `Request ${moment().locale("de").format("DD.MM.YYYY, LT")}`,
      html: `
      <div>
      <p>salutation: ${req.body.salutation}</p>
      <p>first name: ${req.body.firstName}</p>
      <p>last name: ${req.body.lastName}</p>
      <p>company: ${req.body.company}</p>
      <p>e-mail: ${req.body.email}</p>
      <p>phone: ${req.body.phoneNumber}</p>
      <p>message: ${req.body.message}</p>
      <p>terms accepted: ${req.body.termsAccepted}</p>
      </div>`,
    });

    res.json({
      formData: req.body,
      message: "Vielen Dank!",
    });
  } catch (err) {
    res.status(404).json({
      message: "Please try again!",
    });
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}, ${moment()
      .locale("de")
      .format("DD.MM.YYYY, LT")}`
  );
});
