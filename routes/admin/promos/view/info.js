let { createPromoMsg } = require('../../../../libs/admin/promos/view/info.js');
let { getPracticePromos } = require('../../../../libs/practice/promos.js');

let viewPromoInfo = async ({ query }, res) => {
  let { messenger_user_id, promo_id, provider_base_id } = query;

  let promo = await getPracticePromos({ promo_id, provider_base_id });

  let promoMsg = createPromoMsg(
    promo,
    { provider_base_id, messenger_user_id }, 
  );

  let messages = [promoMsg];
  res.send({ messages });
}

module.exports = viewPromoInfo;