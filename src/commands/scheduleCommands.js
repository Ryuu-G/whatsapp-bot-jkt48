const axios = require("axios");
const fs = require("fs");
const config = require("../config");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Juni",
  "Juli",
  "Agt",
  "Sept",
  "Okt",
  "Nov",
  "Des",
];

let membersData = [];
fs.readFile("src/member.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading member data:", err);
    return;
  }
  membersData = JSON.parse(data);
});

function getNickname(name) {
  const member = membersData.find((m) => m.name === name);
  return member && member.nicknames.length > 0 ? member.nicknames[0] : null;
}

function formatSchedule(schedules) {
  if (schedules.length === 0) {
    return "*Tidak ada jadwal show yang tersedia.*";
  }

  let message = "*🎭 Jadwal Show JKT48 🎭*\n\n";
  schedules.forEach((schedule) => {
    const showInfoParts = schedule.showInfo.split("Show");
    const dateTime = showInfoParts[0].trim();
    const time = showInfoParts[1].trim();

    const dateParts = dateTime.split(", ");
    if (dateParts.length < 2) {
      console.error("Invalid date format:", dateTime);
      return;
    }

    const dayOfWeek = dateParts[0];
    const dayAndMonthYear = dateParts[1].split(".");
    if (dayAndMonthYear.length < 3) {
      console.error("Invalid date format:", dateParts[1]);
      return;
    }

    const day = dayAndMonthYear[0].trim();
    const monthIndex = parseInt(dayAndMonthYear[1], 10) - 1;
    const year = dayAndMonthYear[2].trim();
    const monthName = monthNames[monthIndex];

    const memberNicknames = schedule.members
      .map(getNickname)
      .filter((nickname) => nickname)
      .join(", ");

    const birthday = schedule.birthday || "";

    message += `*${schedule.setlist}*\n`;
    message += `🕒 ${time}\n`;
    message += `🗓️ ${day} ${monthName} ${year}\n`;
    if (birthday) {
      message += `🎂 ${birthday}\n`;
    }
    if (memberNicknames) {
      message += `👥 ${memberNicknames}\n`;
    }
    message += "\n";
  });

  return message;
}

async function handleScheduleCommand(message, client) {
  try {
    const response = await axios.get(
      `${config.ipAddress}:${config.port}/api/schedule`
    );
    const schedules = response.data;

    const scheduleMessage = formatSchedule(schedules);
    await client.sendMessage(message.from, scheduleMessage);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    await client.sendMessage(
      message.from,
      "Terjadi kesalahan saat mengambil data jadwal. Silakan coba lagi nanti."
    );
  }
}

module.exports = { handleScheduleCommand };
