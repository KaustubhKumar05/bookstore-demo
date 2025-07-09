import { useQuery } from "@apollo/client";
import { GET_AUTHOR_LIST } from "../queries";
import { Author, DropdownOption } from "../types";

export const useAuthorList = (skip: boolean) => {
	const { data, loading, error } = useQuery(GET_AUTHOR_LIST, {
		fetchPolicy: "cache-and-network",
		skip,
	});

	const authorOptions: DropdownOption[] = data?.authors?.items?.map(
		(item: Author) => ({
			value: item.name,
			id: item.id,
		})
	);

	return { authorOptions, loading, error };
};
