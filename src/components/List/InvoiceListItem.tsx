import * as React from 'react';
import ListItem from "@material-ui/core/ListItem";
import {ListItemAvatar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


interface InvoiceListItemProps {
    deleteInvoice: (i: number) => void;
    index: number;
    numberInvoice: string;
    invoiceFrom: string;
}


export default class InvoiceListItem extends React.Component<InvoiceListItemProps, any> {
    constructor(props: InvoiceListItemProps) {
        super(props);
    }

    render() {
        return (
            <ListItem key={this.props.index}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.numberInvoice}
                    secondary={this.props.invoiceFrom}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.props.deleteInvoice(this.props.index)} aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

}
