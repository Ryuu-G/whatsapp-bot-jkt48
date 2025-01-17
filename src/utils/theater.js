const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const url = "https://jkt48.com/theater/schedule";
  const result = await axios.get(url);
  return result.data;
};

const parseData = (html) => {
  const $ = cheerio.load(html);

  const table = $(".table");
  const scheduleData = [];

  table.find("tbody tr").each((index, element) => {
    const showInfoFull = $(element).find("td:nth-child(1)").text().trim();
    const setlist = $(element).find("td:nth-child(2)").text().trim();
    
    // Ambil anggota yang tidak memiliki style
    const members = $(element)
      .find("td:nth-child(3) a:not([style])") // Ambil anggota tanpa style
      .map((i, el) => $(el).text().trim())
      .get();

    // Ambil anggota yang memiliki style
    const birthdayMembers = $(element)
      .find('td:nth-child(3) a[style="color:#616D9D"]')
      .map((i, el) => $(el).text().trim())
      .get();

    const showInfo = parseShowInfo(showInfoFull);

    if (isValidShowInfo(showInfo)) {
      if (!showInfo.includes("Penukaran tiket")) {
        scheduleData.push({
          showInfo,
          setlist,
          members, // Daftar anggota tanpa style
          birthday: birthdayMembers.length > 0 ? birthdayMembers : null, // Daftar anggota berulang tahun
        });
      }
    }
  });

  return scheduleData.reverse();
};

const isValidShowInfo = (showInfo) => {
  const daysOfWeek = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  return daysOfWeek.some((day) => showInfo.includes(day));
};

const parseShowInfo = (showInfoFull) => {
  const regex = /(\w+),\s(\d{1,2}\.\d{1,2}\.\d{4})\s+Show\s(\d{1,2}:\d{2})/;
  const match = showInfoFull.match(regex);
  if (match) {
    const day = match[1];
    const date = match[2];
    const time = match[3];
    return `${day}, ${date} ${time}`;
  }
  return showInfoFull;
};

module.exports = {fetchData, parseData, parseShowInfo};
