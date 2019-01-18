FactoryBot.define do
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

  factory :bar do
    title "FooBar Project"
    content "Lorem ipsum"
    position "fixed"
    location "top"
    url nil
    is_new_tab_url false
    text_color "#ffffff"
    bg_color "#2d3436"
    template_enabled "global"
    has_close_button true
    shop
  end
end