export interface Sound {
  name: string;
  alt?: string;
  url: string;
  id: string;
}

export interface SingleMix {
  id: string;
  volume: number;
}

export type Mix = SingleMix[];

export const sounds: Sound[] = [
  {
    name: 'Noise',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/air_hum.wav',
    id: 'air',
  },
  {
    name: 'Airport',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/airport-gate-1.mp3',
    id: 'airport',
  },
  {
    name: 'Airplane',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/airplane-interior-1.mp3',
    id: 'airplane-interior-1',
  },
  {
    name: 'Amusement Park',
    alt: 'coaster',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/amusement-park.mp3',
    id: 'amusement-park',
  },
  {
    name: 'Bus',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/bus-1.mp3',
    id: 'bus-1',
  },
  {
    name: 'Car',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/car-interior-1.mp3',
    id: 'car-interior-1',
  },
  {
    name: 'Park',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/c-p-1.mp3',
    id: 'c-p-1',
  },
  {
    name: 'Traffic',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/city-traffic-1.mp3',
    id: 'city-traffic-1',
  },
  // {
  //   "name": "Cheer",
  //   "url": "https://www.pacdv.com/sounds/ambience_sounds/c-c-1.mp3",
  //   id: 'c-c-1',
  // },
  {
    name: 'Crowd',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/crowd_outside_1.wav',
    id: 'crowd_outside_1',
  },
  {
    name: 'city',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/downtown-1.mp3',
    id: 'downtown-1',
  },
  {
    name: 'city',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/downtown-2.mp3',
    id: 'downtown-2',
  },
  {
    name: 'School',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/e-s.mp3',
    id: 'e-s',
  },
  {
    name: 'Fast Food',
    alt: 'burger',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/fast_food_joint_1.wav',
    id: 'fast_food_joint_1',
  },
  {
    name: 'Fire',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/fire-1.mp3',
    id: 'fire-1',
  },
  {
    name: 'Restaurant',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/food_court.wav',
    id: 'food_court',
  },
  {
    name: 'Highway',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/freeway-1.mp3',
    id: 'freeway-1',
  },
  {
    name: 'Highway',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/freeway-2.mp3',
    id: 'freeway-2',
  },
  {
    name: 'Grocery Store',
    alt: 'grocery',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/grocery_store_1.wav',
    id: 'grocery_store_1',
  },
  {
    name: 'Talking',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/g-t-1.mp3',
    id: 'g-t-1',
  },
  {
    name: 'Hallway',
    alt: 'doors',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/hallway-crowd.mp3',
    id: 'hallway-crowd',
  },
  {
    name: 'Highway',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/highway-1.mp3',
    id: 'highway-1',
  },
  {
    name: 'Football',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/kids-playing-football.mp3',
    id: 'kids-playing-football',
  },
  {
    name: 'Laundry',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/laundry_room_1.wav',
    id: 'laundry_room_1',
  },
  {
    name: 'Lobby',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/lobby_1.wav',
    id: 'lobby_1',
  },
  {
    name: 'Lobby',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/l-c-1.mp3',
    id: 'l-c-1',
  },
  {
    name: 'Lobby',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/l-c-2.mp3',
    id: 'l-c-2',
  },
  {
    name: 'Marketplace 1',
    alt: 'market',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/marketplace_1.wav',
    id: 'marketplace_1',
  },
  {
    name: 'Marketplace 2',
    alt: 'market',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/marketplace_2.wav',
    id: 'marketplace_2',
  },
  {
    name: 'Marketplace 3',
    alt: 'market',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/marketplace_3.wav',
    id: 'marketplace_3',
  },
  {
    name: 'Metro Station',
    alt: 'subway',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/metro-station-1.mp3',
    id: 'metro-station-1',
  },
  {
    name: 'Outside Cafe',
    alt: 'coffee',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/o-c-1.mp3',
    id: 'o-c-1',
  },
  {
    name: 'Park 1',
    alt: 'park',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/park_1.wav',
    id: 'park_1',
  },
  {
    name: 'Park 2',
    alt: 'park',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/park_2.wav',
    id: 'park_2',
  },
  {
    name: 'Party Crowd',
    alt: 'party',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/party_crowd_1.wav',
    id: 'party_crowd_1',
  },
  {
    name: 'People Talking',
    alt: 'talking',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/people-talking.mp3',
    id: 'people-talking',
  },
  {
    name: 'Rain 1',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain_1.mp3',
    id: 'rain_1',
  },
  {
    name: 'Rain 2',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain_2.wav',
    id: 'rain_2',
  },
  {
    name: 'Rain 3',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain_3.wav',
    id: 'rain_3',
  },
  {
    name: 'Rain 4',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain_4.wav',
    id: 'rain_4',
  },
  {
    name: 'Rain 5',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain-5.mp3',
    id: 'rain-5',
  },
  {
    name: 'Rain 6 (Light)',
    alt: 'rain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/rain-6.mp3',
    id: 'rain-6',
  },
  {
    name: 'Restaurant 1',
    alt: 'restaurant',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/restaurant_1.wav',
    id: 'restaurant_1',
  },
  {
    name: 'Restaurant 2',
    alt: 'restaurant',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/restaurant-2.mp3',
    id: 'restaurant-2',
  },
  {
    name: 'River 1',
    alt: 'river',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/river-1.mp3',
    id: 'river-1',
  },
  {
    name: 'River 2',
    alt: 'river',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/river-2.mp3',
    id: 'river-2',
  },
  {
    name: 'School Yard',
    alt: 'school',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/s-y.mp3',
    id: 's-y',
  },
  {
    name: 'Sea Waves 1',
    alt: 'waves',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/s-w-1.mp3',
    id: 's-w-1',
  },
  {
    name: 'Sea Waves 2',
    alt: 'waves',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/s-w-2.mp3',
    id: 's-w-2',
  },
  {
    name: 'Shopping Mall',
    alt: 'mall',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/shopping-mall-1.mp3',
    id: 'shopping-mall-1',
  },
  {
    name: 'Store Paging',
    alt: 'speaker',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/store-paging.wav',
    id: 'store-paging',
  },
  {
    name: 'Street Construction',
    alt: 'Construction',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/street-construction-1.mp3',
    id: 'street-construction-1',
  },
  {
    name: 'Street Hockey',
    alt: 'hockey',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/s-h.mp3',
    id: 's-h',
  },
  {
    name: 'Street Traffic 1',
    alt: 'traffic',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/street-traffic-1.mp3',
    id: 'street-traffic-1',
  },
  {
    name: 'Street Traffic 2',
    alt: 'traffic',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/street-traffic-2.mp3',
    id: 'street-traffic-2',
  },
  {
    name: 'Water Fountain',
    alt: 'fountain',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/water-fountain-1.mp3',
    id: 'water-fountain-1',
  },
  {
    name: 'Waterfall',
    alt: 'waterfall',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/waterfall-1.mp3',
    id: 'waterfall-1',
  },
  {
    name: 'Water Stream (Small)',
    alt: 'river',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/water-stream-1.mp3',
    id: 'water-stream-1',
  },
  {
    name: 'Wind Breeze',
    alt: 'wind',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/wind-breeze-1.mp3',
    id: 'wind-breeze-1',
  },
  {
    name: 'Windy Forest',
    alt: 'wind',
    url: 'https://www.pacdv.com/sounds/ambience_sounds/windy-forest-1.mp3',
    id: 'windy-forest-1',
  },
];
