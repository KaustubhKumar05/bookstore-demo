"use client";
import { gql, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
	query GetAuthors {
		authors(limit: 10, offset: 0, filter: {}) {
			id
			name
			biography
		}
	}
`;

export const List = () => {
	const { data, loading, error } = useQuery(GET_AUTHORS);
	console.log("debug>", { data, loading, error });
	if (error) {
		return <p>Error: {error.message}</p>;
	}
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{data.map((item: Record<string, string>) => (
				<div key={item.id}>
					<p>{item.name}</p>
				</div>
			))}
		</>
	);
};
