class ListItemsController < ApplicationController
  before_action :set_list
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /list/1/items/1
  def show
  end

  # GET /list/1/items/new
  def new
    @item = ListItem.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  def create
    # params[:list_id]
    @item = ListItem.new(item_params)

    if @item.save
      redirect_to @list, notice: 'Item was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      redirect_to list_path(@list), notice: 'Item was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy
    redirect_to list_url(@list), notice: 'Item was successfully destroyed.'
  end

  private
    def set_list
      @list = List.find(params[:list_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = ListItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:list_item).permit(:list_id, :name, :description)
    end
end
