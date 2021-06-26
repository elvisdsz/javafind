import { Breadcrumbs, Link } from '@material-ui/core';
import React from 'react';

interface FilepathBreadcrumbsProps {
    filepath: string
}

const FilepathBreadcrumbs:React.FC<FilepathBreadcrumbsProps> = (props) => {

    const pathParts = props.filepath.split("/");

    const filename = pathParts.pop();

    const dirPathParts = pathParts.map((part) => {
        console.log("**", part);
        return(<Link color="inherit" href="getting-started/installation/" onClick={()=>{}}>
            {part}
        </Link>)
    })

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            { dirPathParts }
            <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                onClick={()=>{}}
                aria-current="page"
            >
                {filename}
            </Link>
        </Breadcrumbs>
    );
}

export default FilepathBreadcrumbs;