# Stage 1: Build the Angular application
FROM node:24-alpine AS builder

WORKDIR /app

# Install project dependencies (Angular CLI comes from devDependencies).
# npm install rather than npm ci: npm on Windows may drop Linux-only optional
# packages from package-lock.json, which would make npm ci fail here.
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build the project (production is the default configuration)
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/price-peeker-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
