FROM repo.backbase.com/backbase-docker-releases/web-base:1.1.2

COPY ./nginx-config/custom-csp.conf /nginx-config/server/index/20-csp.conf

COPY ./dist/apps/retail-usa /statics
