import * as monaco from 'monaco-editor';
import React, {useEffect, useRef, useImperativeHandle, forwardRef} from 'react';

interface MonacoEditorProps {
    value?: string;
    language?: string;
    theme?: string;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
}

export interface MonacoEditorRef {
    getValue: () => string;
    setValue: (value: string) => void;
}

const MonacoEditor2 = forwardRef<MonacoEditorRef, MonacoEditorProps>(({
                                                                          value = '',
                                                                          language = 'javascript',
                                                                          theme = 'vs-dark',
                                                                          options = {},
                                                                          style = {},
                                                                          onChange
                                                                      }, ref) => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            editorRef.current = monaco.editor.create(containerRef.current, {
                value,
                language,
                theme,
                automaticLayout: true,
                ...options,
            });

            editorRef.current.onDidChangeModelContent(() => {
                onChange?.(editorRef.current!.getValue());
            });
        }

        return () => editorRef.current?.dispose();
    }, []);

    useImperativeHandle(ref, () => ({
        getValue: () => editorRef.current?.getValue() || '',
        setValue: (value: string) => {
            if (editorRef.current) {
                editorRef.current.setValue(value);
            }
        },
    }), []);

    return <div ref={containerRef} style={{width: '100%', height: '100%', ...style}}/>;
});

export default MonacoEditor2;
