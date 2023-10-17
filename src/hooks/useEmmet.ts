import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';
import useMonaco from './useMonaco';

export default async function useEmmet() {
	const monaco = await useMonaco();
	const dumpHTML = emmetHTML(monaco);
	const dumpCSS = emmetCSS(monaco);
	const dumpJSX = emmetJSX(monaco);
}
