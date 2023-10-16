import { loader } from '@monaco-editor/react';
import judgeAPI from '../utils/judgeAPI';
import React, { useState, useEffect } from 'react';

export default function useLanguages() {
	const [languages, setLanguages] = useState([]);

	const fetchLanguages = async () => {
		const monaco = await loader.init().then((monaco) => monaco);
		const monacoLangs = monaco.languages.getLanguages();

		const response = await judgeAPI.get(`/languages`);

		const parsedLangs = response.data
			.map((lang: any) => {
				let truncName = '';
				for (let i = 0; i < lang.name.length; i++) {
					truncName += lang.name[i];
					if (lang.name[i + 1] === '(') break;
				}
				truncName = truncName.trimEnd();

				for (var ml of monacoLangs) {
					if (ml.aliases?.includes(truncName))
						return { ...lang, displayName: truncName, aliases: ml.aliases, monacoName: ml.id };
				}
			})
			.filter((lang: any) => Boolean(lang));

		setLanguages(parsedLangs);
	};

	useEffect(() => {
		fetchLanguages();
	}, []);

	return languages;
}

export type ValidLanguages = [
	'c',
	'cpp',
	'clojure',
	'csharp',
	'elixir',
	'fsharp',
	'go',
	'java',
	'javascript',
	'kotlin',
	'lua',
	'objective-c',
	'pascal',
	'perl',
	'php',
	'plaintext',
	'python',
	'r',
	'ruby',
	'rust',
	'scala',
	'sql',
	'swift',
	'typescript',
];
