import React, { useState } from 'react';
import CodeWindow from './CodeWindow';
import FileUpload from './FileUpload';
import FolderTree from './FolderTree';
import SearchPanel from './SearchPanel';
import NavBar from './NavBar';
import { Backdrop, Box, CircularProgress, Grid, makeStyles, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './search/SearchPage';

const useStyles = makeStyles((theme) => ({
    rootBox: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    longPaper: {
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        boxSizing: 'border-box',
        /*min-height: min-content; /* needs vendor prefixes */
    },
    resizable: {
        width: "30%",
        resize: "horizontal"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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

    const [showLoading, setShowLoading] = useState<boolean>(false);
    
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

        setShowLoading(true);

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
        ).finally(() => {
            setShowLoading(false);
        });

    }

    return (
    <Router>
    <Box className={classes.rootBox}>
        <Box /*className="header"*/ >
            {/*mainFile == null?<FileUpload onUpload={onFileUpdate}/>:<NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />*/}
            <NavBar searchPanel={showSearchPanel} showSearchPanel={handleShowSearchPanel} />
        </Box>
    
        <Switch>
            <Route path="/search">  {/*     Check https://reactrouter.com/web/guides/quick-start    */}
                <SearchPage loadFile={loadFile} />
            </Route>
            <Route path="/">
                <Box display="flex" flexGrow="1" overflow="auto">

                    <Backdrop className={classes.backdrop} open={showLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <SearchPanel show={showSearchPanel} loadFile={loadFile} hideSearchPanel={handleHideSearchPanel} />
                    
                    <Box className={classes.longPaper+' '+classes.resizable}>
                    {/*</Box><Box  flex={{xs:3}} className={classes.longPaper}>*/}
                        <FolderTree zipFile={mainFile!} showCodeCallback={onFileSelectedToShow} />
                    </Box>
                    <Box flex={{xs:9}} className={classes.longPaper}>
                        <CodeWindow codeText={codeText} language="java" filename={selectedFilename} />
                    </Box>
                </Box>
            </Route>
        </Switch>
    </Box>
    </Router>
    );
}

export default Home;
