import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
  });

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
const buildTree = (pathsList: string[], path: string):NodeFile[] => {
    path = path || "";
    var nodeList:NodeFile[] = [];
    findSubPaths(pathsList, path).forEach(function(subPath) {
        var nodeName = getFilename(subPath);
        if (/\/$/.test(subPath)) {
            //var node:Node = {};
            var node = new NodeFile(nodeName, subPath, buildTree(pathsList, subPath));
            //node[nodeName] = buildTree(pathsList, subPath);
            nodeList.push(node);
        } else {
            nodeList.push(new NodeFile(nodeName, subPath, null));
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
    children: NodeFile[]|null;
    constructor(filename: string, filepath: string, children: NodeFile[]|null) {
        this.filename = filename;
        this.filepath = filepath;
        this.children = children;
    }
}

/*interface Node {
    [key: string] : (Node|NodeFile)[]
}*/


const TreeViewList:React.FC<TreeViewProps> = ({pathsList, onClickHandler}) => {

    const classes = useStyles();

    const [nodeList, setNodeList] = useState<NodeFile[]>();

    useEffect(()=>{
        let tree = buildTree(pathsList, "");
        //console.log("tree", tree);
        setNodeList(tree);
    }, [pathsList])

    useEffect(()=>{
        console.log("nodeList********", nodeList);
    }, [nodeList]);

    const showFile = (nodeFile: NodeFile) => {
        //console.log("filename::",nodeFile);
        //return <li className="code-file-link" onClick={()=>onClickHandler(nodeFile.filepath)}>{nodeFile.filename}</li>
        return <TreeItem key={nodeFile.filepath} nodeId={nodeFile.filepath} label={nodeFile.filename}
            onLabelClick={()=>onClickHandler(nodeFile.filepath)} />;
    }

    const onCaretClick = (event:React.MouseEvent) => {
        var target  = event!.currentTarget as HTMLElement;
        target?.parentElement?.querySelector(".nested")?.classList.toggle("active");
        target?.classList.toggle("caret-down");
    }

    const showDir = (nodeFile: NodeFile) => {
        //for(var node in nodeFile.children) { //only one present
            //console.log("pathKey::",pathKey);
            /*return <li>
                <span className="caret" onClick={onCaretClick}>{ pathKey }</span>
                <ul className="nested">
                    { node[pathKey].map((item, index) => {
                        return showNode(item);
                    }) }
                </ul>
            </li>*/
            return (
                <TreeItem key={nodeFile.filepath} nodeId={nodeFile.filepath} label={nodeFile.filename}>
                    {
                        nodeFile.children?.map((nItem) => {
                            return showNode(nItem);
                        }) 
                    }
                </TreeItem>
            );
    }

    const showNode = (node: NodeFile) => {
        //console.log("showNode type->"+ typeof node);

        if(node.children === null ) return showFile(node);
        return showDir(node);
    }

    return (
        /*<div className="tree-view">
            <ul className="mainUL">
                {
                    nodeList?.map( (node) => {
                        return showNode(node);
                    }) 
                }
            </ul>
            {/*JSON.stringify(nodeList, null, 2)*}
        </div>*/
        <TreeView className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />} >
            <TreeItem key={1} nodeId={"1"} label={"JAR"}>
                {
                    nodeList?.map( (node) => {
                        return showNode(node);
                    }) 
                }
            </TreeItem>
        </TreeView>
    );
}

export default TreeViewList;