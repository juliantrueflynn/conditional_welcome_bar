# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :bars, [Types::BarType], null: true
    field :bar, Types::BarType, null: true do
      argument :id, ID, required: true
    end

    def bars
      ::Bar.where(shop_id: context[:current_shop]).order(:updated_at)
    end

    def bar(id:)
      ::Bar.find_by(id: id, shop: context[:current_shop])
    end
  end
end
