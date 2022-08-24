const amqp = require('amqplib/callback_api');

const opt = { credentials: require('amqplib').credentials.plain('guest', 'guest') };
amqp.connect('amqp://localhost', opt , (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err,channel) => {
        if(err){
            throw err;
        }
        let queueName = 'tecnical';
        channel.assertQueue(queueName,{
            durable: false
        });
        channel.consume(queueName,(msg) => {
            console.log(`Recived : ${msg.content.toString()}`);
            channel.ack(msg);
        });
    });
});