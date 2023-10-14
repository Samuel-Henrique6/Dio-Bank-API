import express from "express";
import routes from "./routes";



const server = express();

server.use(express.json());
server.use(routes);

const PORTA = process.env.PORT || 5000;

server.listen(PORTA, () => console.log(`Server live : ${PORTA}`));
