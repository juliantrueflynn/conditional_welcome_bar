FROM ruby:2.5

ARG APP_PATH=/app/usr/src

RUN apt-get update -qq \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get install -y nodejs \
    && apt-get update \
    && apt-get install -y yarn

WORKDIR $APP_PATH
COPY Gemfile* ${APP_PATH}/
RUN gem update --system \
    && gem install bundler \
    && bundle install --quiet
COPY . $APP_PATH

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
