# frozen_string_literal: true

module Mutations
  class CreateBar < GraphQL::Schema::RelayClassicMutation
    field :bar, Types::BarType, null: true

    argument :shop_origin, String, required: true

    def resolve(shop_origin:)
      shop = Shop.find_by_shopify_domain(shop_origin)

      if shop
        bar = shop.bars.build

        return { bar: bar } if bar.save
      end

      { bar: nil }
    end
  end
end
