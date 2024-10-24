"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo", catégorie:"Général", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/hammytec/Alone-md';
  const img = 'https://i.imgur.com/sDFD1AD.jpeg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata =     
  `☛ 𝐀𝐋𝐎𝐍𝐄-MD REPO ☚
┏━━━━━━━━━━━━━━━━━♢    
┃💫*REPOSITORY:* ${data.html_url}
┃👻*SESSION:* https://alone-sessions.onrender.com
┃✨*STARS:* ${repoInfo.stars}
┃💢*FORKS:* ${repoInfo.forks}
┃📅*RELEASE DATE:* ${releaseDate}
┃👨‍💻 *CREATOR:* HAMMY
┃🦉*CHANNEL:* https://whatsapp.com/channel/0029Vagq4pN9hXEy6SpCDi0X
┃🐲*GROUP:* https://chat.whatsapp.com/CJ19SPCM1F77r2i7B94ABK
┗━━━━━━━━━━━━━━━━━♢`;


      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
