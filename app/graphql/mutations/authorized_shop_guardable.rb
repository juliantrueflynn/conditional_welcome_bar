# frozen_string_literal: true

require "active_support/concern"

module Mutations
  module AuthorizedShopGuardable
    extend ActiveSupport::Concern

    class_methods do
      def authorized?(_, context)
        return false if context[:current_shop].blank?

        super
      end
    end
  end
end
