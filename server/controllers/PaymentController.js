const midtransClient = require('midtrans-client');

class PaymentController {
    static async midtransPayment(req, res, next) {
        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let idToken = new Date().getTime()
            let parameter = {
                "transaction_details": {
                    "order_id": `TRX-MG-${idToken}`,
                    "gross_amount": req.body.totalPrice
                }
            };

            snap.createTransaction(parameter)
                .then((transaction) => {
                    let transactionToken = transaction.token;
                    // console.log('transactionToken:', transactionToken);
                    res.status(200).json({ transaction_token: transactionToken })
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController;