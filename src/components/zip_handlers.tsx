import JSZip from 'jszip';

/*
export function handleZip2(file, showCodeCallback) {
    var zip = new JSZip();

    zip.loadAsync(file)
        .then(function(zip) {
            //let value = ""
            var folderTree = document.getElementById("folder-tree");
            zip.folder("").forEach(function (relativePath, file){
                console.log("iterating over", relativePath);
                var span = document.createElement("span");
                span.classList = "file-link";
                span.onclick = () => {handleFileInZip(zip, relativePath, showCodeCallback)}
                span.innerText = relativePath;
                folderTree.appendChild(span);
                folderTree.appendChild(document.createElement("br"));
                //value += "<span class='file-link' onClick='handleFile("+file+")'>"+relativePath+"</span><br/>";
            });
            //document.getElementById("folder-tree").innerHTML = value;
            document.getElementById("folder-struct").style.display = 'block';
        });
  }
*/

export const handleZip = (file: File, showCodeCallback: (fileText:string)=>void): Map<string,File> => {
    var zip = new JSZip();
    let folderItems = new Map();
    zip.loadAsync(file)
        .then(function(zip) {
            //let value = ""
            //var folderTree = document.getElementById("folder-tree");
            zip.folder("")!.forEach(function (relativePath, file){
                /*console.log("iterating over", relativePath);
                var span = document.createElement("span");
                span.classList = "file-link";
                span.onclick = () => {handleFileInZip(zip, relativePath, showCodeCallback)}
                span.innerText = relativePath;
                folderTree.appendChild(span);
                folderTree.appendChild(document.createElement("br"));
                //value += "<span class='file-link' onClick='handleFile("+file+")'>"+relativePath+"</span><br/>";
                */
            folderItems.set(relativePath, file);
            });
            //document.getElementById("folder-tree").innerHTML = value;
            //document.getElementById("folder-struct").style.display = 'block';
            return folderItems;
        });
    return folderItems;
}

export function handleFileInZip(zip: JSZip, path: string, showCodeCallback: (codeText: string)=>void) {
    let promise = zip.file(path)?.async("string"); // a promise of "Hello World\n"
    console.log("Attempting to show file");
    if(promise == null || promise === undefined)
        return null;
    promise.then(value => {
        //console.log(value)
        /*var codeElement = document.getElementById("code")
        codeElement.textContent = value;
        document.getElementById("code-file").style.display = 'block';
        Prism.highlightElement(codeElement);*/
        showCodeCallback(value);
    })
  }