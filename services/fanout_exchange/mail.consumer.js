import amqp from "amqplib"

const mail =async ()=>{

    try {

        const connection =await amqp.connect("amqp://localhost");
        const channe = await amqp.createChannel();

  const exchange = "create_exchange"
      const exchange_type = "fanout"

      await channe.assertExchange(exchange,exchange_type,{durable:false})

      const quee = await channe.assertQuee('',{exclusive:true});

      console.log(`waiting for message ======>>>`)


      channe.consume(quee.quee,(msg)=>{
        const automation = JSON.parse(msg.content.toString())
        console.log("recieved msg ", automation)
        channe.ack(msg)
      })

        
    } catch (error) {

        console.log(`error is ${error}`)
        
    }

}