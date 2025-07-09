import { useEffect, useState } from "react";
import { DraftAuthor, DraftBook, ResourceType } from "../types";
import { Dialog } from "./Dialog";
import { allowCreation, DEFAULTS, formattedKey } from "./utils";
import { useAuthorList } from "../hooks/useAuthorList";
import { DropdownSelector } from "./DropdownSelector";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR, CREATE_BOOK } from "../queries";

export const CreateDialog = ({
	resourceType,
	open,
	setOpen,
	onConfirm,
}: {
	resourceType: ResourceType;
	open: boolean;
	setOpen: (state: boolean) => void;
	onConfirm: () => void;
}) => {
	const [formData, setFormData] = useState(DEFAULTS[resourceType]);
	const [enableSubmit, setEnableSubmit] = useState(false);

	const isAuthor = resourceType === "author";

	useEffect(() => {
		setFormData(DEFAULTS[resourceType]);
	}, [resourceType, open]);

	useEffect(() => {
		setEnableSubmit(allowCreation(formData));
	}, [formData]);

	const [createAuthor] = useMutation(CREATE_AUTHOR);
	const [createBook] = useMutation(CREATE_BOOK);

	const { authorOptions } = useAuthorList(isAuthor);

	const handleCreation = async () => {
		if (isAuthor) {
			await createAuthor({ variables: { input: formData } });
		} else {
			await createBook({ variables: { input: formData } });
		}
		onConfirm();
	};

	return (
		<Dialog title={`Add new ${resourceType}`} open={open} setOpen={setOpen}>
			<div className="flex flex-col">
				{Object.keys(formData).map((key) => (
					<div className="flex flex-col gap-1 my-2 text-sm" key={key}>
						<span>{formattedKey[key].replace("ID", "")}</span>
						{key === "authorId" ? (
							<DropdownSelector
								name="author-select"
								options={authorOptions}
								onSelect={(selectedOption) =>
									setFormData((prev) => ({
										...prev,
										authorId: selectedOption.id,
									}))
								}
							/>
						) : (
							<input
								className="border-2 rounded px-2 py-2 w-full"
								type={key.toLowerCase().includes("date") ? "date" : "text"}
								value={formData[key as keyof (DraftAuthor | DraftBook)]}
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
						className="px-4 py-2 bg-gray-700 text-sm disabled:opacity-80"
						onClick={async () => {
							await handleCreation();
							setOpen(false);
						}}
						disabled={!enableSubmit}
					>
						Create
					</button>
				</div>
			</div>
		</Dialog>
	);
};
