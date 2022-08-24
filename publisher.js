const amqp = require('amqplib/callback_api');

const opt = { credentials: require('amqplib').credentials.plain('guest', 'guest') };
amqp.connect('amqp://localhost', opt, (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queueName = 'tecnical';
        for (let i = 0; i < 3; i++) {
            const rnd = Math.random(99)
            let message = `This is tecnical message ${rnd}`;
            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(message));
            console.log(`Message : ${message}`);
        }
        let message = '-------- ';
        channel.sendToQueue(queueName, Buffer.from(message));
        setTimeout(() => {
            connection.close();
        }, 1000);
    });
});