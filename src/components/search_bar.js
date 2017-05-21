import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../actions';
import $ from 'jquery';
import _ from 'lodash';


class SearchBar extends Component{
  constructor(props,context){
    super(props,context);
    this.state={term:'',
    dropdown:[]}
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
    console.log('here',this.state.dropdown[0]);
    $.getJSON(`${proxy}http://dev.markitondemand.com/MODApis/api/v2/Lookup/json?input=${body}`,function(data,err){
      // console.log('Data',data);
      if(err)
      console.log(err)
        console.log(data);
        _this.setState({dropdown:data})
      })
    }
  }
  renderListItem=()=>{
    if(this.state.dropdown){// console.log('render list',this.state.dropdown[0])
    return this.state.dropdown.map((item)=>{
      return(<li key={item.Symbol} onClick={this.handleFormSubmit.bind(this,item.Symbol)}  className='list-group-item'>
             {item.Symbol}   ({item.Name})
               </li>)
    })
  }
}
  renderTickerButton=()=>{
    console.log(this.props.tickerArray)
    if(this.props.tickerArray){// console.log('render list',this.state.dropdown[0])
    return this.props.tickerArray.map((item)=>{
      console.log(item.name);
      return(<button key={item.name} onClick={this.handleButtonSubmit.bind(this,item.name)}  className='btn btn-danger'>
             X {item.name}
               </button>)
    })
  }
  else{
    return (<div></div>);
    }
  }
  handleFormSubmit(event){
    const body=event;
    console.log(body);

    // console.log('at search bar',ticker.toLowerCase());
    if( body){
      var tickerExists=false;
      this.props.tickerArray.map((item)=>{
        if(item.name==body){
          tickerExists=true;
          console.log(tickerExists)
            }
          })
      if(!tickerExists){
        this.props.getStockData({ticker:body})  }
        this.setState({term:''});
          this.setState({dropdown:[]});
      }
    }
    handleButtonSubmit(event){
      const body=event;
      this.props.removeStockData({ticker:body})
      }

  render(){

    return(
      <div>

          <label>Ticker</label>
          <input
          className='form-control'
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
