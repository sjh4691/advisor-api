FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]