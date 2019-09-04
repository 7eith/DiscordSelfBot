<h1 align="center">:package: DiscordSelfBot </h1>
<p align="center">my DiscordSelfBot (in-dev)</p>

# Disclaimer
WARNING: Selfbots are against Discord's TOS and can get you banned! (Not my fault if you get banned)

## How to install

```
git clone https://github.com/iSnkh/DiscordSelfBot
cd DiscordSelfBot
cp .env.example .env
fill .env
npm run start
```

## Filling .env
DISCORD_TOKEN: 
```
If you do not know how to get your token follow these steps:
    Ctrl + Shift + i in discord.
    Navigate to the network tab at the top.
    In the filter type api/v6
    Hit F5 (discord will restart)
    Click headers
    Scroll down and you will see authorization. The numbers and letters after that is your token.
```

DISCORD_USER_ID: enable dev settings in discord, copy identifiant

GITHUB_SECRET:
```
Go to settings/webhooks of your repository,
Add webhooks,
Payload URL: url of your bot (localhost not working github need to access url, by default dont provide a port except if you're changing it in .env)
Content-Type: application/json
Secret: generate a secret and keep it, its the GITHUB_SECRET
Click Add Webhook
```

## Functions
* **DiscordPushWebhook** - When you push a commit, its send to user configured in .env with a EmbedMessage
* **Change Status** - Change DiscordStatus (playing, listening or watching)

PS: new functions are coming soon. 