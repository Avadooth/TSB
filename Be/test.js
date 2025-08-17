// const express = require("express");
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(5000, "0.0.0.0", () => {
    console.log("✅ Test server running on http://localhost:5000");
});