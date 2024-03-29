const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res,next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user; // Attach the decoded user to the request object
      
      next(); // Proceed to the next middleware/route handler
      
    });


  } catch (err) {
    console.error(err.message);
    return res.sendStatus(500);
  }
};



module.exports = authmiddleware