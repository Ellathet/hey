FROM node:16-alpine AS build

WORKDIR /hey
ADD . /hey/

RUN yarn install
RUN yarn build

RUN cp -r package.json dist/
RUN cp yarn.lock dist/
RUN cp -r prisma dist/

RUN ls -a

FROM node:16-alpine

WORKDIR /hey
COPY --from=build /hey/dist .
RUN yarn install --only=prod

ENV APP_TOKEN PUT_YOUR_TOKEN
ENV DATABASE_URL postgresql://root:root@hey-db:5432/hey-db?schema=public

RUN ls -a

# RUN yarn db:update

RUN yarn global add pm2

EXPOSE 3025

CMD [ "pm2-runtime", "server.js" ]


