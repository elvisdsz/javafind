import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import Prism from 'prismjs';
import 'prismjs/plugins/treeview/prism-treeview';
import '../prism/prism.css';

interface FolderTreeProps {
    zipFile: File | undefined;
    showCodeCallback: (fileText:string)=>void;
}

const FolderTree:React.FC<FolderTreeProps> = ({zipFile, showCodeCallback}) => {

    const [folderItems, setFolderItems] = useState<Map<string, File>>();
    const [zip, setZip] = useState<JSZip>();

    useEffect(() => {
        console.log("zipFile updated->"+zipFile?.name);
        if(zipFile != null)
            handleZip(zipFile);
    }, [zipFile])

    const handleFileInZip = (zip: JSZip, path: string, showCodeCallback: (codeText: string)=>void) => {
        let promise = zip.file(path)?.async("string"); // a promise of "Hello World\n"
        console.log("Attempting to show file");
        if(promise == null || promise === undefined)
            return null;
        promise.then(value => {
            showCodeCallback(value);
        })
    }

    const handleZip = (file: File) => {
        var zip_obj = new JSZip();
        let folderItems = new Map();
        zip_obj.loadAsync(file)
            .then(function(zip) {
                zip.folder("")!.forEach(function (relativePath, file){
                    folderItems.set(relativePath, file);
                    //console.log("Setting item->"+relativePath);
                });
                console.log("handleZip found folderItems="+folderItems.size);
                setZip(zip_obj);
                setFolderItems(folderItems);
                //setTimeout(() => Prism.highlightElement(document.getElementById("folder-struct")!), 0)
                Prism.highlightAll();
            });
    }


    console.log("**FolderTree re-render** "+folderItems?.size);
    if(zip != null && folderItems != null) {
        //return(<pre id="folder-struct"><code className="language-treeview" id="folder-tree">
        return(<div>
            {   Array.from(folderItems!.keys()).map((path, index)=>{
                    console.log(path);
                    return (<>
                        <span key={index} className="file-link highlight" onClick={() => {handleFileInZip(zip!, path, showCodeCallback)}}>{path}</span>
                        <br/>
                    </>)
                }) }
        </div>)
        {/*</code></pre>)*/}
    } else {
        return <pre id="folder-struct"></pre>
    }
}

export default FolderTree;