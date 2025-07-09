export const Tab = ({
	currentValue,
	options,
	onClick,
}: {
	currentValue: string;
	options: string[];
	onClick: (option: string) => void;
}) => {
	return (
		<div className="flex gap-2 p-2 bg-gray-800 rounded">
			{options.map((option) => (
				<button
					key={option}
					className={`px-2 py-1 ${
						currentValue === option ? "bg-gray-900" : "bg-gray-800"
					} capitalize text-lg`}
					onClick={() => onClick(option)}
				>
					{option + "s"}
				</button>
			))}
		</div>
	);
};
