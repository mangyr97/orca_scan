FROM node:16.20.0-alpine3.17

RUN apk update && apk add --no-cache libtool autoconf automake linux-headers gcc g++ cmake python3 git make

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN node -v
RUN npm ci

COPY src /app/src

RUN npm run build

RUN rm -rf /app/src
ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD node dist/index.js