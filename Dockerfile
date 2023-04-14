FROM node:16.20.0-alpine3.17

RUN apk add --no-cache make python3 git

WORKDIR /app

# Sources
COPY src /app/src

# Install
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Config
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.build.json /app/tsconfig.build.json

# Build
RUN npm ci --only=production --ignore-scripts
RUN npm run build

# Clean
RUN rm -rf /app/package-lock.json
#RUN rm -rf /app/tsconfig.json
#RUN rm -rf /app/tsconfig.build.json
#RUN rm -rf /app/src
ENV NODE_OPTIONS="--max-old-space-size=4096"
EXPOSE 3000

CMD npm run start:prod
