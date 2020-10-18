# frozen_string_literal: true

class GraphqlErrorHelper
  EXTENSION_CODE_RECORD_NOT_FOUND = "RECORD_NOT_FOUND"
  EXTENSION_CODE_UNAUTHENTICATED = "UNAUTHENTICATED"

  def self.unauthenticated(message)
    GraphQL::ExecutionError.new(
      message,
      extensions: { code: EXTENSION_CODE_UNAUTHENTICATED }
    )
  end

  def self.record_not_found(message)
    GraphQL::ExecutionError.new(
      message,
      extensions: { code: EXTENSION_CODE_RECORD_NOT_FOUND }
    )
  end
end
