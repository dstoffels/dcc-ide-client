'use client';
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import useEmmet from '../../hooks/useEmmet';
import judgeAPI from '../../utils/judgeAPI';
import { ValidLanguages } from 'hooks/useLanguages';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';

const IDE = ({ defaultValue = '', initLanguage = 'javascript' }: IDE_Props) => {
	const [source_code, setSourceCode] = useState<string | undefined>(defaultValue);
	const [results, setResults] = useState<ResultObj | any>(null);
	const [language, setLanguage] = useState(initLanguage);

	useEffect(() => {
		useEmmet();
	}, []);

	const runCode = async () => {
		const fetchResults = async () => {
			return await judgeAPI.get(
				`http://localhost:2358/submissions/${response.data.token}?API_KEY=12345`,
			);
		};

		const body = {
			source_code,
			language_id: 63,
			stdin: `console.log('hello squirrel);`,
			expected_output: 'hello squirrel',
		};

		let response = await judgeAPI.post(`http://localhost:2358/submissions?API_KEY=12345`, body);
		response = await fetchResults();
		while (response?.data?.status?.description === 'In Queue') response = await fetchResults();

		setResults(response.data);
	};

	return (
		<div>
			<div className="flex gap-5">
				<button onClick={runCode} disabled={!source_code}>
					Run Code
				</button>
				<LanguageSelector value={language} onChange={setLanguage} />
			</div>
			<Editor
				height="50vh"
				value={source_code}
				onChange={(value) => setSourceCode(value)}
				theme="vs-dark"
				language={language}
			/>
			<div>
				<div>{results?.stdout}</div>
				<span>{results?.status?.description}</span>
			</div>
		</div>
	);
};

export default IDE;

interface IDE_Props {
	defaultValue?: string;
	initLanguage?: ValidLanguages[number];
}

interface ResultObj {
	stdout: string;
	status: { description: string };
}
