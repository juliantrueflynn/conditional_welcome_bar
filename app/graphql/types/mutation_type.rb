# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :destroy_bar, mutation: Mutations::DestroyBar
    field :create_bar, mutation: Mutations::CreateBar
    field :update_bar, mutation: Mutations::UpdateBar
  end
end
