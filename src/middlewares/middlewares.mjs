
const logger = (req, res, next) => {
    console.log('Time:', new Date().toISOString(), req.method, req.url);
    next();
  };

export {logger};