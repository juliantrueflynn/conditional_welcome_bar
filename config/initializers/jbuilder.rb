# frozen_string_literal: true

require 'oj'
require 'multi_json'

MultiJson.use :oj

Jbuilder.key_format camelize: :lower
