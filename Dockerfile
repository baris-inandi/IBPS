# Stage 1: Build the Rust code
FROM rust:1-bullseye AS rust-builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ibpscomp-rs .
RUN cargo install wasm-pack
RUN wasm-pack build --release

# Stage 2: Build the Node.js code
FROM node:20-alpine3.17 AS node-builder
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
COPY --from=rust-builder /usr/src/app/ ./ibpscomp-rs
RUN yarn install --production --ignore-engines
RUN yarn build

# Stage 3: Set up the production environment
FROM nginx:1.21.0-alpine AS production
COPY --from=node-builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080/udp
CMD ["nginx", "-g", "daemon off;"]
