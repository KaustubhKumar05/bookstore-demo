import { useState } from "react";
import { Author, Book } from "../types";
import { Dialog } from "./Dialog";
import { formattedKey } from "./utils";

export const EditDialog = ({
	resource,
	open,
	setOpen,
	title,
}: {
	resource: Book | Author;
	open: boolean;
	setOpen: (state: boolean) => void;
	title: string;
}) => {
	// TODO: implement validation, submit api request
	const [enableSubmit, setEnableSubmit] = useState(false);
	const [formData, setFormData] = useState(resource);
	return (
		<Dialog title={title} open={open} setOpen={setOpen}>
			<div className="flex flex-col">
				{Object.keys(resource).map((key) => (
					<div className="flex flex-col gap-1 my-2 w-full text-sm" key={key}>
						<span className="w-40 font-semibold">{formattedKey[key]}</span>
						{key === "description" ? (
							<textarea
								value={formData[key as keyof (Book | Author)]}
								required
								rows={4}
								className="resize-none border-2 rounded px-2 py-1"
								onChange={(e) => {
									setFormData((prev) => ({ ...prev, [key]: e.target.value }));
								}}
							/>
						) : (
							<input
								disabled={key === "id"}
								className="border-2 rounded px-2 py-2 disabled:border-0 w-full"
								type={key.toLowerCase().includes("date") ? "date" : "text"}
								required
								value={formData[key as keyof (Book | Author)]}
								onChange={(e) => {
									setFormData((prev) => ({ ...prev, [key]: e.target.value }));
								}}
							/>
						)}
					</div>
				))}
				<div className="flex justify-center gap-8 mt-4 items-center w-full">
					<button
						className="px-4 py-2 bg-black text-sm"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-gray-700 text-sm"
						onClick={() => setOpen(false)}
						disabled={!enableSubmit}
					>
						Update
					</button>
				</div>
			</div>
		</Dialog>
	);
};
