FROM node:18-alpine

WORKDIR /app

#copy everything
COPY . .
#then delete these files
RUN rm -rf .env node_modules dist

RUN npm install

RUN npm build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]