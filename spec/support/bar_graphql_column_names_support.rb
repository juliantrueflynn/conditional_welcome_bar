# frozen_string_literal: true

module BarGraphqlColumnNamesSupport
  def bar_camelized_column_names
    renamed = Bar::BOOLEAN_COLUMN_ALIASES.values.map(&:to_s)
    new_names = Bar::BOOLEAN_COLUMN_ALIASES.keys.map(&:to_s)
    excluded = %w[id created_at updated_at shop_id]
    renamed_and_excluded = renamed + excluded
    columns = (Bar.column_names + new_names - renamed_and_excluded).map { |name| name.camelize(:lower) }
    columns.join(" ")
  end
end
