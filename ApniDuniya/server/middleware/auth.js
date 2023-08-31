// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({error:"Access Denied",token:token,token2:'no undefined'});
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(token);
    try{
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("yess!!")
      req.user = verified;
    }
    catch(err){
      console.log("nooo!!"+err)
      return res.status(400).json({error:"Invalid Token",token:token,token2:'no undefined'});
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// this will verify the token and check if the user is admin or not 
// if the user is admin then it will call the next function else it will send a 403 status code
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {verifyToken,verifyTokenAndAdmin};
