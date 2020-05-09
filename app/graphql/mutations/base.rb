# frozen_string_literal: true

module Mutations
  class Base < GraphQL::Schema::RelayClassicMutation
    def ensure_current_shop
      raise GraphQL::ExecutionError, "Not authorized" if context[:current_shop].blank?

      context[:current_shop]
    end
  end
end
