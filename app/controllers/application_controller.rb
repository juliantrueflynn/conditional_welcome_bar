class ApplicationController < ActionController::Base
  before_action :authenticate 

  def logged_in?
    !!current_shop
  end

  def current_shop
    @shop ||= Shop.find(auth['shop']) if auth_present?
  end

  def authenticate
    render json: ['unauthorized'], status: 404 unless logged_in?
  end

  private

  def token
    request.env['HTTP_AUTHORIZATION'].scan(/Bearer (.*)$/).flatten.last
  end

  def auth
    Auth.decode(token)
  end

  def auth_present?
    !!request.env.fetch('HTTP_AUTHORIZATION', '').scan(/Bearer/).flatten.first
  end
end
