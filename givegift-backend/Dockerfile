FROM node:22-alpine

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first, so Docker can cache npm install
COPY package.json package-lock.json ./

# Install project dependencies (ignore development dependencies, ex. nodemon)
RUN npm install --production

# Copy app files
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
