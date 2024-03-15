import express from "express";
const router = express.Router();

router.route("/signup").get((req, res) => {
  res.json({
    data: "Sign Up Route Endpoint",
  });
});

export default router;
