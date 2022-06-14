const { config } =  require("dotenv");
config({ path: "./config/config.env"});

const jwt = require("jsonwebtoken");

let privateKey = process.env.JWT_SECRET

const createToken = (user) => {
	var issuedAt = new Date();
	var expiry_date = Math.floor(issuedAt / 1000) + (60 * 60 * 24 * 365)
	expiry_date = expiry_date+30000000
	console.log(expiry_date, privateKey)
	const token = jwt.sign({ userID: user._id, exp:expiry_date }, privateKey);
	return token
}

module.exports = {createToken}