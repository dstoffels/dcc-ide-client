import React, { useState, useEffect } from 'react';
import useLanguages from '../../hooks/useLanguages';

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
	const languages = useLanguages();
	const languageOptions = languages.map((l: any) => (
		<option key={l.id} value={l.monacoName}>
			{l.name}
		</option>
	));

	return (
		<div>
			<h6>Language</h6>
			<select value={value} onChange={(e) => onChange(e.target.value)}>
				{languageOptions}
			</select>
		</div>
	);
};

export default LanguageSelector;

export interface LanguageSelectorProps {
	value: any;
	onChange: Function;
}
