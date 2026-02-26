import amqlib from "amqplib"

const commentConsumer = async()=>{
    try {

        const connections = await amqlib.connect("amqlib://localhost");

        const channel = await connections.createChannel();

        const exchange= "automation_exchange";
        const exchange_type = "topic";

        const quee = "comment_automation_quee"

await channel.assertExchange(exchange,exchange_type,{durable:false})
await channel.assertQueue(quee,{durable:false})

console.log("waiting comment automationss ....")

channel.consume(quee,(msg)=>{
    console.log(`message resivedd from ${msg.fields.routingKey} msg is ${msg.content}  `)
    setTimeout(() => {
        console.log("automation complted..")
        
    }, 300);
    channel.ack(msg)

})



        
    } catch (error) {
        console.log(`error from somment consumer is ${error}`)
        
    }
}

commentConsumer()