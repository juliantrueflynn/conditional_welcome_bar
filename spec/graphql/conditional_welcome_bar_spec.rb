# frozen_string_literal: true

require "rails_helper"

RSpec.describe ConditionalWelcomeBarSchema do
  it "matches the dumped schema (rails graphql:schema:dump)" do
    context = { GRAPHQL_RAKE_TASK: true }
    idl_schema_file = File.read(Rails.root.join("schema.graphql"))
    json_schema_file = File.read(Rails.root.join("schema.json"))

    aggregate_failures do
      expect(described_class.to_definition(context: context)).to eq(idl_schema_file)
      expect(described_class.to_json(context: context)).to eq(json_schema_file)
    end
  end
end
