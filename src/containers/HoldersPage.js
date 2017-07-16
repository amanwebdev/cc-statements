import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HoldersTable from '../components/HoldersTable'
import { loadHolders, loadDefaulters, filterHoldersById, filterHoldersByName } from '../actions'
import { SortType, SortOrder } from '../constants'
import { ITEMS_PER_PAGE } from '../constants'
import ReactPaginate from 'react-paginate'

import './HoldersPage.css'
//import './LoginPage.css'

class HoldersPage extends Component {

    static propTypes = {
        isFailure: PropTypes.bool,
        isFetching: PropTypes.bool,
        data: PropTypes.object,
        token: PropTypes.string,
        loadHolders: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.pageChanged = this.pageChanged.bind(this)
        this.showHolder = this.showHolder.bind(this)
        this.toggleDefaulters = this.toggleDefaulters.bind(this)
        this.filterById = this.filterById.bind(this)
        this.filterByName = this.filterByName.bind(this)

        this.state = {
            showDefaulters: false,
            currentPage: 0,
            holders: []
        }

    }
    componentWillMount() {

    }

    componentDidMount() {
        this.props.loadHolders(this.props.token, this.state.currentPage, ITEMS_PER_PAGE);
    }

    componentWillReceiveProps(newProps) {

        const holders = newProps.data ? Object.keys(newProps.data.holders).map(val => newProps.data.holders[val]) : []
        this.setState({
            holders: holders,
        })

    }

    render() {
        const pageCount = this.state.holders.length > 0 ? 100 : 0;

        return (
            <div className="" style={{ "marginTop": "0px !important" }}>
                <div className='toolbar'>
                    <h5 className='sub-title'>Filter By </h5>
                    <input type='text' placeholder='ID' onChange={(event) => this.filterById(event.target.value)} />
                    /
                    <input type='text' placeholder='NAME' onChange={(event) => this.filterByName(event.target.value)} />

                    <span className="tag is-danger is-large defaulter roundedOne" onClick={this.toggleDefaulters}>
                        <input
                            type="checkbox" value="None" id="roundedOne" name="check"
                            checked={this.state.showDefaulters}
                            onChange={this.toggleDefaulters} />

                        <label htmlFor="roundedOne"></label>
                        Defaulters
                    </span>


                </div>

                <div style={{ "width": "100%", "height": "400px" }} className={!this.state.isFetching ? 'hidden' : ''}>
                    <div className="loader"><div className="ball-triangle-path"><div></div><div></div><div></div></div></div>
                </div>

                <div className={this.state.isFetching ? 'hidden' : ''}>
                    <HoldersTable holders={this.state.holders} showHolder={this.showHolder} />
                    <div className="paginator-hldr">
                        <ReactPaginate previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={2}
                            onPageChange={this.pageChanged}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            </div>
        )

    }

    pageChanged(event) {
        const pageSelected = event.selected + 1
        console.log("page changed " + pageSelected)
        const newState = { currentPage: pageSelected }
        this.setState(newState)
        this.props.loadHolders(this.props.token, pageSelected, ITEMS_PER_PAGE)
    }

    showHolder(holderId) {
        browserHistory.push(`/holder/${holderId}`);
    }

    toggleDefaulters(event) {
        event.preventDefault();
        this.setState({
            showDefaulters: !this.state.showDefaulters
        })
        if (!this.state.showDefaulters) {
            this.props.loadDefaulters(this.props.token, this.state.currentPage, ITEMS_PER_PAGE);
        } else {
            this.props.loadHolders(this.props.token, this.state.currentPage, ITEMS_PER_PAGE);
        }
    }

    filterByName(value) {
        if (value.length == 0)
            return
        this.props.filterHoldersByName(this.props.token, value, this.state.currentPage, ITEMS_PER_PAGE)
    }

    filterById(value) {
        if (value.length == 0)
            return
        this.props.filterHoldersById(this.props.token, value, this.state.currentPage, ITEMS_PER_PAGE)
    }


}

function mapStateToProps(state) {

    return {
        isFailure: state.data.isFailure,
        isFetching: state.data.isFetching,
        data: state.data.data,
        token: state.data.token
    }

}

export default connect(mapStateToProps,
    { loadHolders, loadDefaulters, filterHoldersById, filterHoldersByName }
)(HoldersPage)
