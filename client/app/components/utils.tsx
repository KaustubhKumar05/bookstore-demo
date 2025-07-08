import { Author, Book } from "../types";

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
};

export const LIST_CONFIG = {
	LIMIT: 5,
	OFFSET: 0,
};