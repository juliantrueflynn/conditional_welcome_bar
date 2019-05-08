status = @shop.nil? ? 'fail' : 'ok'

json.status status

json.data do
  json.shop do
    json.shopify_domain @shop.nil? ? nil : @shop.shopify_domain
  end
end