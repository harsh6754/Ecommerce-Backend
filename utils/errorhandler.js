class ErrorHander extends Error{
    constuctor(message,statusCode){
        Super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constuctor)
    }
}

module.exports = ErrorHander;