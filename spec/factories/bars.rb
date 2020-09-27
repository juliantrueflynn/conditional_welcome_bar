# frozen_string_literal: true

FactoryBot.define do
  factory :bar do
    title { Faker::Company.name }
    content { Faker::Lorem.sentence }
    active { false }
    sticky { Faker::Boolean.boolean }
    placement { Bar::PLACEMENT.sample }
    url { [Faker::Internet.url, nil].sample }
    new_tab_url { Faker::Boolean.boolean }
    close_button { Faker::Boolean.boolean }
    padding_y { ["#{Faker::Number.within(range: 0..20)}px", nil].sample }
    padding_x { ["#{Faker::Number.within(range: 0..20)}px", nil].sample }
    text_align { [Bar::ALIGN.sample, nil].sample }
    text_color { ["rgba(255,255,255,1.0)", nil].sample }
    font_size { ["inherit", nil].sample }
    background_color { ["rgba(45,52,54,1.0)", nil].sample }
    shop

    trait :active do
      active { true }
    end
  end
end
