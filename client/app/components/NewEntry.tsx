import { useState } from "react";
import { ResourceType } from "../types";
import { CreateDialog } from "./CreateDialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const NewEntry = ({
	selection,
	onCreation,
}: {
	selection: ResourceType;
	onCreation: () => void;
}) => {
	const [showCreateForm, setShowCreateForm] = useState(false);
	return (
		<>
			<button
				className="px-3 py-2 rounded bg-black flex items-center gap-2"
				onClick={() => setShowCreateForm(true)}
			>
				<PlusCircledIcon height={20} width={20} />
				New Entry
			</button>
			<CreateDialog
				open={showCreateForm}
				setOpen={setShowCreateForm}
				resourceType={selection}
				onCreation={onCreation}
			/>
		</>
	);
};
