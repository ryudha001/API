const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    				    id: {type: String, required: true, max: 10},
    				    name: {type: String, required: true, max:50},
				    departmen: {type: String, required:true, max:50}
			       });


// Export the model
module.exports = mongoose.model('Employee', EmployeeSchema);
