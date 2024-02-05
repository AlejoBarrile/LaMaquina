import express from "express";
import { ManagerDeck } from "../public/helpers/ManagerDeck.mjs";



const router = express.Router();
const MD = new ManagerDeck();

router.get("/", (req, res) => {


});


export default router;