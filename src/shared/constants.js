export const MODAL = {
  ADDRESS: "Address",
  SCHEDULE: "Schedule",
  TASKS: "Tasks",
};

export const BUTTON = {
  CLOSE: "Close",
  MAPS_REDIRECT: "See on map",
};

export const BASE_URL = "https://ikp-mobile-challenge-backend.up.railway.app";

export const DEFAULT_STORES = [
  {
    address: {
      coordinate: {
        lat: 41.3995345,
        lng: 2.1909796,
      },
      direction: 'Example direction',
    },
    id: '1234',
    name: 'Tiendanimal',
    schedule: {
      end: '8:00pm',
      from: '8:00am',
    },
    tasks: [
      {
        description: 'Sell dog food',
        id: '1',
      },
    ],
  }
];
