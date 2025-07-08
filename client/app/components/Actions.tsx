import { InfoCircledIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Author, Book } from "../types";
import { isAuthor } from "./utils";
import { InfoDialog } from "./InfoDialog";
import { useState } from "react";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";

export const EntryActions = ({ entry }: { entry: Author | Book }) => {
	const author = isAuthor(entry);
	const [showInfo, setShowInfo] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	return (
		<>
			<div className="ml-auto flex gap-4">
				<button
					className="p-2 bg-black"
					onClick={() => setShowInfo(true)}
				>
					<InfoCircledIcon />
				</button>
				<button
					className="p-2 bg-black"
					onClick={() => setShowEditForm(true)}
				>
					<Pencil2Icon />
				</button>
				<button
					className="p-2 bg-red-500"
					onClick={() => setShowDeleteConfirmation(true)}
				>
					<TrashIcon strokeWidth={24} />
				</button>
			</div>

			<InfoDialog
				title={`${author ? "Author" : "Book"} Details`}
				resource={entry}
				open={showInfo}
				setOpen={setShowInfo}
			/>
			<EditDialog
				title={`Edit ${author ? "Author" : "Book"} Details`}
				resource={entry}
				open={showEditForm}
				setOpen={setShowEditForm}
			/>
			<DeleteDialog
				title={`Delete ${author ? "Author" : "Book"}?`}
				resource={entry}
				open={showDeleteConfirmation}
				setOpen={setShowDeleteConfirmation}
			/>
		</>
	);
};
