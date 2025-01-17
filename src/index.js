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

    const cooldowns = {
      birthday: 0,
      news: 0,
      live: 0,
      schedule: 0,
    };

    client.on("message", async (message) => {
      const now = Date.now();
      if (message.body === "!birthday") {
        if (now - cooldowns.birthday < 30000) {
          await message.reply("Silakan tunggu 30 detik sebelum menggunakan command ini lagi.");
          return;
        }
        cooldowns.birthday = now;
        await handleBirthdayCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      const now = Date.now();
      if (message.body.startsWith("!news")) {
        if (now - cooldowns.news < 30000) {
          await message.reply("Silakan tunggu 30 detik sebelum menggunakan command ini lagi.");
          return;
        }
        cooldowns.news = now;
        await handleNewsCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      const now = Date.now();
      if (message.body === "!live") {
        if (now - cooldowns.live < 30000) {
          await message.reply("Silakan tunggu 30 detik sebelum menggunakan command ini lagi.");
          return;
        }
        cooldowns.live = now;
        await handleLiveCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      const now = Date.now();
      if (message.body === "!schedule") {
        if (now - cooldowns.schedule < 30000) {
          await message.reply("Silakan tunggu 30 detik sebelum menggunakan command ini lagi.");
          return;
        }
        cooldowns.schedule = now;
        await handleScheduleCommand(message, client);
      }
    });

    client.on("message", async (message) => {
      const now = Date.now();
      if (message.body === "!help") {
        if (now - cooldowns.schedule < 30000) {
          await message.reply(
            "List commands.\n\n- !birthday (**Untuk mendapatkan list birthday member yang akan datang**)\n- !live (**Untuk mendapatkan list member yang sedang live**)\n- !news (**Untuk mendapatkan list news terbaru JKT48**)\n- !news :id (**Untuk mendapatkan detail news**)\n- !schedule (**Untuk mendapatkan list schedule theater JKT48**)"
          );
          return;
        }
        cooldowns.schedule = now;
        await handleScheduleCommand(message, client);
      }
    });

    client.initialize();
  })
  .catch((error) => {
    console.error("Failed to initialize antiCrash module:", error);
  });
