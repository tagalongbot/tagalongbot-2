let { BASURL } = process.env;

let { localizeDate } = require('../../../../libs/helpers.js');

let riot = require('riot');
let week_tag = require('../../../../tags/calls/week-calls.tag');

let { getPracticeByUserID } = require('../../../../libs/data/practices.js');
let { getPracticeCalls } = require('../../../../libs/data/practice/calls.js');
let { getPracticeUser, getUserPromos } = require('../../../../libs/data/practice/users.js');

let toCallData = ({ practice_users_base_id }) => async ({ fields: call }) => {
  let user_messenger_id = call['messenger user id'];

  let practice_user = await getPracticeUser(
    { practice_users_base_id, user_messenger_id }
  );
  
  let practice_user_promos = await getUserPromos(
    { practice_users_base_id, user_id: user_messenger_id }
  );

  let caller_first_name = call['First Name'];
  let caller_last_name = call['Last Name'];

  let caller_name = `${caller_first_name} ${caller_last_name}`;

  let call_date = localizeDate(
    call['Date / Time Created']
  );

  let call_url = `${BASURL}`;

  return { caller_first_name, caller_last_name, caller_name, call_date };
}

let getCallsThisWeek = async ({ query }, res) => {
  let { messenger_user_id } = query;

  let practice = await getPracticeByUserID(messenger_user_id);
  let practice_calls_base_id = practice.fields['Practice Calls Base ID'];
  let practice_users_base_id = practice.fields['Practice Users Base ID'];

  let calls_this_week = await getPracticeCalls(
    { practice_calls_base_id, view: 'Calls This Week' }
  );

  let calls = await Promise.all(calls_this_week.map(
    toCallData({ practice_users_base_id })
  ));

  console.log('calls', calls);

  let view_html = riot.render(week_tag, { calls });
  res.render('week-calls', { view_html });
}

module.exports = getCallsThisWeek;