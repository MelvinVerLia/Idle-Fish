# Step 1: Build React app using Node.js (Vite)
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . . 
RUN npm run build

# Debugging: List the contents of the /app directory to ensure 'dist' is created
RUN echo "Contents of /app:" && ls -la /app

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app from the build stage into the Nginx server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
