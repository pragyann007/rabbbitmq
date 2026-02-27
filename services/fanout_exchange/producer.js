import {amqp} from "amqplib"

const automationCreated = async (automation)=>{
  try {
      const connectioons = await amqp.connect("amqp://localhost")
      const channel = await connectioons.createChannel();
  
      const exchange = "create_exchange"
      const exchange_type = "fanout"
  
      await channel.assertExchange(exchange,exchange_type,{durable:false})
  
      const message = JSON.stringify(automation);
  
      channel.publish(exchange,"",Buffer.from(message),{persistent:false});
      console.log("sent message =====>>>>> ");

      setTimeout(() => {

        connectioons.close();
        
      }, 500);
  } catch (error) {

    console.log(`error iss ${error}`)
    
  }


}

const cmtAutomation = {
  ig_id:"a10bc12d34",
  sys_id:"abc987",
  type:"comment_automation",
  trigger_text:"link",
  reply_text:"instagram.com/pragyann007",
  user_subscription:"pro",
  automation_id:"a11298"
}


automationCreated(cmtAutomation);