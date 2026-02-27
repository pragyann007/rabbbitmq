import amqp from "amqplib"

const saveAutomation = async ()=>{

try {
        const connection = await amqp.connect("amqlib://localhost")
    
        const channel = await connection.createChannel();
    
        const exchange = "create_exchange"
          const exchange_type = "fanout"
    
    await channel.assertExchange(exchange,exchange_type,{durable:false})
    const quee = await channel.assertQueue("",{exclusive:true});
    
    channel.connection(quee.queue,(msg)=>{
        const message = JSON.parse(msg.content.toString());
    
        console.log(`message recieved =====>>> \n  ${message}`);
        channel.ack(msg)
    })
    
} catch (error) {

    console.log(`error is ${error}`);
    
}


    
}

saveAutomation()