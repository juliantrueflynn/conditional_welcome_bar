# frozen_string_literal: true

FactoryBot.define do
  factory :bar do
    title { Faker::Company.name }
    content { Faker::Lorem.sentence }
    is_active { false }
    is_sticky { true }
    placement { "top" }
    url { "" }
    is_new_tab_url { false }
    page_templates { %w[global] }
    has_close_button { true }
    padding_y { "10px" }
    padding_x { "15px" }
    text_align { "center" }
    text_color { "rgba(255,255,255,1)" }
    font_size { "inherit" }
    background_color { "rgba(45,52,54,1.0)" }
    background_image { nil }
    background_image_repeat { "no-repeat" }
    background_image_size_x { nil }
    background_image_size_y { nil }
    background_image_position_x { nil }
    background_image_position_y { nil }
    shop
  end
end
