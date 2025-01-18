FROM node:20 AS build


WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
COPY . .
RUN npm run build

FROM nginx AS final

WORKDIR /usr/share/nginx/html

COPY --from=build /build/dist .
