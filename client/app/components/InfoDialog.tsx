import { Author, Book } from "../types";
import { Dialog } from "./Dialog";
import { formattedKey } from "./utils";

export const InfoDialog = ({
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
	return (
		<Dialog title={title} open={open} setOpen={setOpen}>
			<div className="flex flex-col">
				{Object.keys(resource).map((key) => (
					<div
						className="flex flex-col gap-1 my-2 py-1 w-full text-sm border-dashed"
						key={key}
					>
						<span className="w-40 font-semibold text-gray-300">
							{formattedKey[key]}
						</span>
						<span>{resource[key as keyof (Book | Author)]}</span>
					</div>
				))}
				<div className="flex justify-center items-center w-full mt-4">
					<button
						className="px-4 py-2 bg-black text-sm"
						onClick={() => setOpen(false)}
					>
						Close
					</button>
				</div>
			</div>
		</Dialog>
	);
};
