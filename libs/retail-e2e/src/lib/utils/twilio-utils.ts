import Twilio from 'twilio';

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILIO_AUTH_TOKEN'];

export const getOtp = async (): Promise<string> => {
  if (!accountSid || !authToken) {
    console.log('Unable to find TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN as part of environment variables');
    return '';
  }
  const client = Twilio(accountSid, authToken);
  const response = await client.messages.list({ limit: 1 });
  if (!response?.length || !response[0].body) {
    return '';
  }
  return response[0].body.replace(/\D/g, '');
};
