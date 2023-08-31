// import express from "express";
// import { login } from "../controllers/auth.js";
const express = require("express");
const { login } = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", login);

// export default router;
module.exports = router;
