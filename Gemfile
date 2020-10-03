# frozen_string_literal: true

ruby "2.7.1"
source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "rails", "~> 6.0.3", ">= 6.0.3.3"

gem "babel-transpiler"
gem "bootsnap", require: false
gem "dotenv-rails", require: "dotenv/rails-now"
gem "graphql"
gem "lograge"
gem "pg"
gem "puma"
gem "rack-cors", require: "rack/cors"
gem "shopify_app"
gem "uglifier"
gem "valid_url"
gem "webpacker"

group :development, :test do
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "factory_bot_rails"
  gem "rspec-rails"
  gem "shoulda-matchers"
end

group :development do
  gem "graphiql-rails"
  gem "listen", "~> 3.2"
  gem "pry-rails"
  gem "rubocop", "~> 0.83.0", require: false
  gem "rubocop-rails", require: false
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem "capybara"
  gem "faker"
  gem "selenium-webdriver"
  gem "simplecov", require: false
  gem "webmock"
end
