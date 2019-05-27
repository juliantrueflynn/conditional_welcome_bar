FROM node:8.16.0 AS node_base

FROM node_base as deps
WORKDIR /usr/src/app
COPY /ui/package.json /ui/yarn.lock /usr/src/app/
COPY /ui/src /usr/src/app/src
COPY /ui/public /usr/src/app/public
RUN yarn install --prod --silent

FROM node_base as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY --from=deps /usr/src/app /usr/src/app
RUN yarn run build

FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y postgresql-client --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV RAILS_ENV production
ENV RACK_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

WORKDIR /usr/src/app
COPY Gemfile* /usr/src/app/
RUN gem update --system && gem install bundler && bundle install --without development test --quiet
COPY . /usr/src/app
COPY --from=builder /usr/src/app/build /usr/src/app/public

RUN bundle exec rake assets:precompile

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
