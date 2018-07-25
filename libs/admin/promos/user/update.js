let { createButtonMessage } = require('../../../../libs/bots.js');
let { getTable, updateTableData } = require('../../../../libs/data.js');

let getPromosTable = getTable('Promos');

let updatePromo = async (data) => {
  let { practice_promos_base_id, promo, user_record_id } = data;

  let promosTable = getPromosTable(practice_promos_base_id);
  let updatePromoFromTable = updateTableData(promosTable);

  let already_used_user_ids = promo.fields['Promo Used By Users'] || [];
  let total_used = Number(
    promo.fields['Total Used']
  );

  let new_used_user_ids = [
    ...new Set([user_record_id, ...already_used_user_ids])
  ];

  let updateData = {
    ['Promo Used By Users']: new_used_user_ids,
    ['Total Used']: total_used + 1
  }

  let updatedPromo = await updatePromoFromTable(updateData, promo);
  return updatedPromo;
}

let createUpdateMsg = () => {
  let msg = createButtonMessage(
    `Promo Claimed Successfully`,
    `Admin Menu|show_block|[JSON] Get Admin Menu`,
  );
  
  return msg;
}

module.exports = {
  updatePromo,
  createUpdateMsg,
}