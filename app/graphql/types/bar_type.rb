# frozen_string_literal: true

module Types
  class BarType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :content, String, null: false
    field :is_active, Boolean, null: false
    field :is_sticky, Boolean, null: false
    field :is_full_width_link, Boolean, null: false
    field :is_new_tab_url, Boolean, null: false
    field :has_close_button, Boolean, null: false
    field :url, String, null: true
    field :placement, String, null: true
    field :padding_y, String, null: true
    field :padding_x, String, null: true
    field :text_align, String, null: true
    field :text_color, String, null: true
    field :font_size, String, null: true
    field :background_color, String, null: true
    field :created_at, String, null: false
    field :updated_at, String, null: false
    field :theme_templates, [String], null: false

    def theme_templates
      object.theme_templates.pluck(:name)
    end

    def content
      object.content || ""
    end
  end
end
