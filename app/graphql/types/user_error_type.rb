# frozen_string_literal: true

module Types
  class UserErrorType < Types::BaseObject
    description "Human-readable errors for attributes on models"

    field :field, [String], null: true, description: "Which input value this error came from"
    field :message, String, null: false, description: "A description of the error"
  end
end
