const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
    .document('buy_requests/{requestId}')
    .onCreate(event => {
        const requestId = event.params.requestId;
        const db = admin.firestore()
        return db.collection('buy_requests').doc(requestId)
                 .get()
                 .then(doc => {
                    const user = doc.data()
                    const emails = [
                        {
                            to: user.email,
                            from: 'One-Art.org <info@one-art.org>',
                            replyTo: 'Илья <poglazovi@gmail.com>',
                            subject:  'Ваша заявка с One-Art.org принята!',
                            // text: `Hey ${toName}. You have a new follower!!! `,
                            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                
                            // custom templates
                            templateId: '27b3870f-b8e7-43bb-be01-3f16b2171744',
                            substitutionWrappers: ['{{', '}}'],
                            substitutions: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            message: user.message,
                            work: user.work
                            // and other custom properties here
                            }
                        },
                        {
                            to: 'maksimvaletov159rus@gmail.com',
                            from: 'One-Art.org <info@one-art.org>',
                            replyTo: 'Илья <poglazovi@gmail.com>',
                            subject:  'Новый заказ с One-Art.org!',
                            // text: `Hey ${toName}. You have a new follower!!! `,
                            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                
                            // custom templates
                            templateId: '27b3870f-b8e7-43bb-be01-3f16b2171744',
                            substitutionWrappers: ['{{', '}}'],
                            substitutions: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            message: user.message,
                            work: user.work
                            // and other custom properties here
                            }
                        }
                    ];
                    return sgMail.send(emails)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});

exports.firestoreEmailContact = functions.firestore
    .document('contact_requests/{requestId}')
    .onCreate(event => {
        const requestId = event.params.requestId;
        const db = admin.firestore()
        return db.collection('contact_requests').doc(requestId)
                 .get()
                 .then(doc => {
                    const user = doc.data()
                    const emails = [
                        {
                            to: user.email,
                            from: 'One-Art.org <info@one-art.org>',
                            replyTo: 'Илья <poglazovi@gmail.com>',
                            subject:  'Ваше сообщение для One-Art.org отправлено!',
                            // text: `Hey ${toName}. You have a new follower!!! `,
                            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                
                            // custom templates
                            templateId: '76f6d0b9-d19f-4aba-a8d3-c18309002c63',
                            substitutionWrappers: ['{{', '}}'],
                            substitutions: {
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                message: user.message
                                // and other custom properties here
                            }
                        },
                        {
                            to: 'maksimvaletov159rus@gmail.com',
                            from: 'One-Art.org <info@one-art.org>',
                            replyTo: 'Илья <poglazovi@gmail.com>',
                            subject:  'Новое сообщение с One-Art.org!',
                            // text: `Hey ${toName}. You have a new follower!!! `,
                            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                
                            // custom templates
                            templateId: '76f6d0b9-d19f-4aba-a8d3-c18309002c63',
                            substitutionWrappers: ['{{', '}}'],
                            substitutions: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            message: user.message
                            // and other custom properties here
                            }
                        }
                    ];
                    return sgMail.send(emails)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});
