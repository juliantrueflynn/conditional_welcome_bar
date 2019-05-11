module Types
  class ShopType < Types::BaseObject
    field :shopify_domain, String, null: false
    field :bars, [Types::BarType], null: false
  end
end
