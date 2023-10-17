'use client';
import { Editor } from '@monaco-editor/react';
import Shortcuts from 'components/Shortcuts/Shortcuts';
import useEmmet from 'hooks/useEmmet';
import useMonaco from 'hooks/useMonaco';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

const HTML_IDE = ({}) => {
	const [html, setHtml] = useState<string | undefined>('');
	const [css, setCss] = useState<string | undefined>('');

	const formatCode = async () => {
		const monaco = await useMonaco();
		const editors = monaco.editor.getEditors();
		editors.map((e) => e.getAction('editor.action.formatDocument')?.run());
	};

	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const doc = iframeRef.current?.contentWindow?.document;
		const content = `<style>${css}</style>${html}`;

		doc?.open();
		doc?.write(content);
		doc?.close();
	}, [html, css]);

	useEffect(() => {
		useEmmet();
	}, []);

	return (
		<div className="flex max-h-screen">
			<div className="flex flex-col h-screen w-full">
				<div className="h-1/2 overflow-clip">
					<h4>index.html</h4>
					<Editor value={html} onChange={setHtml} theme="vs-dark" language="html" />
				</div>
				<div className="h-1/2 overflow-clip">
					<h4>styles.css</h4>

					<Editor value={css} onChange={setCss} theme="vs-dark" language="css" />
				</div>
			</div>
			<div className="h-screen w-full">
				<iframe ref={iframeRef} id="preview" className="w-full h-full bg-white"></iframe>
			</div>
			<Shortcuts onSave={formatCode} onEnter={formatCode} />
		</div>
	);
};

export default HTML_IDE;
