import { Author, Book, DraftAuthor, DraftBook, ResourceType } from "../types";
import { isEqual } from "lodash";

export const isAuthor = (resource: Book | Author) => "name" in resource;

export const formattedKey: Record<string, string> = {
	id: "ID",
	bornDate: "Date of Birth",
	publishedDate: "Published Date",
	name: "Name",
	title: "Title",
	biography: "Biography",
	description: "Description",
	authorName: "Author Name",
	publishedAfter: "Published After",
	publishedBefore: "Published Before",
	birthYear: "Birth Year",
	authorId: "Author ID",
};

export const LIST_CONFIG = {
	LIMIT: 5,
	OFFSET: 0,
};

export const allowUpdate = (
	resource: Book | Author,
	formData: Book | Author
): boolean => {
	const keys = Object.keys(formData);
	if (isEqual(resource, formData)) return false;
	return !keys.some((key) => !formData[key as keyof (Book | Author)]);
};

export const allowCreation = (formData: DraftAuthor | DraftBook) => {
	return !Object.keys(formData).some(
		(key) => !formData[key as keyof (DraftAuthor | DraftBook)]
	);
};

export const DEFAULTS: Record<ResourceType, DraftAuthor | DraftBook> = {
	book: {
		title: "",
		description: "",
		publishedDate: undefined,
		authorId: "",
	},
	author: { name: "", biography: "", bornDate: undefined },
};
