let express = require('express');
let app = express();

let handleAI = require('./routes/ai');
let getAdminMenu = require('./routes/getAdminMenu');

let providersRouter = require('./routes/providers');
let promosRouter = require('./routes/promos');
let servicesRouter = require('./routes/service');


// Promos
let getPromos = require('./routes/getPromos');
let getPromoDetails = require('./routes/getPromoDetails');
let getPromoProvider = require('./routes/getPromoProvider');
let claimPromotion = require('./routes/claimPromotion');
let createManufacturedPromo = require('./routes/createManufacturedPromo');
let createCustomPromo = require('./routes/createCustomPromo');
let viewActivePromos = require('./routes/viewActivePromos');
let viewPromoInfo = require('./routes/viewPromoInfo');
let viewClaimedPromos = require('./routes/viewClaimedPromos');
let viewPromoId = require('./routes/viewPromoId');
let updatePromoInfo = require('./routes/updatePromoInfo');
let togglePromo = require('./routes/togglePromo');
let verifyPromo = require('./routes/verifyPromo');
let updateVerifiedPromo = require('./routes/updateVerifiedPromo');


// ROUTES CONFIGURATION
app.get('/ai', handleAI);
app.get('/admin/menu', getAdminMenu);

// Promotions
app.get('/search/promos/:search_type', getPromos);
app.get('/promo/details', getPromoDetails);
app.get('/promo/provider', getPromoProvider);
app.use('/promo/claim', claimPromotion);
app.use('/promo/new/manufactured', createManufacturedPromo);
app.use('/promo/new/custom', createCustomPromo);
app.get('/promo/view/all', viewActivePromos);
app.get('/promo/view/info', viewPromoInfo);
app.get('/promo/view/claimed', viewClaimedPromos);
app.get('/promo/view/id', viewPromoId);
app.use('/promo/update', updatePromoInfo);
app.get('/promo/toggle', togglePromo);
app.get('/promo/verify', verifyPromo);
app.get('/promo/verify/update', updateVerifiedPromo);


app.listen(3000, () => console.log('Running on PORT 3000'));