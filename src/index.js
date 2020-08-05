const tmi = require("tmi.js")

const options = {
    options : {
        debug : true
    },
    connection : {
        reconnect : true
    },
    identity : {
        username : 'jututaru',
        password : 'oauth:1zgi1xgw4pq2we0yf351opp4l0c033'
    },
    channels : ['jututaru']
}

const client = new tmi.client(options)

client.connect()

client.on('connected', async (address, port) => {
    try{
        await client.action('jututaru', `Hello my friend ${address}:${port}`)
    }catch(error){
        console.log(error);
    }
})

client.on('chat', (target, ctx, message, self) => {
    
    if(self) return;
    
    console.log(target);
    console.log(ctx);

    const commanName = message.trim()

    if(commanName === '!hello'){
        client.say(target,`welcome ${ctx.username}`)
    }

    if(commanName === '!game'){
        client.say(target, `he gaming my magical academy`)
    }

    if(commanName === '!dice'){
        const dice = rollDice()
        client.say(target, `you rolling ${dice}`)
    }

})

function rollDice(){
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}