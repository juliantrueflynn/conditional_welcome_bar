# frozen_string_literal: true

module Mutations
  class UpdateBar < GraphQL::Schema::RelayClassicMutation
    include AuthorizedShopGuardable

    field :bar, Types::BarType, null: true
    field :user_errors, [Types::UserErrorType], null: false

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
      bar = context[:current_shop].bars.find_by(id: id)

      raise GraphqlErrorHelper.record_not_found("Welcome bar does not exist") if bar.blank?

      if BarUpdaterService.call(bar, attributes)
        { bar: bar, user_errors: [] }
      else
        {
          bar: nil,
          user_errors: ::BarUserErrorsMapper.call(bar)
        }
      end
    end
  end
end
