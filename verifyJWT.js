const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyJWT = (req) => {
    try {
        const receivedJwt = req.headers["authorization"];
        if (receivedJwt) {
            const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            return decodedJwt;
        } else {
            throw new ReferenceError("jwt must be provied");
        }
    } catch (err) {
        console.log(err.name);
        console.log(err.message);

        return err;
    }
};

module.exports = verifyJWT;
