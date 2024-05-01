import { useState } from 'react';
import styles from '../styles/components/inputField.module.css';

interface InputFieldProps {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	placeholder,
	value,
	onChange,
	onKeyPress
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={`${styles.inputContainer} ${isFocused ? styles.focused : ''}`}
		>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onKeyPress={onKeyPress}
			/>
		</div>
	);
};

export default InputField;
