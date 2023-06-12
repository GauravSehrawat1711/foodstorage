const mongoose = require('mongoose')

const connectDB=async()=>{
  await mongoose.connect("mongodb+srv://gaurav:gaurav@taskmanager.larkiir.mongodb.net/nodeassignment?retryWrites=true&w=majority")
}
module.exports=connectDB