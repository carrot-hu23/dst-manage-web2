import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter' // 代码高亮
// 高亮的主题，还有很多别的主题，可以自行选择
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import 'github-markdown-css';

import {useTheme} from "../../hooks/useTheme";

function base64ToUtf8(base64) {
    return new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
}

export default ({url, decode}) => {

    const t = useTheme()
    const [mdContent, setMdContent] = useState('')

    useEffect(() => {
        // url是markdown文件的路径，我在项目中是放到了media文件夹下，示例：url为'/media/xx.md'
        fetch(url)
            .then(res => res.text())
            .then(text => setMdContent(decode ? base64ToUtf8(text) : text));
    }, [])


    return (
        <ReactMarkdown
            className={t.theme === 'dark'?'markdown-body markdown-body-dark':'markdown-body'}
            children={mdContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={tomorrow}
                            // style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    )
}