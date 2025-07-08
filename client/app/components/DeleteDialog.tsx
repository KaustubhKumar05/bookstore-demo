import { Author, Book } from "../types";
import { Dialog } from "./Dialog";
import { isAuthor } from "./utils";

export const DeleteDialog = ({
	resource,
	open,
	setOpen,
	title,
	onConfirm,
}: {
	resource: Book | Author;
	open: boolean;
	setOpen: (state: boolean) => void;
	title: string;
	onConfirm: () => void;
}) => {
	const author = isAuthor(resource);
	return (
		<Dialog title={title} open={open} setOpen={setOpen} size="md">
			<div className="flex flex-col">
				<h3 className="font-semibold text-sm">
					Are you sure you want to delete the entry for{" "}
					{author ? resource.name : resource.title}? This action cannot be
					reverted.
				</h3>
				<div className="flex justify-center gap-8 items-center w-full mt-4">
					<button
						className="px-4 py-2 bg-black text-sm"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-red-500 text-sm"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</Dialog>
	);
};
