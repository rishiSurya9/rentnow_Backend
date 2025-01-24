import express from "express";
import { createListing } from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", createListing);

export default router;