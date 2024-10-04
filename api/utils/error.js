const errorHandler = (statusCode,message, errors = {}) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.errors= errors
    return error;
}

module.exports =  { errorHandler };