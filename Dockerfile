FROM node:20.10-alpine as builder

ENV NODE_ENV build

USER node

WORKDIR /home/node

COPY  --chown=node:node package*.json ./

RUN yarn && yarn add bcrypt

COPY --chown=node:node . .
RUN yarn build

FROM node:20.10-alpine

# RUN apk add --no-cache tzdata bash openjdk11

ENV NODE_ENV production

USER node
WORKDIR /home/node
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/



CMD ["node","dist/main.js"]