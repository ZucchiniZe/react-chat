# react-chat

A simple chat application made using websockets.

## Docs & Method explanations

### Actions
- `addMessage`: should only be triggered when a message is received
- `newMessage`: should only be triggered when you send a message and should not render into the application, the `addMessage` action should do that using a `socket.on` listener.
- `clientJoin`: should trigger once you enter your name and establish a connection with the websocket
- `personJoin`: should trigger when another person joins the channel
- `personLeave`: should trigger when another person leaves the channel
