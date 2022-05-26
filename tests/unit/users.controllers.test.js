const mock = require("node-mocks-http");
const UserController = require("../../controllers/users.controller");
const { User } = require("../../models");
const USER_DATA = require("../data/users.data");
const helper = require("../../helpers/helpers")

let req, res, next;

jest.mock("../../models");

beforeEach(() => {
  req = mock.createRequest();
  res = mock.createResponse();
  next = jest.fn();
});

describe('UserController.register', () => {
  it('Should return 201 when success registered', async () => {
    helper.hash = jest.fn().mockImplementation(() => "123123")

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(USER_DATA.USER_REGISTER);

    await UserController.register(req, res, next);
    expect(res.statusCode).toEqual(201);
    expect(res._getJSONData()).toHaveProperty("user");
  });
  
  it('Should return 302 when email was registered', async () => {
    User.findOne.mockResolvedValue(USER_DATA.USER_DATA);

    await UserController.register(req, res, next);
    expect(res.statusCode).toEqual(302);
    expect(res._getJSONData()).toHaveProperty("message", "User with email was registered");
  });

  it('Should handle errors', async() => {
    User.findOne.mockRejectedValue({ message: "Handle error in register"});

    await UserController.register(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('UserController.login', () => {
  it('Should return 200 when success login', async () => {
    req.body = USER_DATA.USER_REGISTER;
    User.findOne.mockResolvedValue(USER_DATA.USER_DATA);
    helper.compare = jest.fn().mockImplementation(() => true);

    await UserController.login(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("token");
  });

  it('Should return 401 when wrong password', async () => {
    req.body = USER_DATA.USER_REGISTER;
    User.findOne.mockResolvedValue(USER_DATA.USER_DATA);
    helper.compare = jest.fn().mockImplementation(() => false);

    await UserController.login(req, res, next);
    expect(res.statusCode).toEqual(401);
    expect(res._getJSONData()).toHaveProperty("message");
  });
  
  it('Should return 404 when user with email not found', async () => {
    User.findOne.mockResolvedValue(null);

    await UserController.login(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._getJSONData()).toHaveProperty("message", "User with this email not found");
  });

  it('Should handle errors', async() => {
    User.findOne.mockRejectedValue({ message: "Handle error in login"});

    await UserController.login(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('UserController.updateUser', () => {
  beforeEach(() => {
    req.user = USER_DATA.USER_PAYLOAD;
    req.body = USER_DATA.USER_UPDATE;
    req.params.userId = 1;
  });

  it('Should return code 200 when success update User', async() => {
    User.findByPk.mockResolvedValue({
      ...USER_DATA.USER_DATA,
      update: jest.fn()
    });

    await UserController.updateUser(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("user", USER_DATA.USER_DATA);
  });

  it('Should return code 401 when unauthorized', async() => {
    req.params.userId = 3;

    User.findByPk.mockResolvedValue({
      ...USER_DATA.USER_DATA,
      update: jest.fn()
    });

    await UserController.updateUser(req, res, next);
    expect(res.statusCode).toEqual(401);
    expect(res._getJSONData()).toHaveProperty("message","Unaouthorized!");
  });

  it('Should return code 404 when user not found', async() => {
    req.params.userId = 1;

    User.findByPk.mockResolvedValue(null);

    await UserController.updateUser(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._getJSONData()).toHaveProperty("message","User not found");
  });

  it('Should handle errors', async() => {
    User.findByPk.mockRejectedValue({ message: "Handle error in update user"});

    await UserController.updateUser(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('UserController.deleteUser', () => {
  beforeEach(() => {
    req.user = USER_DATA.USER_PAYLOAD;
    req.params.userId = 1;
  });

  it('Should return code 200 when success delete User', async() => {
    User.findByPk.mockResolvedValue({
      ...USER_DATA.USER_DATA,
      destroy: jest.fn()
    });

    await UserController.delete(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toHaveProperty("message", "Your account has been successfully deleted");
  });

  it('Should return code 401 when unauthorized', async() => {
    req.params.userId = 3;

    User.findByPk.mockResolvedValue({
      ...USER_DATA.USER_DATA,
      destroy: jest.fn()
    });
    
    await UserController.delete(req, res, next);
    expect(res.statusCode).toEqual(401);
    expect(res._getJSONData()).toHaveProperty("message","Unaouthorized!");
  });

  it('Should return code 404 when user not found', async() => {
    req.params.userId = 1;

    User.findByPk.mockResolvedValue(null);
    
    await UserController.delete(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._getJSONData()).toHaveProperty("message","User not found");
  });

  it('Should handle errors', async() => {
    User.findByPk.mockRejectedValue({ message: "Handle error in update user"});

    await UserController.delete(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('UserController TopUp', () => {
  it('Should return 200', async () => {
    req.body.balance = 5000;
    req.user = USER_DATA.USER_PAYLOAD;

    User.findByPk.mockResolvedValue({
      ...USER_DATA.USER_DATA_WITH_BALANCE,
      save: jest.fn()
    });
    await UserController.topup(req, res, next);
    expect(res.statusCode).toEqual(200);
  });

  it('Should handle errors', async() => {
    User.findByPk.mockRejectedValue({ message: "Handle error when TopUp"});

    await UserController.topup(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});