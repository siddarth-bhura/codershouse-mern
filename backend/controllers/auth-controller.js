const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')

class AuthController {

    async sendOtp(req,res){
        
        // Get phone number from Request
        const {phone} = req.body;
        
        //Validate phone number
        if(!phone){
            res.status(400).json({message: 'Phone field is required'})
        }

        //Generate Otp
        const otp = await otpService.generateOtp();

        // Create time to live - Expiry time
        const ttl = 1000 * 60 * 2; // Expiry Time
        const expires = Date.now() + ttl;
        
        //Hash the otp
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        //Send the otp using Twilio
        try{
            await otpService.sendBySms(phone,otp);
            return res.json({
                hash: `${hash}.${expires}`,
                phone
            })
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Message sending failed'});
        }
    }

    async verifyOtp(req,res){

        // Get otp, hash and phone number from the request
        const {otp, hash, phone} = req.body;
        
        //Validate data
        if(!otp || !hash || !phone){
            res.status(400).json({message: 'All fields are required'});
        }

        //Check otp expiry status
        const [hashedOtp , expires] = hash.split('.');
        if(Date.now()> +expires){
            res.status(400).json({message: 'OTP expired'})
        }

        // Generate Hash using same data and verify it
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp,data);
        if(!isValid){
            res.status(400).json({message: 'Invalid Otp'});
        }

        let user;
        
        //Search user in the database or create one is doesn't exist
        try{
            user = await userService.findUser({phone});
            if(!user){
                await userService.createUser({phone})
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Db error'});
        }
        
        //Generate Token for authentication
        const {accessToken,refreshToken} = tokenService.generateTokens({_id: user._id,activated: false})

        //Store refresh Token in Cookie so that user doesn't need to login everytime
        res.cookie('refreshToken',refreshToken, {
            maxAge: 1000 *60 *60 * 24 * 30,
            httpOnly: true
        });

        const userDto = new UserDto(user);

        //Send the response 
        res.json({accessToken,user: userDto})
    }
}

module.exports = new AuthController();