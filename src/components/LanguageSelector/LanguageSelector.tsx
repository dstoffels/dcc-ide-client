import React, { useState, useEffect } from 'react';
import useLanguages from '../../hooks/useLanguages';

const LanguageSelector = ({ value, onChange, disabled }: LanguageSelectorProps) => {
	const languages = useLanguages();
	const languageOptions = languages.map((l: any) => (
		<option key={l.id} value={l.monacoName}>
			{l.name}
		</option>
	));

	return (
		<div className="">
			<label className="block text-xs">Language</label>
			<select
				disabled={disabled}
				className="border rounded px-1 py-2"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{languageOptions}
			</select>
		</div>
	);
};

export default LanguageSelector;

export interface LanguageSelectorProps {
	value: any;
	onChange: Function;
	disabled?: boolean;
}
