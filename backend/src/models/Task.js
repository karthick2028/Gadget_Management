const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type：String,    
trim:true,    
default:'General'  
},  
dueDate:{type:D ate,default:nul l},  
createdAt:{type:D ate,default:D ate.now()},  
updatedAt:{type:D ate,default:D ate.now()} 
}); 

taskSchema.pre('save',function(next){this.updatedAt=Date.now();next();});

module.exports=mongoose.model('Task',taskSchema);
