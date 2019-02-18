class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  require 'auth'

  def logged_in?
    !!current_shop
  end

  def current_shop
    if auth_present?
      shop = Shop.find(auth['shop'])
      @current_shop ||= shop if shop
    end
  end

  def authenticate_shop!
    render json: { error: 'unauthorized' }, status: 404 unless logged_in?
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
