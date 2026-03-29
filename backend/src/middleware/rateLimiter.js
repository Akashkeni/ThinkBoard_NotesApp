const ratelimit = require("../config/upstash.js");

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")

        if(!success){
            return res.status(429).json({
                message:"Too many requests , please Try again Later"
            })
        }
        next()
    } catch (error) {
        console.log("Rate limit error:",error)
        next(error)
    }
    
};

module.exports = rateLimiter;
