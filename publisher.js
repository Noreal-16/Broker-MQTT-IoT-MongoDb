const mqtt = require('mqtt');
const Uri = 'mqtt://localhost:9000';
const cliente = mqtt.connect(Uri);
cliente.on('connect', ()=>{
    setTimeout(()=>{
        for (let i = 0 ; i < 100 ; i++){
            cliente.publish('home/riego', `hello word ${i}`);
        }
    }, 3000);

    console.log("Mensaje enviado");
})

