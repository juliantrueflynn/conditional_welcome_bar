# frozen_string_literal: true

class GraphqlController < ApplicationController
  include ShopifyApp::Authenticated

  def execute
    result = WelcomeBarAppSchema.execute(params[:query], execute_query)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development error
  end

  private

  def execute_query
    {
      variables: ensure_hash(params[:variables]),
      context: {},
      operation_name: params[:operationName]
    }
  end

  def hash_from_ambiguous(ambiguous_param)
    if ambiguous_param.present?
      ensure_hash(JSON.parse(ambiguous_param))
    else
      {}
    end
  end

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      hash_from_ambiguous(ambiguous_param)
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")
    json = {
      error: { message: error.message, backtrace: error.backtrace },
      data: {}
    }

    render json: json, status: 500
  end
end
