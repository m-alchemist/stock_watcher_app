const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const stockSchema=new Schema ({

  ticker: {type: String, unique: true, uppercase: true}


})

const ModelClass=mongoose.model('stock',stockSchema);

module.exports=ModelClass;
