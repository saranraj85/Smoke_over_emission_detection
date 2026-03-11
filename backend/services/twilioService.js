const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function makeAlertCall(coValue, co2Value) {
  await client.calls.create({
    twiml: `<Response>
              <Pause length="1"/>
              <Say voice="alice">
                Attention. This is the Vehicle Emission Monitoring System.
              </Say>
              <Pause length="1"/>
              <Say voice="alice" loop="2">
                Emergency Alert. Dangerous gas levels detected. 
                Carbon Monoxide is at ${coValue} PPM. 
                Carbon Dioxide is at ${co2Value} PPM. 
                Please inspect the vehicle immediately.
              </Say>
              <Pause length="1"/>
              <Say voice="alice">
                Goodbye.
              </Say>
            </Response>`,
    to: process.env.TWILIO_TO_NUMBER,
    from: process.env.TWILIO_FROM_NUMBER,
  });
}

module.exports = {
  makeAlertCall,
};
