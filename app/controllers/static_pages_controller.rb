class StaticPagesController < ApplicationController
  def show
    response.headers.except!('X-Frame-Options')
  end
end
