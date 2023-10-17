import { MouseEventHandler } from 'react';

const Button = ({ onClick, children, disabled }: ButtonProps) => {
	return (
		<button
			className={` h-min py-2 px-3 rounded ${
				disabled ? 'opacity-50 bg-gray-700' : 'bg-blue-900 hover:bg-blue-800 cursor-pointer'
			}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;

export interface ButtonProps {
	children?: any;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}
