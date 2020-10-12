# yopinoji.com

There's two way to set up.

## Set up with Docker

Make sure you have Docker installed on your PC.

```bash
$ docker -v
Docker version 19.03.13, build 4484c46d9d
$ docker-compose -v
docker-compose version 1.27.4, build 40524192
```

Execute the following commands.

```bash
$ git clone https://github.com/YopiNoji/yopinoji.com.git
$ cd yopinoji.com
$ docker-compose up -d --build
```

Visit http://localhost:8000/.

## Setup with Node.js

Make sure you have Node.js installed on your PC.

```bash
$ node -v
v12.17.0
```

Execute the following commands.

```bash
$ git clone https://github.com/YopiNoji/yopinoji.com.git
$ cd yopinoji.com
$ npm i
$ npm run develop
```

Visit http://localhost:8000/.
