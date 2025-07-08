export type ResourceType = "book" | "author";

export type FilterTypes = {
	book: {
		title?: string;
		authorName?: string;
		publishedAfter?: Date;
		publishedBefore?: Date;
	};
	author: {
		name?: string;
		birthYear?: number;
	};
};

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
