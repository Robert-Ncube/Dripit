import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "Af58jI_Y5hEWoHsz6O9VFxLbFs-Mk6FzidCe2qbRzLtwcajNspKKueykS13fRE8-8MIVcgW3pDhyy3Tg",
  client_secret:
    "EJN9TQRZY76gT2o2HGO8-bo7YS83Xymq2VOTbLwWWneYzETWYMsFyQek0zc22MVtLdyWiZj-5CINVvlV",
});

export default paypal;
