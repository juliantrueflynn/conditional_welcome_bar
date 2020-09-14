FROM ruby:2.7.1-alpine as base

ENV BUNDLER_VERSION=2.1.4

RUN apk add --no-cache \
    build-base \
    file \
    nodejs \
    postgresql-dev \
    tzdata \
    yarn \
    libnotify-dev

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

COPY Gemfile* /app/
RUN bundle config --local frozen 1 && \
    bundle install --retry 3

COPY . /app

FROM base as build

ENV RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true \
    EXECJS_RUNTIME=Disabled

RUN apk del nodejs yarn \
 && rm -rf app/assets node_modules tmp/cache vendor/bundle spec

WORKDIR /app

RUN RAILS_ENV=production \
    SECRET_KEY_BASE=dummy \
    RAILS_MASTER_KEY=dummy \
    bundle exec rails assets:precompile \
 && rm -rf "$(yarn cache dir)"

RUN bundle clean --force \
 && rm -rf /usr/local/bundle/cache/*.gem \
 && find /usr/local/bundle/gems/ -name "*.c" -delete \
 && find /usr/local/bundle/gems/ -name "*.o" -delete

COPY --from=base /usr/local/bundle/ /usr/local/bundle/
COPY --from=base . .

EXPOSE 3000

CMD ["rails", "server", "-p", "3000", "-b", "0.0.0.0"]
