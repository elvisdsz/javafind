import React, { useEffect, useState } from 'react';


const getFilename = (path: string):string => {
    return path.split("/").filter(function(value) {
        return value && value.length;
    }).reverse()[0];
}
const findSubPaths = (pathsList: string[], path: string):string[] => {
    // slashes need to be escaped when part of a regexp
    var rePath = path.replace("/", "\\/");
    var re = new RegExp("^" + rePath + "[^\\/]*\\/?$");
    return pathsList.filter(function(i) {
        return i !== path && re.test(i);
    });
}
const buildTree = (pathsList: string[], path: string):(Node|NodeFile)[] => {
    path = path || "";
    var nodeList:(Node|NodeFile)[] = [];
    findSubPaths(pathsList, path).forEach(function(subPath) {
        var nodeName = getFilename(subPath);
        if (/\/$/.test(subPath)) {
            var node:Node = {};
            node[nodeName] = buildTree(pathsList, subPath);
            nodeList.push(node);
        } else {
            nodeList.push(new NodeFile(nodeName,subPath));
        }
    });
    return nodeList;
}


interface TreeViewProps {
    pathsList: string[],
    onClickHandler: ((path: string) => void)
}

class NodeFile {
    filename: string;
    filepath: string;
    constructor(filename: string, filepath: string) {
        this.filename = filename;
        this.filepath = filepath;
    }
}

interface Node {
    [key: string] : (Node|NodeFile)[]
}


const TreeView:React.FC<TreeViewProps> = ({pathsList, onClickHandler}) => {

    const [nodeList, setNodeList] = useState<(Node|NodeFile)[]>();

    useEffect(()=>{
        let tree = buildTree(pathsList, "");
        //console.log("tree", tree);
        setNodeList(tree);
    }, [pathsList])

    const showFile = (nodeFile: NodeFile) => {
        //console.log("filename::",nodeFile);
        return <li className="code-file-link" onClick={()=>onClickHandler(nodeFile.filepath)}>{nodeFile.filename}</li>
    }

    const onCaretClick = (event:React.MouseEvent) => {
        var target  = event!.currentTarget as HTMLElement;
        target?.parentElement?.querySelector(".nested")?.classList.toggle("active");
        target?.classList.toggle("caret-down");
    }

    const showDir = (node: Node) => {
        for(var pathKey in node) { //only one present
            //console.log("pathKey::",pathKey);
            return <li>
                <span className="caret" onClick={onCaretClick}>{ pathKey }</span>
                <ul className="nested">
                    { node[pathKey].map((item, index) => {
                        return showNode(item);
                    }) }
                </ul>
            </li>
        }
    }

    const showNode = (node: Node|NodeFile) => {
        //console.log("showNode type->"+ typeof node);

        if(node instanceof NodeFile) return showFile(node as NodeFile);
        return showDir(node as Node);
    }

    return (
        <div className="tree-view">
            <ul className="mainUL">
                {
                    nodeList?.map( (node) => {
                        return showNode(node);
                    }) 
                }
            </ul>
            {/*JSON.stringify(nodeList, null, 2)*/}
        </div>
    );
}

export default TreeView;