import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import axios from 'axios';

const CodeEditor = () => {
    const editorRef = useRef(null);
    const [code, setCode] = useState('// Type your code here');
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        if (editorRef.current) {
            const editor = monaco.editor.create(editorRef.current, {
                value: code,
                language: "javascript",
                theme: "vs-dark",
                automaticLayout: true,
            });

            editor.onDidChangeModelContent(() => {
                setCode(editor.getValue());
            });
        }
    }, []);

    const handleRunCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/code-execution', {
                code,
                language_id: 63, // 63 is the Judge0 ID for JavaScript
                input
            });
            setOutput(response.data.stdout || response.data.stderr);
        } catch (error) {
            setOutput('Code execution failed');
        }
    };

    return (
        <div>
            <div ref={editorRef} style={{ height: '300px', border: '1px solid #ddd' }}></div>
            
            <textarea
                placeholder="Input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows="3"
                className="w-full mt-2 p-2 border rounded"
            ></textarea>
            
            <button onClick={handleRunCode} className="bg-blue-500 text-white p-2 rounded mt-2">
                Run Code
            </button>

            <div className="mt-4 p-2 border rounded bg-gray-100">
                <strong>Output:</strong>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
