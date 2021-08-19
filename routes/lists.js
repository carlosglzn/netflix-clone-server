const express = require('express')
const router  = express.Router()
const verify = require('../verifyToken')
const List = require('./../models/List.js')

//CREATE

router.post("/", verify, async (req, res) => {

      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json(err);
      }

  });
  
  //DELETE
  
  router.delete("/:id", verify, async (req, res) => {

      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("The list has been delete...");
      } catch (err) {
        res.status(500).json(err);
      }

  });
  
  //GET
  
  router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router