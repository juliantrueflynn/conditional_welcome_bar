FactoryBot.define do
  factory :shop do
    shopify_domain 'jiffywelcomebar'
    shopify_token 'token'
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