# frozen_string_literal: true

class StaticPagesController < AuthenticatedController
  layout "embedded_app"

  def show
    response.headers.except!("X-Frame-Options")
  end
end
