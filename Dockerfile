FROM node:8.16.0 AS node_base

FROM node_base as deps
ARG APP_PATH
ARG YARN_PROD
WORKDIR $APP_PATH
COPY /ui/package.json /ui/yarn.lock ${APP_PATH}/
COPY /ui/src ${APP_PATH}/src
COPY /ui/public ${APP_PATH}/public
RUN yarn install --production=${YARN_PROD} --silent

FROM node_base as builder
ARG APP_PATH
WORKDIR $APP_PATH
COPY . $APP_PATH
COPY --from=deps $APP_PATH $APP_PATH
RUN yarn run build

FROM ruby:2.5
RUN apt-get update -qq \
  && apt-get install -y postgresql-client --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

ARG APP_PATH
ARG BUNDLE_WITHOUT
ARG RAILS_SERVE_STATIC_FILES
ARG RAILS_ENV
ENV RAILS_SERVE_STATIC_FILES=${RAILS_SERVE_STATIC_FILES} \
  RAILS_ENV=${RAILS_ENV} \
  RACK_ENV=${RAILS_ENV}

WORKDIR $APP_PATH
COPY Gemfile* ${APP_PATH}/
RUN gem update --system && gem install bundler && bundle install --quiet --without ${BUNDLE_WITHOUT}
COPY . $APP_PATH
COPY --from=builder ${APP_PATH}/build ${APP_PATH}/public

RUN bundle exec rake assets:precompile

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
