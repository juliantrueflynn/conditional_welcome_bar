# frozen_string_literal: true

# Maps ActiveRecords error messages so they can be consumed better by UI.
# Used for GraphQL mutations for Bar class.
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
      field_name = Bar::BOOLEAN_COLUMN_ALIASES[attribute.to_sym].presence ||
                   Bar::BOOLEAN_COLUMN_ALIASES.invert[attribute.to_sym].presence ||
                   attribute

      UserError.new(
        # This is the GraphQL argument which corresponds to the validation error.
        field: [field_name.to_s.camelize(:lower)],
        message: message
      )
    end
  end
end
