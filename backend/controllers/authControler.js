const userModel = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerControler=async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        res.status(400).json("User Already exist");
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            res.status(500).json("An Error Occured");
          } else {
            const newUser = new userModel({
              name,
              email,
              password: hash
            });
            const savedUser = await newUser.save();
            res.status(201).json({  
              _id: savedUser._id,
              name: savedUser.name,
              email: savedUser.email,
              message:"Register Success"
          });
          }
        });
      }
    } catch (error) {
      res.status(500).json("An Error occured");
    }
  }


  const loginControler=async (req, res) => {
    const { email, password } = req.body;
    try {
      const data = await userModel.findOne({ email });
      if (data) {
          const hash_pass = data.password;
        bcrypt.compare(password, hash_pass, (err, result) => {
          if (result) {
            const token = generateToken(data._id);
            let user=data;
            res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: token ,
            message:"Login Success"
            });
          } else {
            res.status(401).json("Wrong Password");
          }
        });
      } else {
        res.status(404).json("User Does not Exist");
      }
    } catch (error) {
      res.status(404).json("User Does not Exist");
    }
  }

  module.exports={
    registerControler,loginControler
  }