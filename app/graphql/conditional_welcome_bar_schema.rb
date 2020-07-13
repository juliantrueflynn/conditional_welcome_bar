# frozen_string_literal: true

class ConditionalWelcomeBarSchema < GraphQL::Schema
  # Add a top-level error to the response instead of returning nil, which is graphql-ruby default.
  def self.unauthorized_object(_error)
    raise GraphQL::ExecutionError, "Not authorized"
  end

  mutation(Types::MutationType)
  query(Types::QueryType)
end
