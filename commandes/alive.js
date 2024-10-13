const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}

 ${message}
 
 
 *𝐀𝐥𝐨𝐧𝐞*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("𝐀𝐥𝐨𝐧𝐞 𝐌𝐝") ; return};

      await   repondre("*https://whatsapp.com/channel/0029Vagq4pN9hXEy6SpCDi0X");
         repondre("♢☛𝘄𝗲 𝗮𝗿𝗲 𝗰𝗮𝗽𝘁𝗶𝘃𝗲𝘀 𝗼𝗳 𝗼𝘂𝗿 𝗼𝘄𝗻 𝗶𝗱𝗲𝗻𝘁𝗶𝘁𝗶𝗲𝘀 𝗹𝗶𝘃𝗶𝗻g 𝗜𝗻 𝗽𝗿𝗶𝘀𝗼𝗻𝘀 𝗼𝗳 𝗼𝘂𝗿 𝗼𝘄𝗻 𝗰𝗿𝗲𝗮𝘁𝗶𝗼𝗻 ☚♢")  
     }
 } else {

    if(!superUser) { repondre ("𝗔𝗹𝗼𝗻𝗲 𝗺𝗱 𝗿𝘂𝗻𝗻𝗶𝗻𝗴") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre(' https://whatsapp.com/channel/0029Vagq4pN9hXEy6SpCDi0X. ')

}
    });
