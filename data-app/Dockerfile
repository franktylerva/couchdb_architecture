FROM tiangolo/node-frontend as build-stage

ENV PUBLIC_URL http://localhost:8080/app
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/package.json
WORKDIR /app/src
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf