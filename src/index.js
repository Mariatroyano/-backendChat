const express = require("express");
const cors = require("cors");
const app = express();
const port = 7258;
const bodyParser = require("body-parser");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const userRouter = require("./modules/user/app/in/expressRoutes");

app.use(
  cors({
    origin: "*", // Permitir todos los orígenes
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Permitir todos los métodos HTTP
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("conectado");
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
