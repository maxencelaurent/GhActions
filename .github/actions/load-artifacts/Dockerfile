FROM node:18

ENV DELAY=
ENV INTERVAL=
ENV TIMEOUT=
ENV WATCH=

ENV MODE=production

WORKDIR /var/lib/wait-on

COPY package.json /var/lib/wait-on
COPY yarn.lock /var/lib/wait-on
COPY ./dist /var/lib/wait-on/dist

RUN yarn install --frozen-lockfile --production


CMD ["node", "dist/main.js"]