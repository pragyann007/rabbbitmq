import amqp from "amqplib"

const mail =async ()=>{

    try {

        const connection =await amqp.connect("amqp://localhost");
        const channe = await connection.createChannel();

  const exchange = "create_exchange"
      const exchange_type = "fanout"

      await channe.assertExchange(exchange,exchange_type,{durable:false})

      const quee = await channe.assertQueue("",{exclusive:true})

      await channe.bindQueue(quee.queue,exchange,"");
      

      console.log(`waiting for message ======>>>`)


      channe.consume(quee.queue,(msg)=>{
        const automation = JSON.parse(msg.content.toString())
        console.log("recieved msg ", automation)
        channe.ack(msg)
      })

        
    } catch (error) {

        console.log(`error is ${error}`)
        
    }

}

mail()