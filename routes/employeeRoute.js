const express = require('express');
const employeeModel = require('../models/employee');
const mongoose = require("mongoose");
const { request } = require('express');
const app = express.Router()

  
  //Read ALL
app.get('/employees', async (req, res) => {
    const employees = new employeeModel(request.body);
    try {
      await employees.save();
      res.status(200).send(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
app.post('/employees',async(request,response) =>{
    const employee = new employeeModel(request.body);
    try{
        await employee.save();
        response.status(201).send(employee);
    }catch(error){
        response.status(400).send(employee);
    }
});
  
  
  //Get employee by id
app.get('/employees/:empID',async(request,response) =>{
    try{
        response.send(await employeeModel.findById(request.params.empID,request.body));
    }catch(error){
        response.status(400).send(error);
    }
});
  
  
  //Update Record
app.put("/employees/:empID", async (req, res) => {
    try {
        const updateEmployee = await employee.findByIdAndUpdate(req.params.empID, req.body);
        res.status(200).json(updateEmployee);
    } 
    catch (error) {
        // if employee was not found
        if (error.kind === "ObjectId") {
            res.status(400).json({ "message": `employee with id: ${req.params.empID} was not found` });
        }
        else {
            res.status(400).json({ "message": error.message })
        }
    }
});

//Delete Record
app.delete("/employees/:empID",async(request,response) =>{
    try{
        await employeeModel.findByIdAndDelete(request.params.empID);
        response.send("Deleted Sucessfully");
    }catch(error){
        response.status(400).send(error);
    }
});
  

module.exports = app