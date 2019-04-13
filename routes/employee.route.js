const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const Employee = require('../models/employee.model');
const router = express.Router();

const employee_controller = require('../controllers/employee.controller');

router.get('/test', employee_controller.test);

router.get('/', employee_controller.employee);

router.post('/create', cors(), (req, res, next) => {
	Employee.create({ id: req.body.id, name: req.body.name, departmen: req.body.departmen}, function (err, small) {
  		if (err) return handleError(err);
		res.json('Create complete');
      	});
});
   						

router.get('/:id', cors(), (req, res, next) => {
	Employee.findOne({id:req.params.id}, function(err, employee) {
		if (!employee)
      			return next(new Error('Could not load Document'));
    		else {
        		res.send(employee);
      		}      
   	});
});


router.post('/update/:id', cors(), (req, res, next) => {  
	Employee.findOne({id:req.params.id}, function(err, employee) {
		if (!employee)
      			return next(new Error('Could not load Document'));
    		else {
        		employee.id = req.body.id;
			employee.name = req.body.name;
			employee.departmen = req.body.departmen;

        		employee.save().then(employee => {  
          		res.json('Update complete');
      		     })
      			.catch(err => {
            			res.status(400).send("unable to update the database");
      			 });
    		}
   	});
})


router.get('/delete/:id', cors(), (req, res, next) => {  
	Employee.deleteOne({id:req.params.id}, function(err, employee) {
		if (err) return next(err);
        		res.send('Deleted successfully!');
  		});
	});

module.exports = router;
