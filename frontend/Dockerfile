FROM node:latest
MAINTAINER flexperto <info@flexperto.com>

LABEL \
    Description="Docker image for hosting the frontend service" \
    Vendor="Flexperto GmbH" \
    Copyright="Copyright © 2017 Flexperto GmbH" \
    Version="1.0.0"

# Install webpack
RUN npm install webpack -g
# cd to tmp
WORKDIR /tmp
# copy over the package.json
COPY package.json /tmp/
# set the npm registry and install packages
RUN npm config set registry http://registry.npmjs.org/ && npm install
# change to the app dir
WORKDIR /usr/src/app
# copy over sources
COPY . /usr/src/app/
# copy the node modules in place
RUN cp -a /tmp/node_modules /usr/src/app/
# run webpack
RUN webpack
# expose the port
EXPOSE 4000
# start
ENTRYPOINT [ "npm", "run", "start" ]
