FROM node:alpine
WORKDIR '/APP'

COPY package.json .
RUN npm install
COPY . .

# RUN npm run build

# EXPOSE 3000

CMD [ "npm", "start" ]