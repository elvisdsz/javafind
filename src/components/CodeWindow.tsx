import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
//import 'prismjs/plugins/line-numbers';
import '../prism/prism.css';
import { Box, Paper } from '@material-ui/core';
import FilepathBreadcrumbs from './FilepathBreadcrumbs';

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
    <Box /*flex="1"-if stretch needed*/ /*className="codewindow not-scrollable"*/>
    <FilepathBreadcrumbs filepath={props.filename}/>
<pre id="code-file" className="scrollable line-numbers" data-line="5-10">
<code className={"language-"+props.language + " match-braces"} id="code">
{props.codeText.trim()}
</code>
</pre>
</Box>);
}

export default CodeWindow;