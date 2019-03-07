import 'date-fns';
import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddButton from '@material-ui/icons/Add';
import {Invoice} from "../App";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export interface Element {
    quantity: number;
    price: number;
    name: string;
}

interface ViewModalProps {
    invoice?: Invoice;
    isShown: boolean;
    closeModal: () => void;
}

interface ViewModalStates {
}

export default class ViewModal extends React.Component<ViewModalProps, ViewModalStates> {
    constructor(props: ViewModalProps) {
        super(props);
    }

    getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };

    render() {
        const style = Object.assign(this.getModalStyle(), {
            position: 'absolute',
            width: '70vw',
            backgroundColor: '#ffffff',
            padding: 40,
            outline: 'none',
        });

        if (this.props.invoice) {
            console.log(this.props.invoice.isPaid)
            return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.isShown}
                    onClose={this.props.closeModal}>
                    <div style={style}>
                        <Grid container>
                            <Grid item xs={1}/>
                            <Grid item xs={10}>
                                <Grid item>
                                    <p>From: {this.props.invoice.invoiceFrom}</p>
                                    <p>To: {this.props.invoice.invoiceTo}</p>
                                    <p>Paid : {this.props.invoice.isPaid ? 'Yes' : 'No'}</p>
                                    <p>Order Date: {this.props.invoice.sellDate}</p>
                                    {
                                        this.props.invoice.isPaid ?
                                            <p>Paid Date: {this.props.invoice.paidDate}</p>
                                            :
                                            null
                                    }
                                    <p>Bild: </p>
                                </Grid>
                                <Grid item>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.invoice.elements.map((elem, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{elem.name}</TableCell>
                                                        <TableCell>{elem.quantity}</TableCell>
                                                        <TableCell>{elem.price}</TableCell>
                                                        <TableCell>{elem.quantity * elem.price}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            );
        }
        else
            return null;
    }

}
