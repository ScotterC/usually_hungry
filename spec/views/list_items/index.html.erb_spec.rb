require 'rails_helper'

RSpec.describe "list_items/index", type: :view do
  before(:each) do
    assign(:list_items, [
      ListItem.create!(
        :list_id => 2,
        :name => "Name",
        :description => "MyText"
      ),
      ListItem.create!(
        :list_id => 2,
        :name => "Name",
        :description => "MyText"
      )
    ])
  end

  it "renders a list of list_items" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
