FROM oven/bun:1 AS base

WORKDIR /work
COPY . /work
RUN bun install
RUN bun run build

FROM nginx:1.30.0
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base /work/dist /www
