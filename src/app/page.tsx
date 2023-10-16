'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import Editor from '@monaco-editor/react';

const defaultMsg: string = ``;

export default function Home() {
	const [code, setCode] = useState<string | undefined>(defaultMsg);

	const editorRef = useRef(null);

	const handleEditorMount = (editor: any, monaco: any) => {
		editorRef.current = editor;
	};

	const displayValue = () => {
		console.log(editorRef?.current?.getValue());
	};

	return (
		<main>
			<h1>dcc ide</h1>
			<button onClick={displayValue}>Run Code</button>
			<Editor
				height="50vh"
				value={code}
				onChange={(value: string | undefined) => setCode(value)}
				onMount={handleEditorMount}
			/>
		</main>
	);
}
