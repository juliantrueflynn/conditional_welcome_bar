# frozen_string_literal: true

module Mutations
  class DestroyBar < GraphQL::Schema::RelayClassicMutation
    include AuthorizedShopGuardable

    field :bar, Types::BarType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      bar = context[:current_shop].bars.find_by(id: id)

      raise GraphqlErrorHelper.record_not_found("Welcome bar does not exist") if bar.blank?

      { bar: bar.destroy }
    end
  end
end
