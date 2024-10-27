const cookieParser = require("cookie-parser");
const { session } = require("../middlewares/session");
const express = require("express");

const secret = "Sup3r_Secr3t_Slaycross";

function configExpress(app) {
  app.use(cookieParser(secret));

  app.use(session());
  app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };
