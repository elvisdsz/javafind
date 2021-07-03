export interface SearchResultIF {
    name: string,
    description: string,
    groupId: string,
    artifactId: string,
    //version: string,
    classifier: string,
    fileExtension: string,
    //relFilepath: string,
    versions: Array<Version>,
}

interface Version {
    version: string,
    relFilepath: string
}