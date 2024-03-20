import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (authHeader) {
   
    const token = authHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
  
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
