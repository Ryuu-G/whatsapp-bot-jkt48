const axios = require("axios");
const config = require("../config");

function formatBirthdayMessage(birthdays) {
  let message = "*🎉 Data Ulang Tahun Member JKT48 Selanjutnya 🎉*\n\n";

  birthdays.forEach((member) => {
    const birthYear = member.birthday.split(" ").pop();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    message += `*${member.name}*\n`;
    message += `📅 ${member.birthday}\n`;
    message += `🎂 Ulang tahun ke-${age}\n`;
    message += `🔗 https://jkt48.com${member.profileLink}\n\n`;
  });

  return message;
}

async function handleBirthdayCommand(message, client) {
  try {
    const response = await axios.get(
      `${config.ipAddress}:${config.port}/api/birthdays`
    );
    const birthdays = response.data;

    if (birthdays.length === 0) {
      await client.sendMessage(
        message.from,
        "Tidak ada data ulang tahun member yang tersedia."
      );
      return;
    }

    const birthdayMessage = formatBirthdayMessage(birthdays);
    await client.sendMessage(message.from, birthdayMessage);
  } catch (error) {
    console.error("Error fetching birthdays:", error);
    await client.sendMessage(
      message.from,
      "Terjadi kesalahan saat mengambil data ulang tahun. Silakan coba lagi nanti."
    );
  }
}

module.exports = { handleBirthdayCommand };
