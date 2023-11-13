const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (msg, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  msgElement.classList.add("message");
  msgElement.classList.add(position);

  messageContainer.append(msgElement);
};

const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

socket.on("user-joined", (data) => {
  append(`${data} joined the chat`, "join-leave-message");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("leave", (data) => {
  append(`${data} has left the chat`, "join-leave-message");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;

  append(`You: ${message}`, "right");

  socket.emit("send", message);

  messageInput.value = "";
});
