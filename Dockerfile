FROM node:8.10.0 AS node_base

FROM node_base as deps
WORKDIR /welcome_bar_app/ui
COPY ui/package.json /welcome_bar_app/ui/package.json
COPY ui/yarn.lock /welcome_bar_app/ui/yarn.lock
RUN yarn --cwd ui install
COPY . /welcome_bar_app
RUN yarn --cwd ui build

FROM ruby:2.5 AS server
RUN apt-get update -qq && apt-get install -y postgresql-client

WORKDIR /welcome_bar_app

COPY Gemfile /welcome_bar_app/Gemfile
COPY Gemfile.lock /welcome_bar_app/Gemfile.lock

# Necessary to fix wrong Bundler version
RUN gem update --system && gem install bundler

RUN bundle install

COPY . /welcome_bar_app
COPY --from=deps /welcome_bar_app/ui/build /welcome_bar_app/public

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Remove pre-existing server.pid file if it exists.
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]