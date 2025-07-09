export type ResourceType = "book" | "author";

export type FilterTypes = {
	book: {
		title?: string | null;
		authorName?: string | null;
		publishedAfter?: Date | null;
		publishedBefore?: Date | null;
	};
	author: {
		name?: string | null;
		birthYear?: number | null;
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
	authorId?: string;
};

export type DropdownOption = {
	value: string;
	id: string;
};

export type DraftBook = {
	title?: string;
	description?: string;
	publishedDate?: Date;
	authorId?: string;
};

export type DraftAuthor = {
	name?: string;
	biography?: string;
	bornDate?: Date;
};
