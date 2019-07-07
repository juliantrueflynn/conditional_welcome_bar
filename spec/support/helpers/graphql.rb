# frozen_string_literal: true

module Helpers
  module Graphql
    attr_accessor :gql_response

    class GQLResponse
      attr_reader :data, :errors

      def initialize(args)
        @data = args['data'] || nil
        @errors = args['errors'] || nil
      end
    end

    def query(query, variables: nil, context: {}, operation_name: nil)
      hash_variables = ensure_hash(variables)
      json = WelcomeBarAppSchema.execute(
        query,
        variables: hash_variables,
        context: context,
        operation_name: operation_name
      )

      @gql_response = GQLResponse.new(json)
    end

    def ensure_hash(ambiguous_param)
      case ambiguous_param
      when Hash, ActionController::Parameters
        ambiguous_param
      when nil
        {}
      else
        raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
      end
    end

    alias mutation query
  end
end
