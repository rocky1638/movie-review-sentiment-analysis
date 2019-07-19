FROM node:alpine as builder
WORKDIR /usr/app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html
