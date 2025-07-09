import { Author, Book } from "../types";
import { Actions } from "./Actions";
import { isAuthor } from "../utils";

export const ResourceEntry = ({
	resource,
	refetch,
	isLastElement,
	updatePage,
}: {
	resource: Author | Book;
	refetch: () => void;
	isLastElement: boolean;
	updatePage: () => void;
}) => {
	const author = isAuthor(resource);
	return (
		<div className="bg-gray-800 shadow px-5 py-3 my-2 rounded">
			<div className="flex items-center gap-5 w-full" key={resource.id}>
				<p className="font-bold">{resource.id}</p>
				<div>
					<p className="font-semibold text-lg">
						{author ? resource.name : resource.title}
					</p>
					<p className="">
						{author ? resource.biography : resource.description}
					</p>
				</div>
				<div className="hidden md:block ml-auto">
					<Actions
						entry={resource}
						refetch={refetch}
						isLastElement={isLastElement}
						updatePage={updatePage}
					/>
				</div>
			</div>
			<div className="md:hidden w-full flex justify-center mt-2">
				<Actions
					entry={resource}
					refetch={refetch}
					isLastElement={isLastElement}
					updatePage={updatePage}
				/>
			</div>
		</div>
	);
};
