import * as React from 'react';
import {AppBar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AddButton from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

interface NavBarProps {
    onAddClick: () => void;
}


export default class NavBar extends React.Component<NavBarProps,any> {
    constructor(props: NavBarProps){
        super(props);
    }

    render() {
        return (
            <AppBar position="static" color='default'>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Invoices
                    </Typography>
                    <Button onClick={this.props.onAddClick} variant='contained' color='primary' style={{marginLeft: 10}}>
                        ADD INVOCE <AddButton />
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

}
