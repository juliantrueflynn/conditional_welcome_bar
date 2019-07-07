# frozen_string_literal: true

module Mutations
  class UpdateBar < GraphQL::Schema::RelayClassicMutation
    field :bar, Types::BarType, null: true
    field :errors, Types::BarErrorType, null: true

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :content, String, required: false
    argument :is_active, Boolean, required: false
    argument :is_sticky, Boolean, required: false
    argument :is_full_width_link, Boolean, required: false
    argument :is_new_tab_url, Boolean, required: false
    argument :url, String, required: false
    argument :has_close_button, Boolean, required: false
    argument :placement, String, required: false
    argument :page_templates, [String], required: false
    argument :padding_y, String, required: false
    argument :padding_x, String, required: false
    argument :text_align, String, required: false
    argument :text_color, String, required: false
    argument :font_size, String, required: false
    argument :background_color, String, required: false
    argument :background_image, String, required: false
    argument :background_image_repeat, String, required: false
    argument :background_image_size_x, String, required: false
    argument :background_image_size_y, String, required: false
    argument :background_image_position_x, String, required: false
    argument :background_image_position_y, String, required: false

    def resolve(id:, **attributes)
      bar = Bar.find_by_id(id)

      if bar&.update(attributes)
        { bar: bar, errors: {} }
      else
        { bar: nil, errors: bar.errors.to_hash }
      end
    end
  end
end
