/* ******************************************************************** */
/*                                                                      */
/*   [discordselfbot] app.js                                            */
/*                                                                      */
/*   Author: Snkh <inquiries@snkh.me>                                   */
/*                                                                      */
/*   Created: 03/09/2019 22:41:17 by Snkh                               */
/*   Updated: 04/09/2019 03:20:12 by Snkh                               */
/*                                                                      */
/*   Synezia Corp. (c) 2019 - MIT                                       */
/*                                                                      */
/* ******************************************************************** */

require('dotenv').config()

const { Client, RichEmbed } = require('discord.js');
const express = require("express");
const crypto = require('crypto');
const bufferEq = require('buffer-equal-constant-time');
const bodyParser = require("body-parser");

const token = process.env.DISCORD_TOKEN;
const prefix = process.env.DISCORD_PREFIX;
const secretKey = process.env.GITHUB_SECRET;

const app = express();
const client = new Client();

/**
 * Utilities
 */

function signData(secret, data) {
	return 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex');
}

function verifySignature(secret, data, signature, signData) {
	return bufferEq(new Buffer(signature), new Buffer(signData(secret, data)));
}

function sendNotifications(payload, userId) {
  const embed = 
  
  new RichEmbed()
    .setAuthor(payload.sender.login, payload.sender.avatar_url, payload.sender.html_url)
    .setColor(0x311B92)
    .setTitle(`Updated: [${payload.repository.name}]`)
    .setDescription(`Repository: ${payload.repository.html_url}`)
    .addField(payload.repository.name, `Repository was updated by ${payload.sender.login}. ( new commit(s) )`)
    .setFooter(`Powered by iSnkh/DiscordSelfBot`);

  client.users.get(userId).sendEmbed(embed);
  console.log(`[Github-Webhook] Notification send to ${client.users.get(userId).tag}`)
}

/**
 * Express JS
 */

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send();
})

app.post("/webhooks/github", function (req, res) {
    const payload = req.body;

    if (!verifySignature(secretKey, JSON.stringify(req.body), req.headers['x-hub-signature'], signData))
      return res.status(400).send({error: 'Failed to verify signature'});

    sendNotifications(payload, process.env.DISCORD_USER_ID);
    res.status(200).send({ success: true });
})

app.listen(process.env.PORT || 80);

/**
 * Discord Client 
 */

client.on('ready', () => {
  console.log(`[DiscordSelfBot] Account: ${client.user.tag}`);
  console.log(`[DiscordSelfBot] Prefix: ${prefix}`);
  console.log(`[DiscordSelfBot] Successfully started`);
});

client.on('message', async message => {
  const args = message.content.split(' ').slice(1)
  if(message.author.id != client.user.id) return;
  if(message.content.startsWith(`${prefix}playing`)) {
    message.delete();
    client.user.setActivity(args.join(' '));
  } else if(message.content.startsWith(`${prefix}watching`)) {
    message.delete();
    client.user.setActivity(args.join(' '), { type: 'WATCHING'});
  } else if(message.content.startsWith(`${prefix}listening`)) {
    message.delete();
    client.user.setActivity(args.join(' '), { type: 'LISTENING'});
  }
});

client.login(token);