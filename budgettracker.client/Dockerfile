# 1: build Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --output-path=dist

# 2: Nginx server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
