# Geenen Mail Mailgun service

This is a geenen-mail service for sending emails with MailGun as used by GeenenTijd.

## Options

- apiKey // Example: key-mymailgunkey
- domain // Example: geenentijd.be

## Example

This example uses the geenen-mail-mailgun service.

```
server.register({
  register: require('geenen-mail'),
  options: {
    service: require('geenen-mail-mailgun'),
    options: {
      apiKey: 'key-mymailgunkey',
      domain: 'geenentijd.be'
    }, // Options from the service
    path: `${__dirname}/../templates`, // Required, templates directory
    route: {
      path: '/my/mail/path', // Default /mail
      cors: true, // Default false
      auth: 'myAuth' // Default none
    }, // Optional, will add route to server when defined
    from: 'Glenn Geenen <glenn@geenentijd.be>' // Required, from fallback
    templates: [{
      name: 'contact', // Required, should be name of the hbs file
      subject: 'Contact Form', // Required, subject fallback
      schema: Joi.object({
        message: Joi.string().required()
      }), // Optional, joi validation schema
    }]
  }
});
```