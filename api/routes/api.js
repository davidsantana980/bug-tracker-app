'use strict';

const mongoose = require('mongoose');
const { issueSchema } = require('../mongo.js');
const Issue = mongoose.model('Issue', issueSchema);
// const ObjectId = require('mongodb').ObjectId;

const readOne = (search, options) => {
  let found = Issue.findOne(search, options)
  return found;
}

const readMany = (search, options) => {
  let found = Issue.find(search, options)
  return found;
}

module.exports = function (app) {

  app.get('/api/issues', async (req, res) => {
    let queryParams = { 
      project: req.query.project,
      assigned_to: req.query.assigned_to,
      status_text: req.query.status_text,
      open: req.query.open,
      _id: req.query._id,
      issue_title: req.query.issue_title,
      issue_text: req.query.issue_text,
      created_by: req.query.created_by,
      created_on: req.query.created_on,
      updated_on: req.query.updated_on
    } 
    
    //delete undefined query parameters
    Object.keys(queryParams).forEach(key => queryParams[key] === undefined ? delete queryParams[key] : {});

    //not gonna get all objects
    // if(Object.values(queryParams).length < 1) return res.json({ error: 'no get field(s) sent' })  

    try{
      let result = await readMany(queryParams);
      return res.json(result)
    }catch(error){
      return res.json(error)
    }
  })
    
  app.post('/api/issues', async (req, res) => {
    let date = new Date();

    let doc = {
      project: req.body.issue_project,
      issue_title: req.body.issue_title,
      issue_text: req.body.issue_text, 
      created_on: date,
      updated_on: date,
      created_by: req.body.created_by,
      assigned_to: req.body.assigned_to, 
      status_text: req.body.status_text
    }

    try{
      let id = (await Issue.create(doc))._id;
      let result = await readOne({_id: id._id}, {project: 0}).lean();
      return res.json(result)
    }catch(error){
      return res.json ({ error: 'required field(s) missing' });
    }
  })
    
  app.put('/api/issues', async (req, res) => {      
    let updatedItems = {
      project: req.body.issue_project,
      issue_title: req.body.issue_title,
      issue_text: req.body.issue_text, 
      updated_on: new Date(),
      created_by: req.body.created_by,
      assigned_to: req.body.assigned_to, 
      status_text: req.body.status_text,
      open: req.body.open
    }

    if(!req.body._id) return res.json({ error: 'missing _id' })

    //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
    Object.keys(updatedItems).forEach(key => !updatedItems[key] && typeof(updatedItems[key]) !== "boolean" ? delete updatedItems[key] : {});
    
    //1 item will always be updated; the date of the update. 
    //if no more items were updated, it means no update fields were filled.

    // if(Object.entries(updatedItems).length <= 2) return res.json({ error: 'no update field(s) sent', _id: req.body._id })  

    try{
      if(!req.body._id) return res.json({ error: 'missing _id' })  
      await Issue.findByIdAndUpdate(req.body._id, updatedItems, (err, data) => {
        if(!data || err){
          return res.json({ error: "could not update", _id: req.body._id })
        }
        return res.json(data);
      }).clone();
    }catch(error){
      return 0//console.log(error)
    }
  })
    
  app.delete('/api/issues', async (req, res) => {    
    try{
      if(!!req.body._id) {//return res.json({ error: 'missing _id' })  
        return await Issue.findByIdAndDelete(req.body._id, (err,data) => {
          if(!data || err){
            return res.json({ error: 'could not delete', _id: req.body._id });
          }
          return res.json({ result: 'successfully deleted', _id: req.body._id })
        }).clone();
      }

      if(!!req.body.project){ //return res.json({ error: 'missing project' })  
        return await Issue.deleteMany({project : req.body.project}, (err,data) => {
          if(!data || err){
            return res.json({ error: 'could not delete', project: req.body.project });
          }
          return res.json({ result: 'successfully deleted', project: req.body.project })
        });
      }

      throw new Error;
    }catch(error){
      return 0//console.log(error)
    }
  });  
};