const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../../helpers/helper")
const USER_DATA = require("../data/users.data");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUyOTM5OTgyfQ.Nc3U6CufqIPVSkGztdyA_dQZHxTgJRzJYHpCqlmyfcM"

describe('Hash', () => {
  it('bcrypt.hashSync should return string', () => {
    bcrypt.hashSync = jest.fn().mockImplementation(() => TOKEN);
    bcrypt.genSaltSync = jest.fn().mockImplementation(() => "this salt");

    const encrypted = helpers.hash(USER_DATA.USER_PAYLOAD);
    expect(encrypted).toEqual(TOKEN);
    expect(bcrypt.genSaltSync).toHaveBeenCalled();
    expect(bcrypt.hashSync).toHaveBeenCalledWith(USER_DATA.USER_PAYLOAD, "this salt");
  });
});

describe('Compare', () => {
  it('Should return boolean', () => {
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);

    const isTrue = helpers.compare(USER_DATA.USER_PAYLOAD, TOKEN);

    expect(isTrue).toEqual(true);
    expect(bcrypt.compareSync).toHaveBeenCalled();
  });
});