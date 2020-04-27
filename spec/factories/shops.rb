# frozen_string_literal: true

FactoryBot.define do
  factory :shop do
    shopify_domain { "#{Faker::Internet.unique.domain_word}.myshopify.com" }
    shopify_token { SecureRandom.hex(10) }

    factory :shop_with_bars do
      transient do
        bars_count { 3 }
        is_active { false }
      end

      after(:create) do |shop, evaluator|
        create_list(
          :bar,
          evaluator.bars_count,
          is_active: evaluator.is_active,
          shop: shop
        )
      end
    end
  end
end
