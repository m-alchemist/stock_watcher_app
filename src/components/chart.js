import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
export const FETCH_STOCK_DATA='FETCH_STOCK_DATA';
const proxy = 'https://cors-anywhere.herokuapp.com/';


class Chart extends Component{
  renderChart(){


/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart() {

    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
  }
   var seriesOptions=[]
   for(var i=0;i<this.props.data.length;i++){
     console.log('here here',this.props.data[i])
   seriesOptions.push({name:this.props.data[i].name,data:this.props.data[i].data})

}
    createChart();


}


  render(){
    return (
      <div id='container'>
      {this.renderChart()}
        
      </div>

    )
  }


}
function mapStatetoProps(state){
  // console.log('at chart',state.data)
  return{
    data: state.data
  }
}
export default connect(mapStatetoProps)(Chart)
