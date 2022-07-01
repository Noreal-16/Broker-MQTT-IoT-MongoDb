const mosca = require('mosca');

const setting = {
    port: 9000,
}

let server = new mosca.Server(setting);

server.on('ready',()=>{
    console.log("Broker connect");
} )

server.on('clientConnected', (client)=>{
    console.log("New Client " + client.id );
})

server.on('published', (packet)=>{
    console.log(packet.payload.toString());
})