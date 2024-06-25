import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { createDb } from "./data/dbCreation.js";
import { router } from "./routers/index.js";
config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization, Content-Disposition, Content-Length, Accept-Encoding, X-CSRF-Token, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, X-Permitted-Cross-Domain-Policies, Referrer-Policy, Strict-Transport-Security, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alt-Svc, Connection, Date, ETag, Expect, Expires, Host, Keep-Alive, Last-Modified, Location, Proxy-Authenticate, Proxy-Authorization, Public-Key-Pins, Retry-After, Server, Set-Cookie, Transfer-Encoding, Upgrade, Vary, Via, Warning, WWW-Authenticate, X-Forwarded-For, X-Forwarded-Proto, X-Powered-By, Content-Security-Policy",
        ],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});

app.use("/api", router);

app.listen(port, () => {
    createDb();
    console.log(`Server is running on port ${port}`);
})
