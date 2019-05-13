class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  def fallback_index_html
    response.headers.except!('X-Frame-Options')
    render :file => 'public/index.html'
  end
end
