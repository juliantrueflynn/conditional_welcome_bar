FactoryBot.define do
  factory :bar do
    title "FooBar Project"
    content "Lorem ipsum"
    is_sticky true
    placement "top"
    url nil
    is_new_tab_url false
    font_color "#ffffff"
    template_enabled "global"
    has_close_button true
    background_color '#2d3436'
    background_image nil
    background_image_repeat 'no-repeat'
    background_image_size_x nil
    background_image_size_y nil
    background_image_position_x nil
    background_image_position_y nil
    shop
  end

  factory :shop do
    shopify_domain 'jiffywelcomebar'
    shopify_token 'token'

    factory :shop_with_bars do
      transient do
        bars_count { 3 }
      end

      after(:create) do |shop, evaluator|
        create_list(:bar, evaluator.bars_count, shop: shop)
      end
    end
  end
end