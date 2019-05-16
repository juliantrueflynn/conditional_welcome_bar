module Types
  class QueryType < Types::BaseObject
    field :bars, [Types::BarType], null: true do
      argument :shopify_domain, String, required: false
    end
    def bars(shopify_domain:)
      shop = Shop.find_by_shopify_domain(shopify_domain)
      return shop.bars if shop
      []
    end

    field :bar, Types::BarType, null: true do
      argument :id, ID, required: true
    end
    def bar(id:)
      Bar.find_by_id(id)
    end
  end
end
