# frozen_string_literal: true

class UserError
  include ActiveModel::Model

  attr_accessor :field, :message

  def initialize(attributes = {})
    @field = Array(attributes[:field])
    @message = attributes[:message]
  end
end
