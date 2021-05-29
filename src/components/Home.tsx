import React, { useState } from 'react';
import CodeWindow from './CodeWindow';
import FileUpload from './FileUpload';
import FolderTree from './FolderTree';

function Home() {

    const javaCode = "import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n";
    const xmlCode = `<xml a="43"></xml>`;

    const [codeText, setCodeText] = useState<string>("import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n");
    const [mainFile, setMainFile] = useState<File>();
    
    const onFileSelectedToShow = (fileText:string):void => {
        console.log("onFileSelectedToShow: fileText="+fileText);
        setCodeText(fileText);
    }

    const onFileUpdate = (files:FileList):void => {
        //setFolderItems(handleZip(files[0], onFileSelectedToShow));
        setMainFile(files[0]);
        console.log("onFileUpdate: files="+files);
    }

    return (
    <div className="main">
        <div className="header">
        {mainFile == null?<FileUpload onUpload={onFileUpdate}/>:<h1 style={{color:'honeydew', padding:'0 5rem'}}>JavaFind</h1>}
        </div>
        <div className="jar-container">
            <FolderTree zipFile={mainFile} showCodeCallback={onFileSelectedToShow} />
            <CodeWindow codeText={codeText} language="java" />
        </div>
    </div>
    );
}

export default Home;
