import { InfoCircledIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Author, Book } from "../types";
import { isAuthor } from "../utils";
import { InfoDialog } from "./InfoDialog";
import { useState } from "react";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK, DELETE_AUTHOR } from "../queries";

export const Actions = ({
	entry,
	refetch,
}: {
	entry: Author | Book;
	refetch: () => void;
}) => {
	const author = isAuthor(entry);
	const [showInfo, setShowInfo] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const [deleteResource, { loading }] = useMutation(
		author ? DELETE_AUTHOR : DELETE_BOOK
	);

	const handleDelete = async (id: string) => {
		await deleteResource({ variables: { id } });
		refetch();
	};

	return (
		<>
			<div className="flex gap-4">
				<button className="p-2 bg-black" onClick={() => setShowInfo(true)}>
					<InfoCircledIcon />
				</button>
				<button className="p-2 bg-black" onClick={() => setShowEditForm(true)}>
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
				onConfirm={() => refetch()}
			/>
			<DeleteDialog
				title={`Delete ${author ? "Author" : "Book"}?`}
				resource={entry}
				open={showDeleteConfirmation}
				setOpen={setShowDeleteConfirmation}
				onConfirm={() => handleDelete(entry.id)}
				loading={loading}
			/>
		</>
	);
};
