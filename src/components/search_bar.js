import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../actions';
import $ from 'jquery';
import _ from 'lodash';
import io from 'socket.io-client';

class SearchBar extends Component{
  constructor(props,context){
    super(props,context);
    this.state={term:'',
    dropdown:[],
  currentStocks:[]
  }
}
componentDidMount(){

  this.socket=io('/');
  this.socket.on('stockHistory',data=>{


    this.setState({currentStocks:data})

    data.map((stock)=>{
      if(this.props.tickerArray.indexOf(stock<0)){
          this.props.getStockData({ticker:stock})
        }
      })
  })
  this.socket.on('addStock',currentStock=>{
    if(this.state.currentStocks.indexOf(currentStock)<0){
    this.setState({currentStocks:[ ...this.state.currentStocks,currentStock]})

          this.props.getStockData({ticker:currentStock})
        }

  })
  this.socket.on('removeStock',currentStock=>{

    var arr=this.state.currentStocks;
    arr=arr.splice(arr.indexOf(currentStock),1)
    this.setState({currentStocks:arr})

          this.props.removeStockData({ticker:currentStock})

  })
}

     onInputChange=(event)=>{

    const  body=event.target.value
    this.setState({term:body});
    var _this = this;
    if(body.length==0){
      this.setState({dropdown:[]});
    }
    if (body.length>1){
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    $.getJSON(`${proxy}http://dev.markitondemand.com/MODApis/api/v2/Lookup/json?input=${body}`,function(data,err){

      if(err)

        _this.setState({dropdown:data})
      })
    }
  }
  renderListItem=()=>{
    if(this.state.dropdown){
    return this.state.dropdown.map((item)=>{
      return(<li key={item.Symbol} onClick={this.handleFormSubmit.bind(this,item.Symbol)}  className='list-group-item'>
             {item.Symbol}   ({item.Name})
               </li>)
    })
  }
}
  renderTickerButton=()=>{

    if(this.props.tickerArray){
    return this.props.tickerArray.map((item)=>{

      return(<button key={item.name} onClick={this.handleButtonSubmit.bind(this,item.name)}  className='tickerButton'>
             x {item.name}
               </button>)
    })
  }
  else{
    return (<div></div>);
    }
  }
  handleFormSubmit(event){
    const body=event;
    if( body){
      var tickerExists=false;
      this.props.tickerArray.map((item)=>{
        if(item.name==body){
          tickerExists=true;

            }
          })
      if(!tickerExists){
        this.setState({currentStocks:[ ...this.state.currentStocks,body]})
        this.socket.emit('addStock',body);
        this.props.getStockData({ticker:body})  }
        this.setState({term:''});
          this.setState({dropdown:[]});
      }
    }
    handleButtonSubmit(event){
      const body=event;
      var arr=this.state.currentStocks;
      arr=arr.splice(arr.indexOf(body),1)
      this.setState({currentStocks:arr})
        this.socket.emit('removeStock',body);
      this.props.removeStockData({ticker:body})
      }

  render(){

    return(
      <div>

          <label><p>Ticker</p></label>
          <input
          className='form-control '
           value={this.state.term}
           onChange={this.onInputChange}

           placeholder='enter Ticker...'
           autoComplete="off"


            type='text'/>

           <ul className=" list-group">
             {  this.renderListItem()}

            </ul>
            {this.renderTickerButton()}

      </div>
    )
  }
}

function mapStatetoProps(state){
  return {tickerArray:state.data}
}
export default connect(mapStatetoProps,actions)(SearchBar)
