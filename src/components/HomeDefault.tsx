import React, { useEffect, useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, createStyles, makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles((theme) => createStyles({
    defaultHome: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        zIndex: theme.zIndex.drawer + 1,
    },
    defaultPaper: {
        flex: 1,
        margin: '1%',
        justifyItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.text.primary,
    }
}));

interface HomeDefaultProps {
    theme: boolean,
}

const HomeDefault:React.FC<HomeDefaultProps> = ({theme}) => {
    const classes = useStyles();

    return (
        <Box className={classes.defaultHome}>
           <Paper elevation={3} square className={classes.defaultPaper}>
            <Box px={{xs:1, sm:2, md:30}} py={{xs:2, sm:2, md:5}}>
            <Typography variant="h2" align="center">
                    &#123; JavaFind &#125;
                </Typography>
                <Typography align="center">by Elvis Louis Dsouza</Typography>
                <br/>
                <List >
                <ListItem>
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <SearchIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Search the Maven Repository" secondary="Start by searching for a java module in the central maven repository using the search bar on the top." />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <ListIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Find a Module" secondary="If any matching modules are found, they will appear in the search results." />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <CodeIcon     />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="View the Code" secondary="Select a module. All the code and project files will be loaded right in your browser for viewing." />
                </ListItem>
                </List>
            </Box>
           </Paper>
        </Box>
    )
}

export default HomeDefault;