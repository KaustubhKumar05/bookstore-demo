import crypto from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = (password) =>
	crypto.pbkdf2Sync(password, "some_salt", 1000, 64, "sha512").toString("hex");

export const getJWTToken = (user) =>
	jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: "12h",
	});
