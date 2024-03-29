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
COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Use echo to create nginx.conf directly
# RUN echo $'server {\n\
#   listen 80;\n\
#   location / {\n\
#   root /usr/share/nginx/html;\n\
#   index index.html;\n\
#   try_files $uri $uri/ /index.html;\n\
#   }\n\
#   }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
