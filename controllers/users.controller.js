const { User } = require("../models");
const  helper = require("../helpers/helpers");

exports.register = async(req, res, next) => {
  try{
    const {
      full_name,
      password,
      gender,
      email
    } = req.body;
    
    const findUser = await User.findOne({
      where: { email: email }
    });
  
    if(findUser){
      return res.status(302).json({
        message: "User with email was registered"
      });
    }
  
    const hashPassword = helper.hash(password);
    const user = await User.create({
      full_name: full_name,
      email: email,
      gender: gender,
      password: hashPassword
    });

    return res.status(201)
    .json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        gender: user.gender,
        balance: helper.convertToIDR(user.balance),
        createdAt: user.createdAt
      }
    })
  }
  catch(error){
    console.log(error.message);
    next(error);
  }
}

exports.login = async(req, res, next) => {
  try{
    const { email, password } =  req.body;
  
    const user = await User.findOne({ where: { email: email }});

    if(!user){
      return res.status(404)
      .json({
        message: "User with this email not found"
      });
    }


    const isValid = helper.compare(password, user.password);

    if(!isValid){
      return res.status(401)
      .json({
        message: "Invalid crendentials"
      });
    }

    const token = helper.generateToken({
      id: user.id,
      full_name: user.full_name,
      role: user.role
    });

    return res.status(200)
    .json({
      token: token
    })
  }
  catch(err){
    console.log(err.message);
    next(err);
  }
}

exports.updateUser = async(req, res, next) => {
  try{
    const userId = req.user.id;
    const paramUserId = req.params.userId
    const { email, full_name } = req.body;

    if(parseInt(paramUserId) !== parseInt(userId)) {
      return res.status(401)
      .json({
        message: "Unaouthorized!"
      });
    }

    const user = await User.findByPk(userId);

    if(!user){
      return res.status(404)
      .json({
        message: "User not found"
      });
    }

    await user.update({
      email: email,
      full_name: full_name
    });

    return res.status(200)
    .json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  }
  catch(err){
    console.log(err.message);
    next(err);
  }
}

exports.delete = async (req, res, next) => {
  try{
    const userId = req.user.id;
    const paramUserId = req.params.userId;

    if(parseInt(paramUserId) !== parseInt(userId)) {
      return res.status(401)
      .json({
        message: "Unaouthorized!"
      });
    }

    const user = await User.findByPk(userId);

    if(!user){
      return res.status(404)
      .json({
        message: "User not found"
      });
    }

    await user.destroy();

    return res.status(200)
    .json({
      message: "Your account has been successfully deleted"
    });
  }
  catch(err){
    console.log(err.message);
    next(err);
  }
}

exports.topup = async (req, res, next) => {
  try{
    const userId = req.user.id
    const { balance } = req.body;

    const user = await User.findByPk(userId);

    user.balance = user.balance + balance;
    await user.save();

    return res.status(200)
    .json({
      message: `Your Balance has been successfully updated to ${helper.convertToIDR(user.balance)}`
    });
  }
  catch(err){
    console.log(err.message);
    next(err);
  }
}