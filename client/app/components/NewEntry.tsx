import { useState } from "react";
import { ResourceType } from "../types";
import { CreateDialog } from "./CreateDialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const NewEntry = ({ selection }: { selection: ResourceType }) => {
	const [showCreateForm, setShowCreateForm] = useState(false);
	return (
		<>
			<button
				className="px-2 py-1 rounded bg-gray-700 flex items-center gap-2"
				onClick={() => setShowCreateForm(true)}
			>
				New Entry <PlusCircledIcon height={20} width={20} />
			</button>
			<CreateDialog
				open={showCreateForm}
				setOpen={setShowCreateForm}
				resourceType={selection}
			/>
		</>
	);
};
