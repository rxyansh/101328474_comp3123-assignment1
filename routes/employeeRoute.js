const express = require('express');
const employeeModel = require('../models/employee');
const mongoose = require("mongoose");
const app = express.Router()


  
  //Read ALL
app.get('/api/emp/employees', async (req, res) => {
    const employees = await employeeModel.find({});
  
  
    try {
      res.status(200).send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
app.post('/api/emp/employees', async (req, res) => {
    const employee = new employeeModel(req.body);
  
    try {
      await employee.save();
      res.status(201).send(employee);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  
  //Get employee by id
app.get('/api/emp/employees/:id', async (req, res) => {
    const idfind = req.params.id
    console.log(idfind)
  
    const employees = await employeeModel.findById(idfind);
  
    try {
      res.status(200).send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  
  //Update Record
app.put('/api/emp/employees/:id', async (req, res) => {
    try {
      await employeeModel.findByIdAndUpdate(req.params.id, req.body)
      await employeeModel.save()
      res.status(200).send(employee)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  
  
  
  
  //Delete Record
  //localhost:8081/employee/5d1f6c3e4b0b88fb1d257237
app.delete("/employees/:empID",async(request,response) =>{
    try{
        await employeeModel.findByIdAndDelete(request.params.empID);
        response.send("Deleted Sucessfully");
    }catch(error){
        response.status(400).send(error);
    }
});
  
  module.exports = app


module.exports = app