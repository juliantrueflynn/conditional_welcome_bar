FactoryBot.define do
  factory :bar do
    title { "FooBar Project" }
    content { "Lorem ipsum" }
    is_active { false }
    is_sticky { true }
    placement { "top" }
    url { nil }
    is_new_tab_url { false }
    page_template { "global" }
    has_close_button { true }
    padding_y { '10px' }
    padding_x { '15px' }
    text_align { 'center' }
    text_opacity { 1 }
    font_color { '#ffffff' }
    font_size { 'inherit' }
    font_family { 'inherit' }
    background_color { '#2d3436' }
    background_opacity { 1 }
    background_image { nil }
    background_image_repeat { 'no-repeat' }
    background_image_size_x { nil }
    background_image_size_y { nil }
    background_image_position_x { nil }
    background_image_position_y { nil }
    shop
  end

  factory :shop do
    shopify_domain { "#{Faker::Internet.unique.domain_word}.myshopify.com" }
    shopify_token { SecureRandom.hex(10) }

    factory :shop_with_bars do
      transient do
        bars_count { 3 }
      end

      after(:create) do |shop, evaluator|
        create_list(:bar, evaluator.bars_count, shop: shop)
      end
    end

    factory :shop_bars_mixed_templates do
      transient do
        bars_count { 3 }
      end

      after(:create) do |shop, evaluator|
        create_list(:bar, evaluator.bars_count, shop: shop)
      end
    end
  end
end