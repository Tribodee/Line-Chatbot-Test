const line = require('@line/bot-sdk')
const express = require('express')
const axios = require('axios').default
const dotenv = require('dotenv')
const env = dotenv.config().parsed
const app = express()
const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
}
const client = new line.Client(lineConfig);
app.post('/webhook', line.middleware(lineConfig), async (req, res) =>{
    try{
        const events = req.body.events
        console.log('event=>>>>' ,events)
        await Promise.all(events.map(async item => await handleEvent(item)));

        res.status(200).send('OK');
    }
    catch (error) {
        res.status(500).end()
    }
});
const handleEvent = async (event) => {
    if (event.type === 'message' && event.message.text == 'Game Free'){
        try {
            const {data} = await axios.get(`https://${env.RAPID_URL}/epic-free-games`,{
                headers: {
                    'X-RapidAPI-Host': env.RAPID_URL,
                    'X-RapidAPI-Key': env.RAPID_KEY
                }
            })
            console.log("Data=>>>>",data)
            const dataformatted = data.map(item => ({
                name: item.name,
                description: item.description,
                originalPrice: item.originalPrice,
                appUrl: item.appUrl,
                offerImageOrigin: item.offerImageTall,
                offerImagePreview: item.offerImageWide
            }))
            const message = dataformatted.map(data => `Game Name: \n${data.name}\nDescription: \n${data.description}\nFull Price: ${data.originalPrice}\nlink: \n${data.appUrl}`).join('\n\n');
            const lineimgOrigin = dataformatted.map(data => `${data.offerImageOrigin}`).join('\n\n');
            const lineimgPreview = dataformatted.map(data => `${data.offerImagePreview}`).join('\n\n');
            console.log("Data_message=>>>>",message)
            console.log("Img=>>>>",lineimgOrigin,lineimgPreview)
            return client.replyMessage(event.replyToken, [
                { type: 'text', text: message },
                { type: 'image', originalContentUrl: lineimgOrigin, previewImageUrl: lineimgPreview }
            ]);
        } catch (error) {
            console.error('Something wrong on API:', error);
            return client.replyMessage(event.replyToken, { type: 'text', text: 'Something wrong on API' });
        }
    }
    else if(event.type !== 'message' || event.message.type !== 'text'){
        return client.replyMessage(event.replyToken,{type:'text',text:'error'})
    }
}
// const PORT = process.env.PORT || 3000;
const PORT = 4000 //for test
app.listen(PORT, () => {
    console.log(PORT)
    console.log(`Listening on port ${PORT}`);
});