let { BASEURL } = process.env;
let { createGallery } = require('../../libs/bots.js');
let { shuffleArray, flattenArray } = require('../../libs/helpers.js');

let { filterProvidersByService } = require('../../libs/providers.js');
let { getProviders, getProviderPromosByService, toGalleryElement } = require('../../libs/promos/promos.js');

let getPromos = async ({ query, params }, res) => {
  let { search_type } = params;

  let { messenger_user_id, first_name, last_name, gender } = query;
  let { service_name, search_promos_state, search_promos_city, search_promos_zip_code, search_promo_code } = query;

  let providers = await getProviders({ search_promos_state, search_promos_city, search_promos_zip_code, search_type });

  let providers_by_service = (service_name) ? filterProvidersByService(service_name, providers) : [];

  // Study transducers to improve code to not have to map twice
  let provider_promotions = await Promise.all(
    (providers_by_service || providers).map(
      getProviderPromosByService(service_name)
    )
  );

  let promos = provider_promotions.map((promos, index) => {
    let provider = providers[index];
    let provider_id = provider.id;
    let provider_base_id = provider.fields['Practice Base ID'];
    let promos_gallery_elements = promos.map(
      toGalleryElement({ messenger_user_id, provider_id, provider_base_id, first_name, last_name, gender })
    );
  });

  let randomPromotions = shuffleArray(
    flattenArray(promos)
  ).slice(0, 10);

  if (!randomPromotions[0]) {
    let redirect_to_blocks = ['No Promos Found'];
    res.send({ redirect_to_blocks });
    return;
  }

	let promotionsGallery = createGallery(randomPromotions);

  let textMsg = { text: `Here's are some promotions I found ${first_name}` };
	let messages = [textMsg, promotionsGallery];
	res.send({ messages });
}

let handleErrors = (req, res) => (error) => {
  console.log(error);
	let source = 'airtable';
	res.send({ source, error });
}

module.exports = (req, res) => {
	getPromos(req, res)

	.catch(
		handleErrors(req, res)
	);
}