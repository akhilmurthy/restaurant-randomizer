# Use an official Node.js image to build the app
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container's working directory
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the built app
FROM nginx:stable-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Copy the build output from the build stage

COPY --from=build /usr/src/app/build /usr/share/nginx/html