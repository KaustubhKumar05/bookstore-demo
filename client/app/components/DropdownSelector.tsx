import { useState } from "react";
import { DropdownOption } from "../types";

export const DropdownSelector = ({
	options,
	defaultValue,
	onSelect,
	name,
}: {
	options: DropdownOption[];
	defaultValue?: DropdownOption;
	onSelect: (option: DropdownOption) => void;
	name: string;
}) => {
	const [selection, setSelection] = useState<DropdownOption | undefined>(
		defaultValue
	);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption =
			options.find((opt) => opt.value === e.target.value) || defaultValue;
		if (selectedOption) {
			setSelection(selectedOption);
			onSelect(selectedOption);
		}
	};

	return (
		<div>
			<select
				name={name}
				className="px-2 py-1 rounded border-2 focus:outline-none cursor-pointer hover:opacity-90"
				value={selection?.value}
				onChange={handleChange}
			>
				{options?.map((option) => (
					<option
						className="bg-gray-700 cursor-pointer"
						key={option.value}
						value={option.value}
					>
						{option.value}
					</option>
				))}
			</select>
		</div>
	);
};
