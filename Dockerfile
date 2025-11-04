
#Frontend Dockerfile

# Stage 1: Build Angular App
FROM node:18-alpine AS builder 

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli && \
    ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html


EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
