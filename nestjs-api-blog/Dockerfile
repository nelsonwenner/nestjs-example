FROM node:10.16-slim
WORKDIR /backend/src/
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "run", "start:dev"]