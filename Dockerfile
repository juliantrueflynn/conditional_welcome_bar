FROM ruby:2.5

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /welcome_bar_app
WORKDIR /welcome_bar_app

COPY Gemfile /welcome_bar_app/Gemfile
COPY Gemfile.lock /welcome_bar_app/Gemfile.lock

# Necessary to fix wrong Bundler version
RUN gem update --system && gem install bundler

RUN bundle install
COPY . /welcome_bar_app

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Remove pre-existing server.pid file if it exists.
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3001

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]