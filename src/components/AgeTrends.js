import React from 'react'
import ReactHighcharts from 'react-highcharts'

export default class MaritalTrend extends React.Component {
    render() {
        return (
            <ReactHighcharts config={getConfig(this.props.data)}></ReactHighcharts>
        )
    }
}

const getConfig = (trendData) => {
    return {
        chart: {
            backgroundColor: '#84bac5'
        },
        title: {
            text: 'Payments by Age'
        },
        yAxis: {
            title: {
                text: 'Payment'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                pointStart: 2010
            }
        },
        series: trendData.lineSeries
    }
}