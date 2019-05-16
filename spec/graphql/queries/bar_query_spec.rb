require 'rails_helper'

describe 'BarQuery', type: :query do
  def column_names
    names = Bar.updatableable_columns
    names.map { |name| name.camelize(:lower) }.join(' ')
  end

  describe 'get bar query' do
    context 'when valid' do
      it 'data responds with bar' do
        bar = create(:bar)
        mutation "query Bar($id: ID!) { bar(id: $id) { id #{column_names} } }",
          variables: { id: bar.id },
          operation_name: 'Bar'
        expect(gql_response.data['bar']['id']).to_not be_nil
        expect(gql_response.data['bar']['title']).to eq(bar.title)
      end

      it 'responds with no errors' do
        bar = create(:bar)
        mutation "query Bar($id: ID!) { bar(id: $id) { id #{column_names} } }",
          variables: { id: bar.id },
          operation_name: 'Bar'
        expect(gql_response.errors).to be_nil
      end
    end

    context 'when not valid' do
      it 'data responds with nil' do
        bar = create(:bar)

        mutation "query Bar($id: ID!) { bar(id: $id) { id #{column_names} } }",
          variables: { id: bar.id + 100 },
          operation_name: 'Bar'
        expect(gql_response.data['bar']).to be_nil
      end

      it 'responds with errors' do
        bar = create(:bar)

        mutation "query Bar($id: ID) { bar(id: $id) { id #{column_names} } }",
          variables: { id: bar.id + 100 },
          operation_name: 'Bar'
        expect(gql_response.errors).to_not be_nil
      end
    end
  end
end
