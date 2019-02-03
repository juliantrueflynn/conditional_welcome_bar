json.(@bar, *@bar.attributes.except('shop_id').keys)
json.background_image @bar.background_image.url