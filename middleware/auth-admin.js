const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN2");
    // retrieve the user details of the logged in user
    const admin = await decodedToken;
    // pass the the user down to the endpoints here
    req.admin = admin;
    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    res.clearCookie("TOKEN");
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
