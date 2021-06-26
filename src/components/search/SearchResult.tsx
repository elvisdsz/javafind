import { Card, CardContent, Link, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { SearchResultIF } from '../../interface/SearchResultIF'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    resultCard: {
        margin: theme.spacing(1),
        minWidth: '50vw',
    },
    groupId: {
        fontSize: 14,
    },
}));

interface SearchResultProps {
    index: number,
    result: SearchResultIF,
    loadFile: (url: string)=>void,
}

const SearchResult:React.FC<SearchResultProps> = (props) => {

    const classes = useStyles();

    return(
        <ListItem key={props.index} alignItems="flex-start" 
            button component={RouterLink} to="/" onClick={() => props.loadFile("http://localhost:8080/getFile?fp="+props.result.relFilepath)}>
            {/*<Card className={classes.resultCard} >
            <CardContent>*/}
                <ListItemText
                    primary = {
                        <Typography color="textSecondary">
                            {props.result.groupId} // {props.result.artifactId} // {props.result.version}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="h5" component="h2" color="textPrimary">
                                {props.result.description} {/* Can be blank */}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {/*
                <Typography className={classes.groupId} color="textSecondary" gutterBottom>
                    {props.result.groupId}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.result.artifactId}
                </Typography>
                <Link component={RouterLink} to="/" onClick={() => props.loadFile("http://localhost:8080/getFile?fp="+props.result.relFilepath)}>
                    {props.result.groupId} {props.result.artifactId} {props.result.version}
                </Link> */}
            {/*</CardContent>
            </Card>*/}
        </ListItem>
    );
}

export default SearchResult;