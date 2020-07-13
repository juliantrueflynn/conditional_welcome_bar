# frozen_string_literal: true

module Mutations
  class CreateBar < GraphQL::Schema::RelayClassicMutation
    include AuthorizedShopGuardable

    field :bar, Types::BarType, null: true

    def resolve
      bar = BarCreatorService.call(context[:current_shop])

      raise GraphQL::ExecutionError, "There was an issue creating your welcome bar" if bar.invalid?

      { bar: bar }
    end
  end
end
