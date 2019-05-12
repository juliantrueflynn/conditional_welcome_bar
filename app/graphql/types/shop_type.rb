module Types
  class ShopType < Types::BaseObject
    field :shopify_domain, String, null: true
    field :bars, [Types::BarType], null: true
  end
end
