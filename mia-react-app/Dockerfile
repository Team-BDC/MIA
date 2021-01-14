FROM node:latest

# RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ADD package.json /app/package.json
# ADD package.json /app/package.json

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean \
    && apt-get upgrade \
    && apt-get update \
    && apt-get install

# RUN npm install --no-cache
# RUN npm install -g react-scripts

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g react-router-dom
RUN npm install

# ADD . /app/
CMD ["npm", "start"]