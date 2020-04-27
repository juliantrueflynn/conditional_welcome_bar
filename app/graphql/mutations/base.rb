# frozen_string_literal: true

module Mutations
  class Base < GraphQL::Schema::RelayClassicMutation
    def ensure_current_shop
      current_shop = context[:current_shop]
      raise GraphQL::ExecutionError, "Not authorized" unless current_shop

      current_shop
    end
  end
end
