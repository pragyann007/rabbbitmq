import amqp from "amqplib";


const sendMail = async () => {

    try {
        // settung up connections 
        const connections = await amqp.connect("amqp://localhost");
        const channel = await connections.createChannel();

        const exchange = "mail_exchange"
        const routing_key = "mail_routing"

        const message = {
            from: "pragyantapaliya0272gmail.com",
            to: "universe@gmail.com",
            subject: "iloveyou",
            body: "You are crazy ."

        };

        await channel.assertExchange(exchange, "direct", { durable: false });
        await channel.assertQueue("maill_quee", { durable: false });
        await channel.bindQueue("maill_quee", exchange, routing_key);

        channel.publish(exchange, routing_key, Buffer.from(JSON.stringify(message)))

        console.log("msg sent sucess ")

        setTimeout(() => {
            connections.close();
        }, 500)


    } catch (error) {

        console.log("smth went wrong", error)

    }

}


sendMail()