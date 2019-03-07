import * as React from 'react';
import ListItem from "@material-ui/core/ListItem";
import {ListItemAvatar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Invoice} from "../App";


interface InvoiceListItemProps {
    deleteInvoice: (i: number) => void;
    index: number;
    invoice: Invoice;
    showViewModal: () => void;
    clickedIndex: (id: number) => void;
}


export default class InvoiceListItem extends React.Component<InvoiceListItemProps, any> {
    constructor(props: InvoiceListItemProps) {
        super(props);
    }

    handleClick = () => {
        this.props.showViewModal()
        this.props.clickedIndex(this.props.index);
    };

    render() {
        return (
            <ListItem key={this.props.index} button onClick={this.handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.invoice.number}
                    secondary={this.props.invoice.invoiceFrom}
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
