import React, { useState } from 'react';
import CodeWindow from './CodeWindow';
import FileUpload from './FileUpload';
import FolderTree from './FolderTree';
import SearchPanel from './SearchPanel';
import NavBar from './NavBar';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Home() {

    const classes = useStyles();

    const javaCode = "import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n";
    const xmlCode = `<xml a="43"></xml>`;

    const [codeText, setCodeText] = useState<string>("import java.io.File;\nimport java.utils.List;\n\npublic class JavaApp {\n\tprivate int i = 20\n}\n");
    const [mainFile, setMainFile] = useState<Blob>();//useState<File>();
    const [selectedFilename, setSelectedFilename] = useState<string>("");

    const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);
    
    const onFileSelectedToShow = (filename: string, fileText:string):void => {
        console.log("onFileSelectedToShow: fileText="+fileText);
        setCodeText(fileText);
        setSelectedFilename(filename);
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
    <Grid container /*className="main"*/ className={classes.root}>
        <Grid item xs={10}>
            <SearchPanel show={showSearchPanel} loadFile={loadFile} hideSearchPanel={handleHideSearchPanel} />
        </Grid>

        <Grid /*className="header"*/ item xs={12}>
            {/*mainFile == null?<FileUpload onUpload={onFileUpdate}/>:<NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />*/}
            <NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />
        </Grid>
        <Grid /*className="jar-container"*/ item xs={3}>
            <FolderTree zipFile={mainFile!} showCodeCallback={onFileSelectedToShow} />
        </Grid>
        <Grid item xs={9}>
            <CodeWindow codeText={codeText} language="java" filename={selectedFilename} />
        </Grid>
    </Grid>
    );
}

export default Home;
