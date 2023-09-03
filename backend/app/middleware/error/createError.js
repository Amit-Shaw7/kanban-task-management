
export const createError = (error, req, res, next) => {    
    console.log(error.stack);
    const status = error.statusCode ? error.statusCode : 500;

    return res.status(status).json({
        msg: error.message
    });
}