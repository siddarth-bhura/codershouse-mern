const crypto =  require('crypto');
const hashService= require('./hash-service')

const smsSid = process.env.TWILIO_SMS_SID;
const smsAuthToken = process.env.TWILIO_SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid,smsAuthToken,{
    lazyLoading: true
});

class OtpService{

     async generateOtp(){
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

async sendBySms(phone,otp) {
    // This was my mistake I didn't added the country code
    console.log(`+91${phone}`);
    return await twilio.messages.create({
        to: `+91${phone}`,
        from: process.env.TWILIO_SMS_FROM_NUMBER,
        body: `Your codershouse OTP is ${otp}`,
    });
}

verifyOtp(hashedOtp,data){
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp; 
}

}

module.exports = new OtpService();