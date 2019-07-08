# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
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
