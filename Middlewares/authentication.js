const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header contains a Bearer token
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send("Authorization header missing");

    // Extract token from the 'Authorization' header
    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).send("Authorization token missing");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send("Authorization token invalid");

    console.log("Requested user: ", decoded);
    req.user = decoded;  // Attach decoded user info to the request object
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = authentication;

// const jwt = require("jsonwebtoken")

// const authentication = async (req,res,next) =>{
//   try{
//     const token = req.cookies.token
//     if(!token) return res.status(401).send("autherization token missing")
  
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     if(!decoded) return res.status(401).send("autherization token invalid")
  
//     console.log("Requested user : ", decoded) 
//     req.user = decoded
//     next()
//   }
//   catch(err){
//     console.log(err)
//     res.status(500).send(err)
//   }
// }

// module.exports = authentication
