import { useState } from "react";
import { Review } from "../types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export const Reviews = ({
	reviews,
	loading,
}: {
	reviews?: Review[];
	loading: boolean;
}) => {
	const [index, setIndex] = useState(0);
	console.log("inner", { reviews });

	if (reviews?.length === 0) {
		return <></>;
	}

	if (loading) {
		return <p className="text-xl font-bold my-5">Loading...</p>;
	}

	return (
		<div className="flex items-center gap-4 w-full bg-gray-800 py-2">
			<button disabled={index === 0} onClick={() => setIndex(index - 1)}>
				<ChevronLeftIcon height={24} width={24} />
			</button>
			<div className="bg-gray-900 px-2 py-2 rounded">
				<h3 className="font-semibold text-sm">{reviews?.[index]?.username}</h3>
				<p className="text-sm mt-1">{reviews?.[index]?.reviewText}</p>
			</div>
			<button
				disabled={reviews && index === reviews?.length - 1}
				onClick={() => setIndex(index + 1)}
			>
				<ChevronRightIcon height={24} width={24} />
			</button>
		</div>
	);
};
