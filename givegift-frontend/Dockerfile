# --- BUILD STAGE ---
FROM node:22-alpine AS build

WORKDIR /app

# Declare the build‐time arguments
ARG SUPABASE_URL
ARG SUPABASE_PUBLIC_KEY

# Export env variables so Vite can see them
ENV VITE_SUPABASE_URL=$SUPABASE_URL
ENV VITE_SUPABASE_PUBLIC_KEY=$SUPABASE_PUBLIC_KEY

# Copy package files and install
COPY package.json package-lock.json ./
RUN npm ci

# Copy app files
COPY . .

# Build
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:alpine

# Copy custom nginx.conf to handle HTML5 history mode (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
