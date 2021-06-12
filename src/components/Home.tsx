import JSZip from 'jszip';
import Prism from 'prismjs';
import React, { useState } from 'react';
import CodeWindow from './CodeWindow';
import FileUpload from './FileUpload';
import FolderTree from './FolderTree';
import SearchPanel from './SearchPanel';
import NavBar from './NavBar';

function Home() {

    const javaCode = "import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n";
    const xmlCode = `<xml a="43"></xml>`;

    const [codeText, setCodeText] = useState<string>("import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n");
    const [mainFile, setMainFile] = useState<Blob>();//useState<File>();

    const [showSearchPanel, setShowSearchPanel] = useState<boolean>(true);
    
    const onFileSelectedToShow = (fileText:string):void => {
        console.log("onFileSelectedToShow: fileText="+fileText);
        setCodeText(fileText);
    }

    const onFileUpdate = (files:FileList):void => {
        //setFolderItems(handleZip(files[0], onFileSelectedToShow));
        setMainFile(files[0]);
        console.log("onFileUpdate: files="+files);
    }

    const handleShowSearchPanel = () => {
        setShowSearchPanel(true);
    }

    const handleHideSearchPanel = () => {
        setShowSearchPanel(false);
    }

    const loadFile = (url: string) => {
        //var zip = new JSZip();
        console.log("loading file bdata from url="+url);
        fetch(url).then(r => r.blob())
        .then( bdata =>{
                setMainFile(bdata);
                setShowSearchPanel(false);
                /*zip.loadAsync(bdata)
                    .then(function(zip) {
                        // you now have every files contained in the loaded zip
                        zip.folder("")?.forEach(function (relativePath, file){
                                console.log("iterating over", relativePath);
                            });

                        //setShowSearchPanel(false);
                    });*/

            }
        );

    }

    return (
    <div className="main">
        <SearchPanel show={showSearchPanel} loadFile={loadFile} hideSearchPanel={handleHideSearchPanel} />
        <div className="header">
            {/*mainFile == null?<FileUpload onUpload={onFileUpdate}/>:<NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />*/}
            <NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />
        </div>
        <div className="jar-container">
            <FolderTree zipFile={mainFile!} showCodeCallback={onFileSelectedToShow} />
            <CodeWindow codeText={codeText} language="java" />
        </div>
    </div>
    );
}

export default Home;
