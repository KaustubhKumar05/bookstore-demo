import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
	{
		review_text: { type: String, required: true },
		username: { type: String, required: true },
		bookId: { type: String, required: true },
	},
	{ timestamps: false }
);

export const Review = model("Review", reviewSchema);
