import { loader } from '@monaco-editor/react';

const useMonaco = async () => await loader.init().then((monaco) => monaco);

export default useMonaco;
