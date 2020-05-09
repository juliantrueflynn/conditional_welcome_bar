# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :active_bars, [Types::BarType], null: true do
      argument :shopify_domain, String, required: true
    end
    def active_bars(shopify_domain:)
      ::Bar.with_active.with_shopify_domain(shopify_domain)
    end

    field :bars, [Types::BarType], null: true
    def bars
      ::Bar.where(shop_id: context[:current_shop])
    end

    field :bar, Types::BarType, null: true do
      argument :id, ID, required: true
    end
    def bar(id:)
      ::Bar.find_by(id: id, shop: context[:current_shop])
    end
  end
end
