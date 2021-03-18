const dbd = require("dbd.js")
 
const bot = new dbd.Bot({
  sharding: false, //true or false 
  shardAmount: 2, //Shard amount 
  mobile: false, //true or false - Discord Mobile Status
  //dbhToken: "API KEY", Remove // if using, get an API Key from their Server
  token: "TOKEN", //Discord Bot Token
  prefix: ["i!"] //Change PREFIX to your Prefix
})

bot.onMessage()

const fs = require('fs');
let dir = fs.readdirSync('./commands');

let i = 0;

handler: while (i < dir.length) {
    const stat = fs.statSync('./commands/' + dir[i]);

    if (stat.isDirectory()) {
        const readdir = fs.readdirSync('./commands/' + dir[i]);

        let nums = 0;
        while (nums < readdir.length) {
            dir.push(dir[i] + '/' + readdir[nums]);
            nums++;
        }
        i++;
        continue handler;
    } else if (stat.isFile()) {
        const command = require('./commands/' + dir[i]);
        try {
            bot[Object.keys(command)[0]](command[Object.keys(command)[0]]);
            i++;
            continue handler;
        } catch (err) {
            console.error(err.message);
            delete dir[i];

            continue handler;
        }
    } else {
        console.error('Directory was not a Folder or File');
        delete dir[i];

        continue handler;
    }
}