const {Ratelimit} = require("@upstash/ratelimit")
const {Redis} = require("@upstash/redis")
const dotenv =  require("dotenv")
dotenv.config()

// Create a rate limiter that allows ( )requests per ( s) 
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s") // 10 req , 20 sec
})

module.exports = ratelimit