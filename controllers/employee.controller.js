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

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


// 
exports.employee = function (req, res) {
   Employee.find(function (err, employee) {
        if (err) return next(err);
        res.send(employee);
    })
};

// 
exports.employee_create = function (req, res) {
    let employee = new Employee(
        {
            id: req.body.id,
            name: req.body.name,
            departmen: req.body.departmen,
        }
    );

    employee.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Employee Created successfully')
    })
};


// 
exports.employee_details = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err) return next(err);
        res.send(employee);
    })
};








//
exports.employee_update = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
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
};

//
exports.employee_delete = function (req, res) {
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};




