# Alpacode FAST — the static site at fast.alpacode.it (fast/).
# Built from the repo root, it shares the lockfile:
#   docker compose --profile fast up -d --build

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# Canonical URLs and the sitemap follow the domain it's served on;
# Umami (cookieless) ships only when both values are set.
ARG FAST_SITE="https://fast.alpacode.it"
ARG PUBLIC_UMAMI_SRC=""
ARG PUBLIC_UMAMI_FAST_ID=""
ENV FAST_SITE=$FAST_SITE \
    PUBLIC_UMAMI_SRC=$PUBLIC_UMAMI_SRC \
    PUBLIC_UMAMI_FAST_ID=$PUBLIC_UMAMI_FAST_ID
COPY . .
RUN npm run fast:build

# ---------- runtime: files, served by Caddy ----------
FROM caddy:2-alpine
COPY fast/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/fast/dist /srv
EXPOSE 80
