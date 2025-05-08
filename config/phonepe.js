const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const {
  PHONEPE_MERCHANT_ID,
  PHONEPE_MERCHANT_SECRET,
  PHONEPE_MERCHANT_USER_ID,
  PHONEPE_BASE_URL
} = process.env;

const generateXVerify = (payload) => {
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const saltKey = PHONEPE_MERCHANT_SECRET;
  const stringToSign = base64Payload + '/pg/v1/pay' + saltKey;

  const xVerify = crypto.createHash('sha256').update(stringToSign).digest('hex') + '###1';
  return { base64Payload, xVerify };
};

// exports.createPaymentLink = async (amount, callbackUrl) => {
//   const payload = {
//     merchantId: PHONEPE_MERCHANT_ID,
//     merchantTransactionId: `txn_${Date.now()}`,
//     merchantUserId: PHONEPE_MERCHANT_USER_ID,
//     amount: amount * 100, // convert ₹ to paise
//     redirectUrl: callbackUrl,
//     redirectMode: 'POST',
//     callbackUrl,
//     paymentInstrument: {
//       type: 'PAY_PAGE'
//     }
//   };

//   const { base64Payload, xVerify } = generateXVerify(payload);

//    // ✅ Debugging info
//    console.log('\n=== PhonePe Payment Request ===');
//    console.log('Payload:', payload);
//    console.log('Base64 Payload:', base64Payload);
//    console.log('X-VERIFY:', xVerify);
//    console.log('===============================\n');

//   const response = await axios.post(
//     PHONEPE_BASE_URL,
//     JSON.stringify({ request: base64Payload }),
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-VERIFY': xVerify,
//         'X-MERCHANT-ID': PHONEPE_MERCHANT_ID
//       }
//     }
//   );

//   return {
//     data: response.data.data,
//     paymentUrl: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay?request=${base64Payload}`
//   };
// };

exports.createPaymentLink = async (amount, callbackUrl) => {
  const mockTransactionId = `txn_${Date.now()}`;

  console.log('\n Using MOCK payment link instead of PhonePe\n');

  return {
    data: {
      merchantTransactionId: mockTransactionId
    },
    paymentUrl: `https://mock-payment.com/pay?txn=${mockTransactionId}`
  };
};
