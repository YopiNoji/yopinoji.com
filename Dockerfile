FROM node:14
EXPOSE 8000
WORKDIR /usr/src
COPY . ./
RUN npm install
