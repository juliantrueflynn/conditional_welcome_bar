module Mutations
  class DestroyBar < GraphQL::Schema::RelayClassicMutation
    field :bar, Types::BarType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      bar = Bar.find_by_id(id)

      if bar && bar.destroy
        { bar: bar }
      else
        { bar: nil }
      end
    end
  end
end
