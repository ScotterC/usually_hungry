require 'rails_helper'

RSpec.describe "ListItems", type: :request do
  describe "GET /list/1/items" do
    before :each do
      @list = create(:list)
    end

    it "works! (now write some real specs)" do
      get list_list_items_path(@list.id)
      expect(response).to have_http_status(200)
    end
  end
end
