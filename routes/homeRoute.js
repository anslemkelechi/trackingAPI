const express = require("express");
const Router = express.Router();
const adminController = require("./../controllers/adminController");

Router.get("/", (req, res) => res.render("home"));
Router.get("/about", (req, res) => res.render("about"));
Router.get("/services", (req, res) => res.render("services"));
Router.get("/track", (req, res) => res.render("track"));
Router.get("/contact", (req, res) => res.render("contact"));

module.exports = Router;
