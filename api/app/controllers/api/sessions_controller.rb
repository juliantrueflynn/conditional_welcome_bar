class Api::SessionsController < ApplicationController
  def show
    shop = Shop.find_by_shopify_domain(params[:shop_domain])

    if shop
      @session = Auth.issue({ shop: shop.id })
      render json: { jwt: @session }
    else
      render json: { permissionUrl: permission_url }
    end
  end

  def create
    token = shopify_session.request_token params[:query]
    @shop = Shop.new(shopify_token: token, shopify_domain: params[:shop_domain])

    if @shop.save
      render 'api/shops/show', object: @shop
    else
      render json: @shop.errors.full_messages, status: 403
    end
  end

  private

  # @TODO: Move logic to PORO
  def shopify_session
    ShopifyAPI::Session.setup(
      api_key: ENV['SHOPIFY_CLIENT_KEY'],
      secret: ENV['SHOPIFY_CLIENT_SECRET']
    )

    ShopifyAPI::Session.new domain: params[:shop_domain],
      token: nil,
      api_version: ENV['SHOPIFY_API_VERSION']
  end

  # @TODO: Move logic to PORO
  def permission_url
    shopify_session.create_permission_url(
      ['write_script_tags'],
      "#{ENV['SHOPIFY_APP_URL']}/auth/callback"
    )
  end
end
