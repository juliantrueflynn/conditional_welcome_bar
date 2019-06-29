FROM ruby:2.5

RUN apt-get update -qq

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get install -y --no-install-recommends nodejs postgresql-client \
    && apt-get update -qq \
    && apt-get install -y --no-install-recommends yarn \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /user/src/app
COPY Gemfile* /user/src/app/
RUN gem update --system && gem install bundler && bundle install --quiet
COPY . /user/src/app

# RUN RAILS_ENV=production bundle exec rake assets:precompile

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3001

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]
