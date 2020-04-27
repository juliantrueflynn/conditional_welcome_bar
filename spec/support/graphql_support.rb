# frozen_string_literal: true

module GraphqlSupport
  attr_accessor :gql_response

  class GQLResponse
    attr_reader :data, :errors

    def initialize(args)
      @data = args["data"] || nil
      @errors = args["errors"] || nil
    end
  end

  def query(query, context: {})
    json = WelcomeBarAppSchema.execute(
      query,
      context: context
    )

    @gql_response = GQLResponse.new(json)
  end

  alias mutation query
end
