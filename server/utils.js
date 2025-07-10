import crypto from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = (password) =>
	crypto.pbkdf2Sync(password, "some_salt", 1000, 64, "sha512").toString("hex");

export const getJWTToken = (user) =>
	jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: "12h",
	});

export const authMiddleware = async (resolve, parent, args, context, info) => {
	if (
		["logIn", "signUp", "user", "username", "token"].includes(info.fieldName)
	) {
		return resolve(parent, args, context, info);
	}
	if (!context.user) {
		throw new Error("Not authenticated");
	}
	return resolve(parent, args, context, info);
};
