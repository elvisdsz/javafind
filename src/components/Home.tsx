import React, { useState } from 'react';
import CodeWindow from './CodeWindow';
import { FileUpload } from './FileUpload';
import { handleZip } from './zip_handlers';

function Home() {

    const javaCode = "import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n";
    const xmlCode = `<xml a="43"></xml>`;

    const [codeText, setCodeText] = useState<string>("import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n");

    
    const onFileSelectedToShow = (fileText:string):void => {
        console.log("onFileSelectedToShow: fileText="+fileText);
        setCodeText(fileText);
    }

    const onFileUpdate = (files:FileList):void => {
        handleZip(files[0], onFileSelectedToShow)
        console.log("onFileUpdate: files="+files);
    }

    return (
    <div className="main">
        JavaFind
        <FileUpload onUpload={onFileUpdate}/>
<pre id="folder-struct"><code className="language-treeview" id="folder-tree">
</code></pre>
        <CodeWindow codeText={codeText} language="java"/>
    </div>
    );
}

export default Home;
