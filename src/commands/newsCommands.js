const axios = require("axios");
const config = require("../config"); 

function formatNewsList(newsList) {
  let message = "*📰 Berita Terbaru JKT48 📰*\n\n";
  newsList.forEach((news, index) => {
    message += `*${index + 1}. ${news.judul}*\n`;
    message += `🔗 Detail: Kirim "!news ${news.berita_id}"\n\n`;
  });
  return message;
}

function formatNewsDetail(newsDetail, selectedId) {
  let message = `*📰 ${newsDetail.judul} 📰*\n\n`;
  message += `📖 ${newsDetail.konten}\n\n`;
  message += `🔗 Baca selengkapnya: https://jkt48.com/news/detail/id/${selectedId}?lang=id`;
  return message;
}

async function handleNewsCommand(message, client) {
  const args = message.body.split(" ");

  if (args.length === 1) {
    try {
      const response = await axios.get(
        `${config.ipAddress}:${config.port}/api/news`
      );
      const newsList = response.data.berita;

      if (!Array.isArray(newsList) || newsList.length === 0) {
        await client.sendMessage(
          message.from,
          "Tidak ada berita yang tersedia saat ini."
        );
        return;
      }

      const limitedNewsList = newsList.slice(0, 10);
      const newsMessage = formatNewsList(limitedNewsList);
      await client.sendMessage(message.from, newsMessage);
    } catch (error) {
      console.error("Error fetching news:", error);
      await client.sendMessage(
        message.from,
        "Terjadi kesalahan saat mengambil data berita. Silakan coba lagi nanti."
      );
    }
  } else if (args.length === 2) {
    const selectedId = args[1];
    try {
      const response = await axios.get(
        `${config.ipAddress}:${config.port}/api/news/detail/${selectedId}`
      );
      const newsDetail = response.data.data;

      if (!newsDetail.judul || !newsDetail.konten) {
        throw new Error("Detail berita tidak lengkap");
      }

      const detailMessage = formatNewsDetail(newsDetail, selectedId);
      await client.sendMessage(message.from, detailMessage);
    } catch (error) {
      console.error("Error fetching news detail:", error);
      await client.sendMessage(
        message.from,
        "Terjadi kesalahan saat mengambil detail berita. Pastikan ID berita benar atau coba lagi nanti."
      );
    }
  } else {
    await client.sendMessage(
      message.from,
      "Format perintah salah. Gunakan:\n- `!news` untuk daftar berita\n- `!news <ID>` untuk detail berita"
    );
  }
}

module.exports = { handleNewsCommand };
