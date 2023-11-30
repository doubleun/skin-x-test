# Stage 1
# Use the official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install -P

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN pnpm build

# Stage 2
# Use Nginx as the production server
FROM nginx:alpine as runner

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]