import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CcHolder from '../components/CcHolder'
import { loadHolder } from '../actions'

class HolderPage extends Component {

    static propTypes = {
        isFailure: PropTypes.bool,
        isFetching: PropTypes.bool,
        data: PropTypes.object,
        token: PropTypes.string,
        loadHolder: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.state = {
            holder : null
        }
    }
    componentWillMount() {

    }

    componentDidMount() {
        this.props.loadHolder(this.props.token, this.props.params.holderId);
    }

    componentWillReceiveProps(newProps) {
       this.setState({
           holder : newProps.data.holders[this.props.params.holderId]
       })
    }

    render() {

        return (
            <div  style={{"margin":"50px 200px"}}>
                {this.state.holder ? <CcHolder holder={this.state.holder} /> : ''}
            </div>
        )

    }

}

function mapStateToProps(state) {

    return {
        isFailure: state.data.isFailure,
        isFetching: state.data.isFetching,
        data: state.data.data,
        token: state.auth.token,
        isMobile: state.app.isMobile,
        isAuthenticated: state.auth.isAuthenticated,
    }

}

export default connect(mapStateToProps, { loadHolder })(HolderPage)
