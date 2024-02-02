// Var
const {
    Client,
    GatewayIntentBits,
    Constants,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    EmbedBuilder,
    MessageButton,
    ButtonStyle,
    ModalBuilder,
    createMessageComponentCollector,
    StringSelectMenuBuilder,
    TextInputStyle,
    Discord,
    TextInputBuilder,
    Events,
    SlashCommandBuilder,
    getTextInputValue,
    InteractionResponseType,
    UserSelectMenuBuilder,
    ModalSubmitInteraction,
    ApplicationCommandOptionType,
  } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});
const axios = require('axios');
const moment = require('moment-timezone');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = config.port || 5002;
app.use(cors());
app.use(bodyParser.json());
const dataFilePath = 'data.json';

let data;
try {
    data = require('./data.json');
} catch (error) {
    console.error('Error loading data:', error.message);
    data = {};
}


// Function
async function gen_key(chuso) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'HN-';
    const charactersLength = characters.length;
    for (let i = 0; i < chuso; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function create_note(content,title) {
    try {
        const response = await axios.get(`https://web1s.com/note-api?token=${config.api_note}&content=${content}&title=${title}`)
        console.log("Data: ", response.data);
        console.log("Link rút gọn: ", response.data.shortenedUrl);
        return response.data.shortenedUrl
    } catch (error) {
        console.error('Yêu cầu thất bại:', error.message);
        return null;
    }
}

async function gen_link_get_key(code) {
    try {
        const destinationUrl = await create_note(`PS99 AUTO RANK KEY: ${code}`, `From HN GAMING With Love`);
        const response = await axios.get(`https://web1s.com/api?token=${config.api_link}&url=${destinationUrl}`)
        console.log("Data: ", response.data);
        console.log("Link rút gọn: ", response.data.shortenedUrl);
        return response.data.shortenedUrl
    } catch (error) {
        console.error('Yêu cầu thất bại:', error.message);
        return null;
    }
}

// main
app.get('/getkeyhn', async (req, res) => {
    const hwid = req.query.hwid;
    const code = await gen_key(20);
    const ngay_het_han = moment().add(1, 'days').format('DD-MM-YYYY HH:mm:ss');

    if (data[hwid]) {
        const currentDateTime = moment().tz('Asia/Ho_Chi_Minh');
        const keyExpirationDateTime = moment(data[hwid].ngay_het_han, 'DD-MM-YYYY HH:mm:ss');

        if (currentDateTime.isBefore(keyExpirationDateTime)) {
            res.json({ success: true, link_get_key: `${data[hwid].link_get_key}` });
        } else {
            try {
                const link_get_key = await gen_link_get_key(code);
                data[hwid] = {
                    key: `${code}`,
                    link_get_key: `${link_get_key}`,
                    ngay_het_han: `${ngay_het_han}`,
                };
                fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
                res.json({ success: true, link_get_key, ngay_het_han });
            } catch (error) {
                console.error('Error generating link_get_key:', error.message);
                res.json({ success: false, error: 'Failed to generate link_get_key' });
            }
        }
    } else {
        try {
            const link_get_key  = await gen_link_get_key(code);
            data[hwid] = {
                key: `${code}`,
                link_get_key,
                ngay_het_han: `${ngay_het_han}`,
            };
            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
            res.json({ success: true, link_get_key, ngay_het_han });
        } catch (error) {
            console.error('Error generating link_get_key:', error.message);
            res.json({ success: false, error: 'Failed to generate link_get_key' });
        }
    }
});
app.get('/checkkeyhn', async (req, res) => {
    const key = req.query.key;
    const hwid = req.query.hwid;

    if (!data[hwid]) {
        res.json({ success: false, error: 'HWID or Key does not valid!' });
    } else if (key != data[hwid].key) {
        res.json({ success: false, error: 'HWID or Key does not valid!' });
    } else {
        const currentDateTime = moment().tz('Asia/Ho_Chi_Minh');
        const keyExpirationDateTime = moment(data[hwid].ngay_het_han, 'DD-MM-YYYY HH:mm:ss');

        if (key === data[hwid].key && currentDateTime.isBefore(keyExpirationDateTime)) {
            res.json({ success: true, status: 'Key is valid' });
        }
    }
});
app.get('/', (req, res) => {
    res.send('Hello');
});

// run server
app.listen(port, '0.0.0.0', () => {
    const serverUrl = `http://${require('ip').address()}:${port}`;
    config.url = serverUrl;
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2), 'utf-8');
    console.log(`Server is running at ${serverUrl}`);
});
