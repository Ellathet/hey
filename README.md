<div align="center">
<img height="154" width="333" src="https://user-images.githubusercontent.com/76699403/197346176-7a86089d-facf-418c-ad0d-fd893171c129.png"/>
</div>

<p align="center">A simple application to send notification using <a href="https://socket.io/" target="_blank">socket.io</a> and <a href="https://nodejs.org/en/" target="_blank">node.js</a></p>

## Description
  I always think about how things are behind it, so based on the [firebase](https://firebase.google.com/) message service, I decided to create my own, first which technology to use?
  - Socket is my first choice
  - Node.js, simple and powerfull solution
  
  So I started creating it, and this is the result
 
## How to start
  - You can use docker, to start the application inside a container, just run: `docker-compose up --build -d` in main path.
 
To start in dev environment, you need use: node >= 16, yarn >= 1.22, this app using nodemon to hot update feature. 
  - Configure your .env file:
  `APP_TOKEN` is your password, it is necessary to authenticate the application when you send the notification, or recive. And `DATABASE_URL`, for default is it is consistent with docker-compose

After config you need run migrations from prisma, run: `yarn db:update`, after run `yarn start:dev` and be happy codding 🤯.

## Socket
  To test socket I'm use [firecamp](https://firecamp.io/), connected to port 3025, and listen `notification`:
  
  ![image](https://user-images.githubusercontent.com/76699403/197348443-e051720d-e16b-43c2-ba57-a70e10e2d982.png)

To auth, in Connections tab, send your token set in .env:
![image](https://user-images.githubusercontent.com/76699403/197348484-101ded28-6f2a-42ab-b129-2e27013d6b0a.png)

When you send post in path `api/notification`, the app emit the notification to all socket connections avaible.
