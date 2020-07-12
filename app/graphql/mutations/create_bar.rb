# frozen_string_literal: true

module Mutations
  class CreateBar < Mutations::Base
    field :bar, Types::BarType, null: true
    field :errors, Types::BarErrorType, null: true

    def resolve
      shop = ensure_current_shop
      bar = BarCreatorService.call(shop)

      if bar.valid?
        { bar: bar, errors: nil }
      else
        { bar: nil, errors: bar.errors.messages }
      end
    end
  end
end
