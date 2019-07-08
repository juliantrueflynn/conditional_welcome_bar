# frozen_string_literal: true

module Mutations
  class CreateBar < GraphQL::Schema::RelayClassicMutation
    field :bar, Types::BarType, null: true

    def resolve
      shop = ensure_current_shop

      if shop
        bar = shop.bars.build

        return { bar: bar } if bar.save
      end

      { bar: nil }
    end
  end
end
