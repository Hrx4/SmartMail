#node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

#Copy Files
COPY . .

#Install dependencies
RUN npm install

#Expose port
EXPOSE 5000

#Start the app  
CMD ["npm", "start"]
