# frozen_string_literal: true

RSpec.describe GraphqlErrorHelper do
  describe ".unauthenticated" do
    it "builds instance and sets attributes" do
      message = Faker::Lorem.sentence
      code = described_class::EXTENSION_CODE_UNAUTHENTICATED
      result = described_class.unauthenticated(message)

      expect(result).to be_an_instance_of(GraphQL::ExecutionError)
      expect(result).to have_attributes(message: message, extensions: { code: code })
    end
  end

  describe ".record_not_found" do
    it "builds instance and sets attributes" do
      message = Faker::Lorem.sentence
      code = described_class::EXTENSION_CODE_RECORD_NOT_FOUND
      result = described_class.record_not_found(message)

      expect(result).to be_an_instance_of(GraphQL::ExecutionError)
      expect(result).to have_attributes(message: message, extensions: { code: code })
    end
  end
end
