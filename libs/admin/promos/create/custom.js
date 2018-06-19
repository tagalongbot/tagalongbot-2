let { BASEURL } = process.env;
let { createURL, localizeDate } = require('../../../../libs/helpers.js');
let { createBtn } = require('../../../../libs/bots.js');
let { createExpirationDate } = require('../../../../libs/admin/promos/create.js');

let toCategoryGallery = ({ messenger_user_id, new_promo_name, new_promo_expiration_date, new_promo_claim_limit }) => ({ id: category_id, fields: category }) => {
  let title = category['Category Name'];
  let image_url = category['Image URL'];

  let send_images_url = createURL(
    `${BASEURL}/admin/promos/create/custom/images`,
    { messenger_user_id, category_id }
  );

  let btn1 = createBtn(`View Category Images|json_plugin_url|${send_images_url}`);

  let buttons = [btn1];

  return { title, image_url, buttons };
}

let toImagesGallery = ({ new_promo_name, new_promo_expiration_date, new_promo_claim_limit }) => ({ id: promo_id, fields: promo_image }) => {
  let expiration_date = localizeDate(
    createExpirationDate(new_promo_expiration_date)
  );

  let title = new_promo_name;
  let subtitle = `Valid Until ${expiration_date}`;
  let image_url = promo_image['Image URL'];
  let new_promo_image_id = promo_id;

  let select_image_url = createURL(
    `${BASEURL}/admin/promos/create/custom/images/select`,
    { new_promo_name: encodeURIComponent(new_promo_name), new_promo_expiration_date: encodeURIComponent(new_promo_expiration_date), new_promo_claim_limit, new_promo_image_id }
  );

  let btn1 = createBtn(`Use This Image|json_plugin_url|${select_image_url}`);

  let buttons = [btn1];

  return { title, subtitle, image_url, buttons };
}

module.exports = {
  toCategoryGallery,
  toImagesGallery,
}