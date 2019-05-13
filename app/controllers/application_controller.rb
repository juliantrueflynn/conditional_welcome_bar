class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  after_action :set_csrf_cookie

  def set_csrf_cookie
    cookies['cwb_csrf'] = form_authenticity_token
  end

  def fallback_index_html
    response.headers.except!('X-Frame-Options')
    render :file => 'public/index.html'
  end
end
