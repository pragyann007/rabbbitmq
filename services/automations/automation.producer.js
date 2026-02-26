import amqplib from "amqplib";

const senAutomation = async (routing_key,message)=>{
    try {

        const connections = amqplib.connect("amqlib://localhost");

        const channel = await connections.createChannel();

        const exchange= "automation_exchange";
        const exchange_type = "topic";

        await channel.assertExchange(exchange,exchange_type,{durable:false});

        channel.publish(exchange,routing_key,Buffer.from(JSON.stringify(message)));
        console.log(`message produced from, this routing key : ${routing_key} and message is ${message}  `)


        setTimeout(() => {
            connections.close()
            
        }, 500);



        
    } catch (error) {
        console.log(`error is ${error}`)
        
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

const dmAutomation = {
    ig_id:"a10bc12d34",
    sys_id:"abc987",
    type:"dm_automation",
    trigger_text:"Hi",
    reply_text:"Hi this side user , how can we help you ???",
    user_subscription:"pro",
    automation_id:"a11299"
}


senAutomation("comment.automate",cmtAutomation)
senAutomation("dm.automation",dmAutomation)