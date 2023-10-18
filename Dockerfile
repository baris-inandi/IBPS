FROM rust:1.54
WORKDIR /usr/src/app
RUN cargo install wasm-pack
COPY . .

FROM node:20-alpine3.17 AS builder
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app .
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn wasm
RUN yarn build

FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]