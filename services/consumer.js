import amqp from "amqplib"


const recicveMail = async()=>{
    try {
                const connections = await amqp.connect("amqp://localhost");
                const channel = await connections.createChannel();

                await channel.assertQueue("maill_quee",{durable:false})

                channel.consume("maill_quee",(msg)=>{
                    console.log("msge recieved from ",JSON.parse(msg.content));

                })
        
    } catch (error) {
        
    }
}


recicveMail()