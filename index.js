const express = require("express");
const app = express();
const port = 8080;
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  secure: true,
  rejectUnauthorized: false,
  path: "/alert-server"
});

app.use(express.json());
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/healthcheck", function(req, res) {
  res.status(200).json({ status: "active" });
});

app.post("/trigger-alarm", function(req, res) {
  console.log(
    `Date:: ${new Date()}\nStore:: ${
      req.body.store_name
    }\nMessage:: Requesting Assistance\n`
  );
  io.emit("store-alert", { store_name: req.body.store_name });
  res.status(200).json({ alerted: true });
});

io.on("connection", socket => {
  console.log("Client connected");
});
