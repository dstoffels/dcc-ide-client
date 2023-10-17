import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';
import useMonaco from './useMonaco';

export default function useEmmet() {
	const loadMonaco = async () => {
		const monaco = await useMonaco();
		const dumpHTML = emmetHTML(monaco);
		const dumpCSS = emmetCSS(monaco);
		const dumpJSX = emmetJSX(monaco);

		console.log('useEmmet');
	};

	loadMonaco();
}
