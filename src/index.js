const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const config = require("./config");
const antiCrash = require("./anticrash");
const { handleBirthdayCommand } = require("./commands/birthdayCommands");
const { handleNewsCommand } = require("./commands/newsCommands");
const { handleLiveCommand } = require("./commands/LiveCommands");
const { handleScheduleCommand } = require("./commands/scheduleCommands");

const app = express();

app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  const logMessage = `Welcome message sent to ${req.ip}.`;
  sendLogToDiscord(logMessage);
  res.send({
    message: "Welcome To JKT48 WEB API",
  });
});

app.listen(config.port, config.ipAddress, () => {
  console.log(`Server is running at ${config.ipAddress}:${config.port}`);
});

antiCrash
  .init()
  .then(() => {
    const client = new Client({
      authStrategy: new LocalAuth(),
    });

    client.on("qr", (qr) => {
      console.log("Scan QR Code ini untuk masuk:");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Bot siap digunakan!");
    });

    client.on("message", async (message) => {
      if (message.body === "!birthday") {
        await handleBirthdayCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      if (message.body.startsWith("!news")) {
        await handleNewsCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      if (message.body === "!live") {
        await handleLiveCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      if (message.body === "!schedule") {
        await handleScheduleCommand(message, client);
      }
    });

    client.initialize();
  })
  .catch((error) => {
    console.error("Failed to initialize antiCrash module:", error);
  });
