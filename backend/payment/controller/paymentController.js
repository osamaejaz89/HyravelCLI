const stripe = require('stripe')(
  'sk_test_51I9pLfIr23z0Bl2uqMgcfXelHsgJmEK1Rkh4P9tMfmPBkQy67SIPEogarIIyAC07Ks2OZW1Dg73XjclqMYc9qug3001c6VoaIT',
);

const sendPayment = (req, res, next) => {
  const {amount, tokenId, email} = req.body;

  return stripe.customers
    .create({
      email: email,
      source: tokenId,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: amount,
        currency: 'eur',
        customer: customer.id,
        source: customer.default_source.id,
        description: 'Test payment',
      });
    })
    .then((result) => res.status(200).json(result));
};

exports.sendPayment = sendPayment;
