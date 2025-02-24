FROM node:22.13.1

# Add build arguments that can be passed from docker-compose
ARG VITE_BACKEND_HOST
ARG VITE_BACKEND_PORT

# Set as environment variables for the build process
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# Also pass environment variables to the preview command
ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT

CMD ["npm", "run", "preview"]

EXPOSE 4173