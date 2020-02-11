import React, {Component} from 'react';
import {Grid} from "@material-ui/core";
import List from "@material-ui/core/List";
import NavBar from './Navbar/NavBar';
import InvoiceModal from "./Modal/InvoiceModal";
import {Element} from './Modal/InvoiceModal';
import InvoiceListItem from "./List/InvoiceListItem";
import ViewModal from "./Modal/ViewModal";

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
    isShowAddModal: boolean;
    isShowViewModal: boolean;
    invoices: Invoice[];
    showId: number;
}


class App extends Component<any, AppStates> {

    constructor(props: any) {
        super(props);
        let localInvoices: any = localStorage.getItem('invoices');
        if (localInvoices) {
            localInvoices = JSON.parse(localInvoices);
            localInvoices = localInvoices.map((el: any) => {
                el.elements = JSON.parse(el.elements);
                return el;
            });
        }
        this.state = {
            showId:0,
            isShowAddModal: false,
            isShowViewModal: false,
            invoices: localInvoices ? localInvoices : []
        };
    }

    showViewModal = () => {
        this.setState({
            isShowViewModal: true,
        })
    };

    closeViewModal = () => {
        this.setState({
            isShowViewModal: false,
        })
    };

    onAddClick = () => {
        this.setState({
            isShowAddModal: true,
        });
    };

    modalClose = () => {
        this.setState({
            isShowAddModal: false,
        });
    };

    onChangeInvoice = (myInvoce: Invoice) => {
        this.setState({
            invoices: [...this.state.invoices, myInvoce],
        }, this.updateLocalStorageInvoices);
    };

    deleteInvoice = (index: number) => {
        this.setState({
            invoices: this.state.invoices.filter((elem, i) => {
                if (i !== index) return elem;
            }),
        }, this.updateLocalStorageInvoices);
    };

    clickedId = (id: number) => {
        this.setState({
            showId: id,
        });
    }

    updateLocalStorageInvoices = () => {
        let temp = (this.state.invoices).map((el: any) => {
            if(!Array.isArray(el.elements)){
                el.elements = JSON.parse(el.elements)
            };
            el.elements = `[${(el.elements).map((els: object) => JSON.stringify(els)).toString()}]`;
            return JSON.stringify(el);
        });
        localStorage.setItem('invoices', `[${temp.toString()}]`);
        this.setState({
            invoices: this.state.invoices.map((el) => {
                if (!Array.isArray(el.elements))
                    el.elements = JSON.parse(el.elements);
                return el;
            })
        })
    };

    render() {
        return (
            <div className="App">
                <InvoiceModal onClose={this.modalClose} isShown={this.state.isShowAddModal}
                              onChangeInvoice={this.onChangeInvoice}/>
                <ViewModal invoice={this.state.invoices[this.state.showId]} isShown={this.state.isShowViewModal} closeModal={this.closeViewModal}/>
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
                                            invoice={invoce}
                                            showViewModal={this.showViewModal}
                                            clickedIndex={this.clickedId}
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
