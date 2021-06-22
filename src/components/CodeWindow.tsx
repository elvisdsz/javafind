import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
//import 'prismjs/plugins/line-numbers';
import '../prism/prism.css';
import { Box, createStyles, makeStyles, Paper } from '@material-ui/core';
import FilepathBreadcrumbs from './FilepathBreadcrumbs';

const useStyles = makeStyles((theme) => createStyles({
    codePre: {
        overflow: 'revert!important',
        flex: 1,
    },
}));

interface CodeProps {
    codeText: string,
    language: string, // only java in imports so far
    filename: string
}

const CodeWindow:React.FC<CodeProps> = (props) => {

    const classes = useStyles();

    useEffect(() => {
        console.log("effecting CodeWindow.props->"+props);
        //Prism.highlightAll();
        setTimeout(() => Prism.highlightElement(document.getElementById("code")!), 0)
      }, [props]);

console.log("rendering");
return(
    <Box /*flex="1"-if stretch needed*/ display="flex" flexDirection="column">
    <FilepathBreadcrumbs filepath={props.filename}/>
<pre /*id="code-file" className="scrollable line-numbers"*/ className={classes.codePre+' line-numbers'} data-line="5-10">
<code className={"language-"+props.language + " match-braces"} id="code">
{props.codeText.trim()}
</code>
</pre>
</Box>);
}

export default CodeWindow;