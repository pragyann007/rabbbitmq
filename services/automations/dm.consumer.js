import amqp from "amqplib"

const dmConsumer = async()=>{
    try {
        const connections = await amqp.connect("amqp://localhost");
    
        const channel =await  connections.createChannel();
        const exchange= "automation_exchange";
        const exchange_type = "topic";
        const quee = "dm_automation_quee"
    
        await channel.assertExchange(exchange,exchange_type,{durable:false})
        await channel.assertQueue(quee,{durable:false})
        await channel.bindQueue(quee,exchange,"dm.*")
    
        console.log("waiting for message ....")
    
        channel.consume(quee,(msg)=>{
            console.log(`message resivedd from ${msg.fields.routingKey} msg is ${msg.content}  `)
            setTimeout(() => {
                console.log("automation complted..")
                
            }, 300);
            channel.ack(msg)
        })
    } catch (error) {
        console.log(`error is ${error}`)
        
    }

}

dmConsumer()