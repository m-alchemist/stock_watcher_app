import {FETCH_STOCK_DATA, REMOVE_STOCK_DATA} from '../actions/index';
import io from 'socket.io-client';

function join(array1, array2){
  var result=[];
  for ( var i = 0; i < array1.length; i++ ) {
      var date = new Date(array1[i]);
      date=Date.parse(date)
  result.push( [ date, array2[i] ] );
}
return result;
}

export default function(state=[], action){


  switch (action.type){
    case FETCH_STOCK_DATA:
    //double check if ticker already exists
      var tickerExists=false
      state.map((item)=>{
        if(item.name==action.payload.data.Elements[0].Symbol){
            tickerExists=true;
        }

      })
      if(tickerExists){
        return state
      }
      var data=join(action.payload.data.Dates,
        action.payload.data.Elements[0].DataSeries.close.values)
      var tickerDataObj={name:action.payload.data.Elements[0].Symbol, data:data}
        var newArr=[...state,tickerDataObj];


      return newArr ;
    case REMOVE_STOCK_DATA:
        var newArr=[];
        for(var i=0; i<state.length;i++){
          if(state[i].name!=action.payload){
            newArr.push(state[i]);
          }
        }
        return newArr;
      default:
        return state;
      }
}
