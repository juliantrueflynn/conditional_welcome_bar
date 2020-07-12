# frozen_string_literal: true

module Mutations
  class UpdateBar < GraphQL::Schema::RelayClassicMutation
    include AuthorizedShopGuardable

    field :bar, Types::BarType, null: true
    field :errors, Types::BarErrorType, null: true

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :content, String, required: false
    argument :is_active, Boolean, required: false
    argument :is_sticky, Boolean, required: false
    argument :is_full_width_link, Boolean, required: false
    argument :is_new_tab_url, Boolean, required: false
    argument :has_close_button, Boolean, required: false
    argument :url, String, required: false
    argument :placement, String, required: false
    argument :theme_templates, [String], required: false
    argument :padding_y, String, required: false
    argument :padding_x, String, required: false
    argument :text_align, String, required: false
    argument :text_color, String, required: false
    argument :font_size, String, required: false
    argument :background_color, String, required: false

    def resolve(id:, **attributes)
      shop = context[:current_shop]
      bar = shop.bars.find_by(id: id)

      raise GraphQL::ExecutionError, "Welcome bar does not exist" if bar.blank?

      if BarUpdaterService.call(bar, attributes)
        { bar: bar, errors: {} }
      else
        { bar: nil, errors: bar.errors.messages }
      end
    end
  end
end
