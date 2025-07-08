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
						className="flex items-center gap-4 my-2 w-full text-sm"
						key={key}
					>
						<span>{formattedKey[key]}</span>
						<span>{resource[key as keyof (Book | Author)]}</span>
					</div>
				))}
				<div className="flex justify-center items-center w-full">
					<button
						className="px-4 py-2 bg-black text-sm font-semibold rounded cursor-pointer hover:opacity-90"
						onClick={() => setOpen(false)}
					>
						Close
					</button>
				</div>
			</div>
		</Dialog>
	);
};
