import React, {Component} from 'react';
import {Grid} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import NavBar from './Navbar/NavBar';
import InvoiceModal from "./Modal/InvoiceModal";
import {Element} from './Modal/InvoiceModal';
import InvoiceListItem from "./List/InvoiceListItem";

export interface Invoice {
    number: string,
    invoiceFrom: string,
    invoiceTo: string,
    isPaid: boolean,
    sellDate: Date,
    paidDate: Date,
    elements: Element[],
}

interface AppStates {
    isShowModal: boolean;
    invoices: Invoice[];
}


class App extends Component<any, AppStates> {

    constructor(props: any) {
        super(props);
        let localInvoices: any = localStorage.getItem('invoices');
        if (localInvoices) {
            localInvoices = JSON.parse(localInvoices);
            localInvoices = localInvoices.map((el: any) => JSON.parse(el));
        }
        this.state = {
            isShowModal: false,
            invoices: localInvoices ? localInvoices : []
        };
    }


    onAddClick = () => {
        this.setState({
            isShowModal: true
        });
    };

    modalClose = () => {
        this.setState({
            isShowModal: false
        });
    };

    onChangeInvoice = (myInvoce: Invoice) => {
        this.setState({
            invoices: [...this.state.invoices, myInvoce],
        }, () => {
            if (this.state.invoices !== null)
                localStorage.setItem('invoices', (this.state.invoices as []).map((el: any) => JSON.stringify(el)).toString());
        });
    };

    deleteInvoice = (index: number) => {
        this.setState({
            invoices: this.state.invoices.filter((elem, i) => {
                if (i !== index) return elem;
            }),
        });
    };

    render() {
        return (
            <div className="App">
                <InvoiceModal onClose={this.modalClose} isShown={this.state.isShowModal}
                              onChangeInvoice={this.onChangeInvoice}/>
                <Grid container>
                    <NavBar onAddClick={this.onAddClick}/>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <div>
                            <List>
                                {this.state.invoices.map((invoce: Invoice, index) => {
                                    return (
                                        <InvoiceListItem
                                            deleteInvoice={this.deleteInvoice}
                                            index={index}
                                            key={index}
                                            numberInvoice={invoce.number}
                                            invoiceFrom={invoce.invoiceFrom}
                                        />
                                    )
                                })
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
