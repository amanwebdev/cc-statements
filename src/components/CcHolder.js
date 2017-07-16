import React, { Component } from 'react'
import { SEX, MARITAL_STATUS, EDUCATION } from '../constants'
import './CcHolder.css'

export default class CcHolder extends Component {
    render() {
        const holder = this.props.holder
        return (
            <div>
                <div className='box bio'>
                    <div className="title">
                        {holder.name} {holder.repaySep>=6 ? <span className="tag is-danger">Defaulter</span> : ''}
                    </div>
                                 
                    <table className='bio-tbl'>
                        <tbody>
                            <tr>
                                <th>Sex</th>
                                <td>{SEX[holder.sex]}</td>
                            </tr>
                            <tr>
                                <th>Marital Status</th>
                                <td>{MARITAL_STATUS[holder.marriage]}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td>{holder.age}</td>
                            </tr>
                            <tr>
                                <th>Education</th>
                                <td>{EDUCATION[holder.education]}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>



                <table className='table box statement'>
                    <thead>
                        <tr className='amt-head'>
                            <th></th>
                            <th>September '05</th>
                            <th>August '05</th>
                            <th>July '05</th>
                            <th>June '05</th>
                            <th>May '05</th>
                            <th>April '05</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='amt-row'>
                            <th>Repayment Status</th>
                            <td>{holder.repaySep}</td>
                            <td>{holder.repayAug}</td>
                            <td>{holder.repayJul}</td>
                            <td>{holder.repayJun}</td>
                            <td>{holder.repayMay}</td>
                            <td>{holder.repayApril}</td>
                        </tr>
                        <tr className='amt-row'>
                            <th>Bill Amount</th>
                            <td>{holder.billAmtSep}</td>
                            <td>{holder.billAmtAug}</td>
                            <td>{holder.billAmtJul}</td>
                            <td>{holder.billAmtJun}</td>
                            <td>{holder.billAmtMay}</td>
                            <td>{holder.billAmtApril}</td>
                        </tr>
                        <tr className='amt-row'>
                            <th>Previous Payment</th>
                            <td>{holder.paymentSep}</td>
                            <td>{holder.paymentAug}</td>
                            <td>{holder.paymentJul}</td>
                            <td>{holder.paymentJun}</td>
                            <td>{holder.paymentMay}</td>
                            <td>{holder.paymentApril}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}
