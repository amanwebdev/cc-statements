import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'

import MaritalTrends from '../components/MaritalTrends'
import EducationTrends from '../components/EducationTrends'
import AgeTrends from '../components/AgeTrends'
import { loadTrendData } from '../actions'


class TrendsPage extends Component {

    static propTypes = {
        isFailure: PropTypes.bool,
        isFetching: PropTypes.bool,
        data: PropTypes.object,
        token: PropTypes.string,
        isAuthenticated: PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.state = {
            maritalTrend: null
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.loadTrendData(this.props.token);
    }

    componentWillReceiveProps(newProps) {
        const maritalTrends = newProps.data.maritalTrend
        const educationTrends= newProps.data.educationTrend
        const ageTrends = newProps.data.ageTrend

        this.setState({
            maritalTrendChart: maritalTrends!=null? this.trendChart(MaritalTrends, maritalTrends) : null,
            educationTrendChart: educationTrends!=null? this.trendChart(EducationTrends, educationTrends) : null,
            ageTrendChart: ageTrends!=null? this.trendChart(AgeTrends, ageTrends) : null
        })
        
    }

    trendChart(Component, trends) {
        const key = Object.keys(trends)[0];
        const item = trends[key];

        return (
            <Component {...this.props} data={item} />
        )
    }

    render() {

        return (
            <div>
                {this.state.maritalTrendChart}
                <br />
                {this.state.educationTrendChart}
                <br />
                {this.state.ageTrendChart}
            </div>
        )

    }

}

function mapStateToProps(state) {

    return {
        isFailure: state.data.isFailure,
        isFetching: state.data.isFetching,
        data: state.data.data,
        token: state.data.token,
    }

}

export default connect(mapStateToProps,
    { loadTrendData }
)(TrendsPage)
