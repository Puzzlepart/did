FROM node:12.18.3
ENV NODE_ENV=production
ENV PORT=9001

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

RUN npm install --no-progress --loglevel silent --no-shrinkwrap --no-fund

RUN npm run-script build:server

RUN npm run-script package:client

EXPOSE 9001
CMD [ "node", "server-dist" ]