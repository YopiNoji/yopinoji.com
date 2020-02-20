FROM node:alpine
EXPOSE 8000

RUN \
  apk add git && \
  apk add --no-cache python make g++ && \
  apk add vips-dev fftw-dev --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community --repository http://dl-3.alpinelinux.org/alpine/edge/main && \
  rm -fR /var/cache/apk/*

RUN git config --global user.email "yopinoji@yahoo.co.jp"

WORKDIR /app
COPY ./package.json .
RUN npm install && npm cache clean --force
RUN npm run clean
COPY . .
# CMD ["npm", "run", "develop", "--", "--host", "0.0.0.0" ]