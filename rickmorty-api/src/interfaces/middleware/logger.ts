import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  console.log("🛰️ Incoming request:", {
    method: req.method,
    url: req.url,
    time: new Date().toISOString()
  });

  res.on("finish", () => {
    const end = Date.now();
    console.log("🏁 Request finished:", {
      status: res.statusCode,
      duration: `${end - start}ms`
    });
  });

  next();
};
