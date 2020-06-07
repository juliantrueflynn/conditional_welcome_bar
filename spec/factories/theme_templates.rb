# frozen_string_literal: true

FactoryBot.define do
  factory :theme_template do
    name { Faker::Lorem.unique.word }
    bar
  end
end
