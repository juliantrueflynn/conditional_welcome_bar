module Types
  class MutationType < Types::BaseObject
    field :createBar, mutation: Mutations::CreateBar
    field :update_bar, mutation: Mutations::UpdateBar
  end
end
