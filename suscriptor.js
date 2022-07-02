const mqtt = require('mqtt');
const mongo = require('mongodb');

/**
 * Connection to MongoDB
 * @type {string}
 */
const mongoC = mongo.MongoClient;
const uriMongo = 'mongodb://localhost:27017/mqttJs';

/**
 * Connection to MQTT
 * @type {string}
 */
const Uri = 'mqtt://localhost:9000';
const cliente = mqtt.connect(Uri);
cliente.on('connect', ()=>{
    cliente.subscribe('home/riego');
})

cliente.on('message', (topic, payload)=>{
    console.log("El topic es " , topic, " el mensaje es " , payload.toString());

    /**
     * Guardar en la BD
     */
    mongoC.connect(uriMongo, (error, client) =>{
        const myColection = client.db('mqttJs').collection('mqttJs');
        myColection.insertOne({
            date: new Date(),
            message: payload.toString(),
            topic: topic
        },()=>{
           console.log("Data enviada a MongoDb");
           client.close();
        })
    })

})