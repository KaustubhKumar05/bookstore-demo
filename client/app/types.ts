export type ResourceType = "book" | "author";

export type Author = {
	id: string;
	name: string;
	biography: string;
	bornDate: Date;
};

export type Book = {
	id: string;
	title: string;
	description: string;
	publishedDate: Date;
};
