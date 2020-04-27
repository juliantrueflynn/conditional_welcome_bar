FROM ruby:2.6.5

ENV APP_PATH=/usr/src/app
ENV BUNDLER_VERSION=2.0.2

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash \
 && apt-get update -qq \
 && apt-get install -y nodejs \
 && rm -rf /var/lib/apt/lists/* \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update -qq \
 && apt-get install -y yarn \
 && rm -rf /var/lib/apt/lists/*

WORKDIR $APP_PATH
COPY Gemfile* ${APP_PATH}/
RUN gem install bundler -v "$BUNDLER_VERSION" \
 && bundle install --without test development
COPY . $APP_PATH

RUN RAILS_ENV=production bundle exec rake assets:precompile

EXPOSE 3000

CMD ["rails", "server", "-p", "3000", "-b", "0.0.0.0"]
