const axios = require("axios");

async function fetchIDNLiveStreams() {
  try {
    const response = await axios.post("https://api.idn.app/graphql", {
      query: `query SearchLivestream {
                searchLivestream(query: "", limit: 100) {
                    result {
                        slug
                        creator {
                            username
                            name
                        }
                        live_at
                    }
                }
            }`,
    });

    const streams = response.data.data.searchLivestream.result;
    return streams.filter(
      (stream) =>
        stream.creator.username.startsWith("jkt48_") ||
        (stream.creator.username.startsWith("jkt48-") &&
          stream.creator.name.endsWith("JKT48"))
    );
  } catch (error) {
    console.error("Failed to fetch IDN Live streams:", error.message);
    return [];
  }
}

async function fetchShowroomLiveStreams() {
  try {
    const response = await axios.get(
      "https://www.showroom-live.com/api/live/onlives"
    );
    const streams = response.data.onlives.flatMap((genre) => genre.lives);
    return streams.filter(
      (stream) =>
        stream.room_url_key?.startsWith("JKT48_") ||
        (stream.room_url_key?.startsWith("officialJKT48") &&
          stream.main_name?.includes("JKT48"))
    );
  } catch (error) {
    console.error("Failed to fetch Showroom streams:", error.message);
    return [];
  }
}

function formatLiveStreams(idnStreams, showroomStreams) {
  if (idnStreams.length === 0 && showroomStreams.length === 0) {
    return "*Tidak ada member yang sedang live saat ini.*";
  }

  let message = "*🎥 Daftar Member yang Sedang Live 🎥*\n\n";

  idnStreams.forEach((stream) => {
    const link = `https://www.idn.app/${stream.creator.username}/live/${stream.slug}`;
    message += `*Nama*: ${stream.creator.name}\n`;
    message += `*Platform*: IDN Live\n`;
    message += `*Mulai Live*: ${stream.live_at}\n`;
    message += `🔗 ${link}\n\n`;
  });

  showroomStreams.forEach((stream) => {
    const link = `https://www.showroom-live.com/r/${stream.room_url_key}`;
    message += `*Nama*: ${stream.main_name}\n`;
    message += `*Platform*: Showroom\n`;
    message += `*Mulai Live*: ${stream.started_at}\n`;
    message += `🔗 ${link}\n\n`;
  });

  return message;
}

async function handleLiveCommand(message, client) {
  try {
    const [idnStreams, showroomStreams] = await Promise.all([
      fetchIDNLiveStreams(),
      fetchShowroomLiveStreams(),
    ]);

    const liveMessage = formatLiveStreams(idnStreams, showroomStreams);
    await client.sendMessage(message.from, liveMessage);
  } catch (error) {
    console.error("Failed to handle nowlive command:", error.message);
    await client.sendMessage(
      message.from,
      "Terjadi kesalahan saat mengambil data live. Silakan coba lagi nanti."
    );
  }
}

module.exports = { handleLiveCommand };
