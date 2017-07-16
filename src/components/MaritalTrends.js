import React from 'react'
import ReactHighcharts from 'react-highcharts'

export default class MaritalTrend extends React.Component {
    render(){
        console.log("props :"+JSON.stringify(this.props.data))
        return (
            <ReactHighcharts config={getConfig(this.props.data)}></ReactHighcharts>
        )
    }
}

const getConfig = (data) => {
    return {
        chart: {
            type: 'column',
            backgroundColor: '#84bac5'
        },
        title: {
            text: 'Payments by Marital Status'
        },
        xAxis: {
            categories: data.categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Payment'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data.series
    }
}