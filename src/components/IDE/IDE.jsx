'use client';
import React, { useState, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import axios from 'axios';

const IDE = ({ defaultValue = '' }) => {
	const [source_code, setSourceCode] = useState(defaultValue);
	const [results, setResults] = useState(null);

	const runCode = async () => {
		const fetchResults = async () => {
			return await axios.get(
				`http://localhost:2358/submissions/${response.data.token}?API_KEY=12345`,
			);
		};

		const body = {
			source_code,
			language_id: 63,
			stdin: `console.log('hello squirrel);`,
			expected_output: 'hello squirrel',
		};

		let response = await axios.post(`http://localhost:2358/submissions?API_KEY=12345`, body);
		response = await fetchResults();
		while (response?.data?.status?.description === 'In Queue') response = await fetchResults();

		setResults(response.data);
		console.log(response.data);
	};

	const monaco = useMonaco();

	return (
		<div>
			<button onClick={runCode} disabled={!source_code}>
				Run Code
			</button>
			<Editor
				height="50vh"
				value={source_code}
				onChange={(value) => setSourceCode(value)}
				theme="vs-dark"
				language="html"
			/>
			<div>
				<div>{results?.stdout}</div>
				<span>{results?.status?.description}</span>
			</div>
		</div>
	);
};

export default IDE;
