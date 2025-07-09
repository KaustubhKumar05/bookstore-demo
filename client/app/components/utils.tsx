import { Author, Book } from "../types";
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
	const keys = Object.keys(resource);
	if (isEqual(resource, formData)) return false;
	return !keys.some((key) => !formData[key as keyof (Book | Author)]);
};
