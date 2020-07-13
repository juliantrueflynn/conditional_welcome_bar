# frozen_string_literal: true

class BarUserErrorsMapper
  def self.call(bar)
    new(bar).call
  end

  def initialize(bar)
    @bar = bar
  end

  def call
    return [] if @bar.blank? || @bar.valid?

    @bar.errors.map do |attribute, message|
      field_name = Bar::BOOLEAN_COLUMN_ALIASES[attribute].presence || attribute

      UserError.new(
        # This is the GraphQL argument which corresponds to the validation error.
        field: [field_name.to_s.camelize(:lower)],
        message: message
      )
    end
  end
end