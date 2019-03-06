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

interface InvoiceModalProps {
    isShown: boolean;
    onClose: () => void;
    onChangeInvoice: (myInvoice: Invoice) => void;
}

interface InvoiceModalStates {
    number: string,
    invoiceFrom: string,
    invoiceTo: string,
    isPaid: boolean,
    sellDate: Date,
    paidDate: Date,
    elements: Element[],
    elementName: string;
    elementQuantity: number;
    elementPrice: number;
    fullCost: number;
}

export default class InvoiceModal extends React.Component<InvoiceModalProps, InvoiceModalStates> {
    constructor(props: InvoiceModalProps) {
        super(props);

        this.state = {
            number: '',
            invoiceFrom: '',
            invoiceTo: '',
            isPaid: false,
            sellDate: new Date(),
            paidDate: new Date(),
            elements: [] as Element[],
            elementName: '',
            elementQuantity: 0,
            elementPrice: 0,
            fullCost: 0,
        }
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

    onChangeSellDate = (event: any) => {
        this.setState({
            sellDate: event
        });
    };

    onChangePaidDate = (event: any) => {
        this.setState({
            paidDate: event
        });
    };

    updateElements = () => {
        const defElem: Element = {
            quantity: this.state.elementQuantity,
            price: this.state.elementPrice,
            name: this.state.elementName,
        };

        this.setState({
            elements: [...this.state.elements, defElem]
        }, () => this.updateTotalCost());
    };

    addElement = () => {
        this.updateElements();
        this.resetElement();
    }

    addInvoice = () => {
        const invoice = {
            number: this.state.number,
            invoiceFrom: this.state.invoiceFrom,
            invoiceTo: this.state.invoiceTo,
            isPaid: this.state.isPaid,
            sellDate: this.state.sellDate,
            paidDate: this.state.paidDate,
            elements: this.state.elements
        } as Invoice;
        this.props.onChangeInvoice(invoice);
        this.resetModal();
        this.props.onClose();
    };

    resetModal = () => {
        this.setState({
            number: '',
            invoiceFrom: '',
            invoiceTo: '',
            isPaid: false,
            sellDate: new Date(),
            paidDate: new Date(),
            elements: [],
            elementName: '',
            elementQuantity: 0,
            elementPrice: 0,
        });
    };

    resetElement = () => {
        this.setState({
            elementName: '',
            elementQuantity: 0,
            elementPrice: 0,
        })
    }

    updateTotalCost = () => {
        let result: number = 0;
        this.state.elements.forEach(elem => {
            result += elem.quantity * elem.price;
        });
        this.setState({
            fullCost: result
        })
    };


    deleteElement = (index: number) => {
        this.setState({
            elements: this.state.elements.filter((elem, i) => {
                if (i !== index) return elem;
            }),
        }, () => this.updateTotalCost());

    };

    onCloseModal = () => {
        this.props.onClose();
        this.resetModal();
    };


    render() {
        const style = Object.assign(this.getModalStyle(), {
            position: 'absolute',
            width: '70vw',
            backgroundColor: '#ffffff',
            padding: 40,
            outline: 'none',
        });
        return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.isShown}
                    onClose={this.onCloseModal}
                >
                    <div style={style}>
                        <Grid container>
                            <Grid item xs={1}/>
                            <Grid item xs={10}>
                                <Grid item>
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Invoice number"
                                        placeholder="Invocie number"
                                        margin="normal"
                                        value={this.state.number}
                                        onChange={(event: any) => {
                                            this.setState({number: event.target.value})
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Invoice to"
                                        value={this.state.invoiceTo}
                                        placeholder="Invoice to"
                                        onChange={(event: any) => {
                                            this.setState({invoiceTo: event.target.value})
                                        }}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Invoice from"
                                        placeholder="Invoice from"
                                        margin="normal"
                                        onChange={(event: any) => {
                                            this.setState({invoiceFrom: event.target.value})
                                        }}
                                        value={this.state.invoiceFrom}
                                        style={{
                                            left: 4
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Switch
                                        value="checkedB"
                                        color="primary"
                                    /> Paid
                                </Grid>
                                <Grid item>
                                    <DatePicker
                                        margin="normal"
                                        label="Sell date"
                                        value={this.state.sellDate}
                                        onChange={this.onChangeSellDate}
                                    />
                                    <DatePicker
                                        margin="normal"
                                        label="Paid date"
                                        value={this.state.paidDate}
                                        onChange={this.onChangePaidDate}
                                    />
                                </Grid>
                                <Grid item style={{paddingTop: 30}}>
                                    <Button onClick={this.addElement} color='primary' variant='contained'>
                                        ADD <AddButton/>
                                    </Button>
                                </Grid>
                                <Grid container alignItems='center'>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-uncontrolled"
                                            label="Name"
                                            value={this.state.elementName}
                                            onChange={(e) => {
                                                this.setState({elementName: e.target.value})
                                            }}
                                            margin="normal"
                                            style={{
                                                left: 4
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-uncontrolled"
                                            label="Quantity"
                                            value={this.state.elementQuantity ? this.state.elementQuantity : ''}
                                            onChange={(e) => {
                                                this.setState({elementQuantity: Number(e.target.value)})
                                            }}
                                            margin="normal"
                                            style={{
                                                left: 4
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-uncontrolled"
                                            label="Price"
                                            value={this.state.elementPrice ? this.state.elementPrice : ''}
                                            onChange={(e) => {
                                                this.setState({elementPrice: Number(e.target.value)})
                                            }}
                                            margin="normal"
                                            style={{
                                                left: 4
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        Total: {this.state.elementPrice * this.state.elementQuantity}
                                    </Grid>
                                </Grid>
                                <h3>Bild: {this.state.fullCost}</h3>
                                <Grid item>
                                    <Table style={this.state.elements.length ? {display: 'block'} : {display: 'none'}}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.elements.map((elem, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            <Button onClick={() => this.deleteElement(index)}
                                                                    aria-label="Delete">
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </TableCell>
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
                                <Grid item style={{paddingTop: 30}}>
                                    <Button onClick={this.addInvoice} color='primary' variant='contained'>
                                        Add invoice
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </MuiPickersUtilsProvider>
        );
    }

}
