const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
zokou({ nomCom: "Alone", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";

    }
    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });
    moment.tz.setDefault('Africa/Nairobi');
// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');
  let infoMsg =  `
╭════〔 𝐀𝐋𝐎𝐍𝐄-𝐌𝐃 〕═══⊷⏣
┃✣┏━━━━━━━━━━━━━━━━━♢
┃✣┃ 𝗢𝘄𝗻𝗲𝗿 : ${s.OWNER_NAME}
┃✣┃ 𝗣𝗿𝗲𝗳𝗶𝘅 : [ ${s.PREFIXE} ] 
┃✣┃ 𝗠𝗼𝗱𝗲 : *${mode}*
┃✣┃ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : 𝐇𝐀𝐌𝐌𝐘
┃✣┃ 𝗥𝗮𝗺 : 𝟳𝟮 𝗚𝗕
┃✣┃ 𝗗𝗮𝘁𝗲  : *${date}* 
┃✣┃ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : 𝗟𝗶𝗻𝘂𝘅
┃✣┃ 𝐑𝐮𝐧𝐭𝐢𝐦𝐞: ${run}
┃✣┃
┃✣┃   ▎▍▌▌▉▏▎▌▉▐▏▌
┃✣┃   ▎▍▌▌▉▏▎▌▉▐▏▌
┃✣┃        𝐀𝐋𝐎𝐍𝐄
┃✣┗━━━━━━━━━━━━━━━━♢
╰═════════════════⊷⏣
 ${ms.pushName} 𝐇𝐞𝐥𝐥𝐨,,𝗛𝗲𝗿𝗲 𝗶𝘀 𝗺𝘆 𝗺𝗲𝗻𝘂,𝗵𝗮𝘃𝗲 𝗳𝘂𝗻 🫠
\n${readmore}`;   
                    '┏━━━━━━━━━━━━━━━━━━♢
    let menuMsg =     ' 𝐀𝐋𝐎𝐍𝐄 𝐂𝐌𝐃
                    '┗━━━━━━━━━━━━━━━━━━♢`;
    for (const cat in coms) {
        menuMsg += `
╭════「 *${cat}* 」═══⊷⏣ 
┃┏━━━━━━━━━━━━━━━━♢
┴┃ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
┃┃❝ ${cmd}`    
        } 
        menuMsg +=`
┬┃
┃┗━━━━━━━━━━━━━━━━♢  
╰════════════════⊷⏣`
    }
    menuMsg += `
> 𝐀𝐋𝐎𝐍𝐄-𝐌𝐃\n
`;
   var lien = mybotpic();
   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Alonemd*, déveloper Hammy" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
       zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Alonemd*, déveloper Hammy" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(infoMsg + menuMsg);
}
});
