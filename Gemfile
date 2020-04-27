# frozen_string_literal: true

ruby "2.6.5"
source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.1.5"

gem "pg"
gem "puma"
gem "carrierwave", "~> 1.0"
gem "dotenv-rails"
gem "graphql"
gem "mini_magick"
gem "omniauth-rails_csrf_protection"
gem "rack-cors", require: "rack/cors"
gem "shopify_app"
gem "uglifier"
gem "valid_url"

group :development, :test do
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "factory_bot_rails"
  gem "rspec-rails"
  gem "shoulda-matchers"
end

group :development do
  gem "annotate"
  gem "binding_of_caller"
  gem "graphiql-rails"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "pry-rails"
  gem "rubocop", "~> 0.72.0", require: false
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem "database_cleaner"
  gem "faker"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
