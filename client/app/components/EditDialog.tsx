import { useEffect, useState } from "react";
import { Author, Book } from "../types";
import { Dialog } from "./Dialog";
import { allowUpdate, formattedKey, isAuthor } from "../utils";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, UPDATE_BOOK } from "../queries";
import { DropdownSelector } from "./DropdownSelector";
import { useAuthorList } from "../hooks/useAuthorList";

export const EditDialog = ({
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
	const [enableSubmit, setEnableSubmit] = useState(false);
	const [formData, setFormData] = useState(resource);

	const [updateResource, { loading }] = useMutation(
		author ? UPDATE_AUTHOR : UPDATE_BOOK
	);

	const handleUpdate = async (id: string) => {
		const input: Record<string, string | Date> = { ...formData };
		["id", "__typename"].forEach((key) => delete input[key]);

		await updateResource({ variables: { id, input } });
		onConfirm();
	};

	const { authorOptions } = useAuthorList(author);

	useEffect(() => {
		setEnableSubmit(allowUpdate(resource, formData));
	}, [resource, formData]);

	return (
		<Dialog title={title} open={open} setOpen={setOpen}>
			<div className="flex flex-col">
				{!author ? (
					<div>
						<span className="w-40 font-semibold">Author</span>
						<DropdownSelector
							name="author-select"
							defaultValue={authorOptions?.find(
								(assignedAuthor) =>
									assignedAuthor.id === (formData as Book).authorId
							)}
							options={authorOptions}
							onSelect={(selectedOption) =>
								setFormData((prev) => ({
									...prev,
									authorId: selectedOption.id,
								}))
							}
						/>
					</div>
				) : (
					<></>
				)}
				{Object.keys(resource)
					.filter((key) => !key.toLowerCase().includes("id"))
					.map((key) => (
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
									className="border-2 rounded px-2 py-2 w-full"
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
						onClick={async () => {
							await handleUpdate(resource.id);
							setOpen(false);
						}}
						disabled={!enableSubmit || loading}
					>
						{loading ? "Updating..." : "Update"}
					</button>
				</div>
			</div>
		</Dialog>
	);
};
