// ExpressError extends Error{
//     constructor(statusCode, message){
//         super();
//         this.statusCode = statusCode;
//          this.message = message;
//     }
// }
// module.exports = ExpressError;
class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass the message to the built-in Error constructor
        this.statusCode = statusCode;
        // Optional: Maintain proper stack trace (especially useful in debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;
