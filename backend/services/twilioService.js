const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function makeAlertCall(coValue, co2Value) {
  try {
    const call = await client.calls.create({
      twiml: `<Response>
                <Say voice="Polly.Amy">
                  Attention. This is the Vehicle Emission Monitoring System.
                  Emergency Alert. Dangerous gas levels detected. 
                  Carbon Monoxide is at ${coValue} PPM. 
                  Carbon Dioxide is at ${co2Value} PPM. 
                  Please inspect the vehicle immediately.
                  Goodbye.
                </Say>
              </Response>`,
      to: process.env.TWILIO_TO_NUMBER,
      from: process.env.TWILIO_FROM_NUMBER,
    });
    console.log(`[TWILIO] Call initiated successfully. SID: ${call.sid}`);
    return call;
  } catch (error) {
    console.error(`[TWILIO] Error making call: ${error.message}`);
    throw error;
  }
}

module.exports = {
  makeAlertCall,
};
