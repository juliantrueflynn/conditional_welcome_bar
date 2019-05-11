module Types
  class QueryType < Types::BaseObject
    field :shop, Types::ShopType, null: false do
      argument :shopify_domain, String, required: true
    end
    def shop(shopify_domain:)
      Shop.find_by_shopify_domain(shopify_domain)
    end
  end
end
