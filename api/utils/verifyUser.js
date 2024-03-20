import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  // Authorization başlığından token'ı al
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer şemasını kullanarak token'ı al ('Bearer TOKEN')
    const token = authHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // JWT doğrulama hatası
        return res.status(401).send({ message: "Unauthorized" });
      }
      // Kullanıcı bilgisini request nesnesine ekleyerek sonraki middleware'e geç
      req.user = user;
      next();
    });
  } else {
    // Authorization başlığı mevcut değil
    return res.status(401).send({ message: "Unauthorized" });
  }
};
