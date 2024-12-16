const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = 7258;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir todos los métodos HTTP
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas (puedes agregar las tuyas aquí)
app.use("/api/user", require("./modules/user/app/in/expressRoutes"));
app.use(
  "/api/friends",
  require("./modules/friend-request/app/in/expressRoutes")
);
app.use(
  "/api/notifications",
  require("./modules/notifications/app/in/expressRouters")
);
app.use(
  "/api/conversation",
  require("./modules/conversation/app/in/expressRoutes")
);
app.use("/api/message", require("./modules/message/app/in/expressRoutes"));

// Servidor HTTP y WebSocket
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Manejo de conexiones de Socket.IO
io.on("connection", (socket) => {
  socket.on("refreshNotifications", (userUid) => {
    socket.broadcast.emit("refreshNotifications2", userUid);
  });
});
// Iniciar servidor
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
