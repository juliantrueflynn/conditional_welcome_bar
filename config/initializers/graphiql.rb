# frozen_string_literal: true

if defined?(GraphiQL) && Rails.env.development?
  Rails.configuration.to_prepare do
    GraphiQL::Rails::EditorsController.class_eval do
      before_action :warm_session

      # This is a workaround to "warm" the session, which is lazily loaded.
      # The GraphQL endpoint uses session, which Omniauth stores, to get the current shop.
      def warm_session
        session[:init] = true
      end
    end
  end

  # GraphiQL uses Sprockets and we need to precompile them in development.
  Rails.application.config.assets.precompile += %w(
    graphiql/rails/application.css
    graphiql/rails/application.js
  )
end
