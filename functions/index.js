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
                    const msg = {
                        to: user.email,
                        from: 'hello@angularfirebase.com',
                        subject:  'New Buy Request',
                        // text: `Hey ${toName}. You have a new follower!!! `,
                        // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            
                        // custom templates
                        templateId: '27b3870f-b8e7-43bb-be01-3f16b2171744',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: user.name
                          // and other custom properties here
                        }
                    };
                    return sgMail.send(msg)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});