module Types
  class BarType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :content, String, null: true
    field :is_active, Boolean, null: true
    field :is_sticky, Boolean, null: true
    field :is_full_width_link, Boolean, null: true
    field :is_new_tab_url, Boolean, null: true
    field :url, String, null: true
    field :has_close_button, Boolean, null: true
    field :placement, String, null: true
    field :padding_y, String, null: true
    field :padding_x, String, null: true
    field :text_align, String, null: true
    field :text_opacity, Float, null: true
    field :text_color, String, null: true
    field :font_size, String, null: true
    field :background_opacity, Float, null: true
    field :background_color, String, null: true
    field :background_image, String, null: true
    field :background_image_repeat, String, null: true
    field :background_image_size_x, String, null: true
    field :background_image_size_y, String, null: true
    field :background_image_position_x, String, null: true
    field :background_image_position_y, String, null: true
    field :created_at, String, null: true
    field :updated_at, String, null: true
    field :page_templates, [String], null: false
  end
end
