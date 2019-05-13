module Types
  class QueryType < Types::BaseObject
    field :shop, Types::ShopType, null: true do
      argument :shopify_domain, String, required: false
    end
    def shop(shopify_domain:)
      Shop.find_by_shopify_domain(shopify_domain)
    end

    field :bars, [Types::BarType], null: false do
      argument :shopify_domain, String, required: false
    end
    def bars(shopify_domain:)
      Bar.with_shopify_domain(shopify_domain)
    end

    field :bar, Types::BarType, null: false do
      argument :id, String, required: true
    end
    def bar(id:)
      Bar.find_by_id(id)
    end
  end
end
