# frozen_string_literal: true

class WelcomeBarAppSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
