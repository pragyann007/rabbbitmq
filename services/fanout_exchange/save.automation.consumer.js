import amqp from "amqplib"

const saveAutomation = async ()=>{

try {
        const connection = await amqp.connect("amqp://localhost")
    
        const channel = await connection.createChannel();
    
        const exchange = "create_exchange"
          const exchange_type = "fanout"
    
    await channel.assertExchange(exchange,exchange_type,{durable:false})
    const quee = await channel.assertQueue("",{exclusive:true});

    await channel.bindQueue(quee.queue,exchange,"")
    
    channel.consume(quee.queue,(msg)=>{
        const message = JSON.parse(msg.content.toString());
    
        console.log(`message recieved =====>>> \n  ${message}`);
        channel.ack(msg)
    })
    
} catch (error) {

    console.log(`error is ${error}`);
    
}


    
}

saveAutomation()