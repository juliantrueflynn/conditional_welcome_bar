module Helpers
  module Graphql
    attr_accessor :gql_response

    # The returned results of a GraphQL query
    # @return [data] this is the bulk of the return to test.
    # @return [error] any time a query, mutation, subscription throws and error
    class GQLResponse
      attr_reader :data, :errors

      def initialize(args)
        @data = args['data'] || nil
        @errors = args['errors'] || nil
      end
    end

    # basic query to interact with the GraphQL API.
    # @param [query] required The query string that would be passed to the schema.
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
      when String
        if ambiguous_param.present?
          ensure_hash(JSON.parse(ambiguous_param))
        else
          {}
        end
      when Hash, ActionController::Parameters
        ambiguous_param
      when nil
        {}
      else
        raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
      end
    end

    alias_method :mutation, :query
  end
end
