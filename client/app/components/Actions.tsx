import { InfoCircledIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Author, Book } from "../types";
import { isAuthor } from "./utils";
import { InfoDialog } from "./InfoDialog";
import { useState } from "react";

export const EntryActions = ({ entry }: { entry: Author | Book }) => {
	const author = isAuthor(entry);
	const [showInfo, setShowInfo] = useState(false);
	return (
		<>
			<InfoDialog
				title={author ? "Author Details" : "Book Details"}
				resource={entry}
				open={showInfo}
				setOpen={setShowInfo}
			/>
			<div className="ml-auto flex gap-4">
				<button
					className="p-2 rounded bg-black cursor-pointer hover:opacity-90"
					onClick={() => setShowInfo(true)}
				>
					<InfoCircledIcon />
				</button>
				<button className="p-2 rounded bg-black cursor-pointer hover:opacity-90">
					<Pencil2Icon />
				</button>
				<button className="p-2 rounded bg-red-500 cursor-pointer hover:opacity-90">
					<TrashIcon strokeWidth={24} />
				</button>
			</div>
		</>
	);
};
