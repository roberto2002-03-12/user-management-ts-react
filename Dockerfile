FROM node:18-alpine

WORKDIR /app

ARG VITE_USERMANAGEMENT_API

#copy everything
COPY . .
#then delete these files
RUN rm -rf .env node_modules dist

ENV VITE_USERMANAGEMENT_API=$VITE_USERMANAGEMENT_API

RUN npm install

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]