# frozen_string_literal: true

module Mutations
  class CreateBar < GraphQL::Schema::RelayClassicMutation
    include AuthorizedShopGuardable

    field :bar, Types::BarType, null: true
    field :user_errors, [Types::UserErrorType], null: false

    def resolve
      shop = context[:current_shop]
      bar = BarCreatorService.call(shop)

      if bar.valid?
        {
          bar: bar,
          user_errors: []
        }
      else
        {
          bar: nil,
          user_errors: ::BarUserErrorsMapper.call(bar)
        }
      end
    end
  end
end
