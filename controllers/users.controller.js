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
      name: user.name,
      role: user.role
    });

    return res.status(200)
    .json({
      token: token
    })
  }
  catch(err){
    next(err);
  }
}

exports.updateUser = async(req, res, next) => {
  try{
    const userId = req.user.id
    const { email, full_name } = req.body;

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
        updatedAt: user.updateAt
      }
    })
  }
  catch(err){
    next(err);
  }
}