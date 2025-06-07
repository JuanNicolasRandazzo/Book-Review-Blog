const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2');
require('dotenv').config();

// Crear cliente SES
const sesClient = new SESv2Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Función para enviar email
const sendEmail = async (to, subject, html) => {
    const params = {
        FromEmailAddress: process.env.EMAIL_FROM_ADDRESS,
        Destination: {
            ToAddresses: [to],
        },
        Content: {
            Simple: {
                Subject: {
                    Data: subject,
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: html,
                        Charset: 'UTF-8',
                    },
                },
            },
        },
    };

    try {
        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);
        console.log('Email sent successfully:', response.MessageId);
        return response;
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Failed to send email');
    }
};

module.exports = sendEmail;
