import { Button, Card, CardContent, FormControl, Icon, IconButton, InputLabel, Link, ListItem, ListItemText, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react'
import { SearchResultIF } from '../../interface/SearchResultIF'
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles((theme) => ({
    resultCard: {
        margin: theme.spacing(1),
        minWidth: '50vw',
    },
    groupId: {
        fontSize: 14,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

interface SearchResultProps {
    index: number,
    result: SearchResultIF,
    loadFile: (url: string)=>void,
}

const SearchResult:React.FC<SearchResultProps> = (props) => {

    const classes = useStyles();

    const [selectedVersion, setSelectedVersion] = useState(props.result.versions[0].version);
    const [selectedVersionPath, setSelectedVersionPath] = useState(props.result.versions[0].relFilepath);

    const handleVersionChange = (event:React.ChangeEvent<{ value: unknown }>) => {
        setSelectedVersion(event.target.value as string);

        props.result.versions.some(version => {
            if(version.version === event.target.value as string) {
                setSelectedVersionPath(version.relFilepath);
                return true;
            } else
                return false;
        });
    }

    return(
        <ListItem key={props.index} alignItems="flex-start">
            {/*<Card className={classes.resultCard} >
            <CardContent>*/}
                <ListItemText
                    primary = {
                        <Typography color="textSecondary">
                            {props.result.groupId} // {props.result.artifactId}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="h5" component="h2" color="textPrimary">
                                {props.result.name} {/* Can be blank */}
                            </Typography>
                            {props.result.description}
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
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    value={selectedVersion}
                    onChange={handleVersionChange}
                    >
                { props.result.versions.map(version => <MenuItem value={version.version}>{version.version}</MenuItem>) }
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<CodeIcon />}
                component={RouterLink} to="/"
                onClick={() => props.loadFile("http://localhost:8080/getFile?fp="+selectedVersionPath)}
            >
               View
            </Button>
        </ListItem>
    );
}

export default SearchResult;