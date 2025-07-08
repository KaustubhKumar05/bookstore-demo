import { Author, Book } from "../types";
import { EntryActions } from "./Actions";
import { isAuthor } from "./utils";

export const ResourceEntry = ({ resource }: { resource: Author | Book }) => {
	const author = isAuthor(resource);
	return (
		<div
			className="bg-gray-800 flex items-center gap-4 px-4 py-2 rounded my-1"
			key={resource.id}
		>
			<p className="text-sm font-bold">{resource.id}</p>
			<div>
				<p className="font-semibold">
					{author ? resource?.name : resource.title}
				</p>
				<p className="text-sm">
					{author ? resource.biography : resource.description}
				</p>
			</div>
			<EntryActions entry={resource} />
		</div>
	);
};
