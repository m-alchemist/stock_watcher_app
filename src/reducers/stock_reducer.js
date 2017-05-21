import {FETCH_STOCK_DATA, REMOVE_STOCK_DATA} from '../actions/index';


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


    // return state.concat([action.payload.data]);

        console.log(action.payload);
      var data=join(action.payload.data.Dates,
        action.payload.data.Elements[0].DataSeries.close.values)
      var tickerDataObj={name:action.payload.data.Elements[0].Symbol, data:data}
        var newArr=[...state,tickerDataObj];
        console.log(newArr);
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
