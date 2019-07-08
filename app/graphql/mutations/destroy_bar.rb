# frozen_string_literal: true

module Mutations
  class DestroyBar < GraphQL::Schema::RelayClassicMutation
    field :bar, Types::BarType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      shop = ensure_current_shop
      bar = shop&.bars.find_by(id: id)

      if shop && bar&.destroy
        { bar: bar }
      else
        { bar: nil }
      end
    end
  end
end
