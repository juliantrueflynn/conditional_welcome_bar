# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :active_bars, [Types::BarType], null: true do
      argument :shopify_domain, String, required: true
    end
    def active_bars(shopify_domain:)
      shop = Shop.find_by_shopify_domain(shopify_domain)
      return [] unless shop

      shop.bars.with_active
    end

    field :bars, [Types::BarType], null: true
    def bars
      shop = context[:current_shop]
      return [] unless shop

      shop.bars
    end

    field :bar, Types::BarType, null: true do
      argument :id, ID, required: true
    end
    def bar(id:)
      shop = context[:current_shop]
      return unless shop

      shop.bars.find_by(id: id)
    end
  end
end
