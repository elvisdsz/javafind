import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
//import 'prismjs/plugins/line-numbers';
import '../prism/prism.css';

interface CodeProps {
    codeText: string,
    language: string, // only java in imports so far
    filename: string
}

const CodeWindow:React.FC<CodeProps> = (props) => {

    useEffect(() => {
        console.log("effecting CodeWindow.props->"+props);
        //Prism.highlightAll();
        setTimeout(() => Prism.highlightElement(document.getElementById("code")!), 0)
      }, [props]);

console.log("rendering");
return(
    <div className="codewindow not-scrollable">
<div className="codewindow-title">{props.filename}</div>
<pre id="code-file" className="scrollable line-numbers" data-line="5-10">
<code className={"language-"+props.language + " match-braces"} id="code">
{props.codeText.trim()}
</code>
</pre></div>);
}

export default CodeWindow;