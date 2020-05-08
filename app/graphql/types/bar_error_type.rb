# frozen_string_literal: true

module Types
  class BarErrorType < Types::BaseObject
    field :title, [String], null: true
    field :content, [String], null: true
    field :is_active, [String], null: true
    field :is_sticky, [String], null: true
    field :is_full_width_link, [String], null: true
    field :is_new_tab_url, [String], null: true
    field :url, [String], null: true
    field :has_close_button, [String], null: true
    field :placement, [String], null: true
    field :padding_y, [String], null: true
    field :padding_x, [String], null: true
    field :text_align, [String], null: true
    field :text_color, [String], null: true
    field :font_size, [String], null: true
    field :background_color, [String], null: true
    field :page_templates, [String], null: true
  end
end
