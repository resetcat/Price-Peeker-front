# Stage 1: Build the Angular application
FROM node:17-alpine3.14 as builder

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli@15.0.3

# Install project dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build the project
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/price-peeker-front /usr/share/nginx/html

EXPOSE 80
CMD ["ng","serve","--host","0.0.0.0"]

