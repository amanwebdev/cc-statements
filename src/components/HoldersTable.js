import React, { Component } from 'react'
import { SEX, MARITAL_STATUS, EDUCATION } from '../constants'

export default class HoldersTable extends Component {
    render() {

        return (
            <table className="table is-bordered is-striped is-narrow hldr-tbl">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Limit Available</th>
                        <th>Sex</th>
                        <th>Education</th>
                        <th>Age</th>
                        <th>Repayment Sep</th>
                        {/* <th>Repayment Aug</th>
                        <th>Repayment Jun</th>
                        <th>Repayment July</th>
                        <th>Repayment May</th>
                        <th>Repayment April</th> */}
                        <th>Bill Sep</th>
                        {/* <th>Bill Aug</th>
                        <th>Bill Jun</th>
                        <th>Bill July</th>
                        <th>Bill May</th>
                        <th>Bill April</th> */}
                        <th>Payment Sep</th>
                        {/* <th>Payment Aug</th>
                        <th>BiPaymentll Jun</th>
                        <th>Payment July</th>
                        <th>Payment May</th>
                        <th>Payment April</th>
                        <th>Default Payment</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    }
    
    getRows() {
        return this.props.holders.map(holder => {
            return (
                <tr key={holder.id} onClick={()=>this.props.showHolder(holder.id)}>
                        <th>{holder.id}</th>
                        <td>{holder.name}</td>
                        <td>{holder.limitBal}</td>
                        <td>{SEX[holder.sex]}</td>
                        <td>{EDUCATION[holder.education]}</td>
                        <td>{MARITAL_STATUS[holder.marriage]}</td>
                        <td>{holder.repaySep}</td>
                        {/* <td>{holder.repayAug}</td>
                        <td>{holder.repayJul}</td>
                        <td>{holder.repayJun}</td>
                        <td>{holder.repayMay}</td>
                        <td>{holder.repayApril}</td> */}
                        <td>{holder.billAmtSep}</td>
                        {/* <td>{holder.billAmtAug}</td>
                        <td>{holder.billAmtJul}</td>
                        <td>{holder.billAmtJun}</td>
                        <td>{holder.billAmtMay}</td>
                        <td>{holder.billAmtApril}</td> */}
                        <td>{holder.paymentSep}</td>
                        {/* <td>{holder.paymentAug}</td>
                        <td>{holder.paymentJul}</td>
                        <td>{holder.paymentJun}</td>
                        <td>{holder.paymentMay}</td>
                        <td>{holder.paymentApril}</td>
                        <td>{holder.defaultPaymentNextMonth}</td> */}
                </tr>
            );
        })
    }

}
