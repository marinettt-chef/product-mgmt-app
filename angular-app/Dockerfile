FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Angular source files
COPY . .

# Build the Angular app
RUN npm run build

# Use nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/angular-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
