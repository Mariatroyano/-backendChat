const express = require("express");
const app = express();
const cors = require("cors");
const port = require("./infraestructure/config/config").port;
const userRouter = require('./modules/user/app/in/userRoutes')
app.use(
  cors({
    origin: "http://localhost:5713",
    credentials: true,
  })
);
app.get("/", (_, res) => {
  res.send(`<div>
      <h1>Hello World</h1>
      <p>This is a simple server</p>
      <table>
      las tablas son las tablas 
      <tr>
        <td>user</td>
        <td>conversation</td>
        <td>message</td>
        <td>FriendRequest</td>
      </tr>     
      <tr>
        <td>uid</td>
        <td>uid</td>
        <td>uid</td>
        <td>uid</td>
      </tr> 
      </table>
    </div>`);
});
app.use('/user', userRouter)
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
