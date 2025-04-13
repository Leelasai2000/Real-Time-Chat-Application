const jwt = require("jsonwebtoken"); // import JWT package
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, // payload (data inside token)
        process.env.JWT_SECRET, // secret key to sign the token
        { expiresIn: "30d" } // token will expire in 30 days
      );
};
module.exports = generateToken;
