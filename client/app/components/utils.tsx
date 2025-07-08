import { Author, Book } from "../types";

export const isAuthor = (resource: Book | Author) => "name" in resource;

export const formattedKey: Record<string, string> = {
	id: "ID",
	bornDate: "Date of Birth",
	publishedDate: "Published Date",
	name: "Name",
	biography: "Biography",
	description: "Description",
};
