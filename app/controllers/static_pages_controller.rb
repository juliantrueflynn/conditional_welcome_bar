class StaticPagesController < ApplicationController
  layout "embedded_app"

  def show
    response.headers.except!('X-Frame-Options')
  end
end
