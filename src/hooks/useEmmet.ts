import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

export default function useEmmet() {
	if (window.monaco) {
		emmetHTML(window.monaco);
		// emmetCSS(window.monaco);
		// emmetJSX(window.monaco);
	}
}
