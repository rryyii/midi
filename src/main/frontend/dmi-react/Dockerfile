FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5174

CMD ["run", "dev"]

ENTRYPOINT ["npm"]




