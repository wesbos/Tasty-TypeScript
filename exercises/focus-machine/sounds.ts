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
    url: 'https://sounds.wes.io/air_hum.wav',
    id: 'air',
  },
  {
    name: 'Airport',
    url: 'https://sounds.wes.io/airport-gate-1.mp3',
    id: 'airport',
  },
  {
    name: 'Airplane',
    url: 'https://sounds.wes.io/airplane-interior-1.mp3',
    id: 'airplane-interior-1',
  },
  {
    name: 'Amusement Park',
    alt: 'coaster',
    url: 'https://sounds.wes.io/amusement-park.mp3',
    id: 'amusement-park',
  },
  {
    name: 'Bus',
    url: 'https://sounds.wes.io/bus-1.mp3',
    id: 'bus-1',
  },
  {
    name: 'Car',
    url: 'https://sounds.wes.io/car-interior-1.mp3',
    id: 'car-interior-1',
  },
  {
    name: 'Park',
    url: 'https://sounds.wes.io/c-p-1.mp3',
    id: 'c-p-1',
  },
  {
    name: 'Traffic',
    url: 'https://sounds.wes.io/city-traffic-1.mp3',
    id: 'city-traffic-1',
  },
  // {
  //   "name": "Cheer",
  //   "url": "https://sounds.wes.io/c-c-1.mp3",
  //   id: 'c-c-1',
  // },
  {
    name: 'Crowd',
    url: 'https://sounds.wes.io/crowd_outside_1.wav',
    id: 'crowd_outside_1',
  },
  {
    name: 'city',
    url: 'https://sounds.wes.io/downtown-1.mp3',
    id: 'downtown-1',
  },
  {
    name: 'city',
    url: 'https://sounds.wes.io/downtown-2.mp3',
    id: 'downtown-2',
  },
  {
    name: 'School',
    url: 'https://sounds.wes.io/e-s.mp3',
    id: 'e-s',
  },
  {
    name: 'Fast Food',
    alt: 'burger',
    url: 'https://sounds.wes.io/fast_food_joint_1.wav',
    id: 'fast_food_joint_1',
  },
  {
    name: 'Fire',
    url: 'https://sounds.wes.io/fire-1.mp3',
    id: 'fire-1',
  },
  {
    name: 'Restaurant',
    url: 'https://sounds.wes.io/food_court.wav',
    id: 'food_court',
  },
  {
    name: 'Highway',
    url: 'https://sounds.wes.io/freeway-1.mp3',
    id: 'freeway-1',
  },
  {
    name: 'Highway',
    url: 'https://sounds.wes.io/freeway-2.mp3',
    id: 'freeway-2',
  },
  {
    name: 'Grocery Store',
    alt: 'grocery',
    url: 'https://sounds.wes.io/grocery_store_1.wav',
    id: 'grocery_store_1',
  },
  {
    name: 'Talking',
    url: 'https://sounds.wes.io/g-t-1.mp3',
    id: 'g-t-1',
  },
  {
    name: 'Hallway',
    alt: 'doors',
    url: 'https://sounds.wes.io/hallway-crowd.mp3',
    id: 'hallway-crowd',
  },
  {
    name: 'Highway',
    url: 'https://sounds.wes.io/highway-1.mp3',
    id: 'highway-1',
  },
  {
    name: 'Football',
    url: 'https://sounds.wes.io/kids-playing-football.mp3',
    id: 'kids-playing-football',
  },
  {
    name: 'Laundry',
    url: 'https://sounds.wes.io/laundry_room_1.wav',
    id: 'laundry_room_1',
  },
  {
    name: 'Lobby',
    url: 'https://sounds.wes.io/lobby_1.wav',
    id: 'lobby_1',
  },
  {
    name: 'Lobby',
    url: 'https://sounds.wes.io/l-c-1.mp3',
    id: 'l-c-1',
  },
  {
    name: 'Lobby',
    url: 'https://sounds.wes.io/l-c-2.mp3',
    id: 'l-c-2',
  },
  {
    name: 'Marketplace 1',
    alt: 'market',
    url: 'https://sounds.wes.io/marketplace_1.wav',
    id: 'marketplace_1',
  },
  {
    name: 'Marketplace 2',
    alt: 'market',
    url: 'https://sounds.wes.io/marketplace_2.wav',
    id: 'marketplace_2',
  },
  {
    name: 'Marketplace 3',
    alt: 'market',
    url: 'https://sounds.wes.io/marketplace_3.wav',
    id: 'marketplace_3',
  },
  {
    name: 'Metro Station',
    alt: 'subway',
    url: 'https://sounds.wes.io/metro-station-1.mp3',
    id: 'metro-station-1',
  },
  {
    name: 'Outside Cafe',
    alt: 'coffee',
    url: 'https://sounds.wes.io/o-c-1.mp3',
    id: 'o-c-1',
  },
  {
    name: 'Park 1',
    alt: 'park',
    url: 'https://sounds.wes.io/park_1.wav',
    id: 'park_1',
  },
  {
    name: 'Park 2',
    alt: 'park',
    url: 'https://sounds.wes.io/park_2.wav',
    id: 'park_2',
  },
  {
    name: 'Party Crowd',
    alt: 'party',
    url: 'https://sounds.wes.io/party_crowd_1.wav',
    id: 'party_crowd_1',
  },
  {
    name: 'People Talking',
    alt: 'talking',
    url: 'https://sounds.wes.io/people-talking.mp3',
    id: 'people-talking',
  },
  {
    name: 'Rain 1',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain_1.mp3',
    id: 'rain_1',
  },
  {
    name: 'Rain 2',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain_2.wav',
    id: 'rain_2',
  },
  {
    name: 'Rain 3',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain_3.wav',
    id: 'rain_3',
  },
  {
    name: 'Rain 4',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain_4.wav',
    id: 'rain_4',
  },
  {
    name: 'Rain 5',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain-5.mp3',
    id: 'rain-5',
  },
  {
    name: 'Rain 6 (Light)',
    alt: 'rain',
    url: 'https://sounds.wes.io/rain-6.mp3',
    id: 'rain-6',
  },
  {
    name: 'Restaurant 1',
    alt: 'restaurant',
    url: 'https://sounds.wes.io/restaurant_1.wav',
    id: 'restaurant_1',
  },
  {
    name: 'Restaurant 2',
    alt: 'restaurant',
    url: 'https://sounds.wes.io/restaurant-2.mp3',
    id: 'restaurant-2',
  },
  {
    name: 'River 1',
    alt: 'river',
    url: 'https://sounds.wes.io/river-1.mp3',
    id: 'river-1',
  },
  {
    name: 'River 2',
    alt: 'river',
    url: 'https://sounds.wes.io/river-2.mp3',
    id: 'river-2',
  },
  {
    name: 'School Yard',
    alt: 'school',
    url: 'https://sounds.wes.io/s-y.mp3',
    id: 's-y',
  },
  {
    name: 'Sea Waves 1',
    alt: 'waves',
    url: 'https://sounds.wes.io/s-w-1.mp3',
    id: 's-w-1',
  },
  {
    name: 'Sea Waves 2',
    alt: 'waves',
    url: 'https://sounds.wes.io/s-w-2.mp3',
    id: 's-w-2',
  },
  {
    name: 'Shopping Mall',
    alt: 'mall',
    url: 'https://sounds.wes.io/shopping-mall-1.mp3',
    id: 'shopping-mall-1',
  },
  {
    name: 'Store Paging',
    alt: 'speaker',
    url: 'https://sounds.wes.io/store-paging.wav',
    id: 'store-paging',
  },
  {
    name: 'Street Construction',
    alt: 'Construction',
    url: 'https://sounds.wes.io/street-construction-1.mp3',
    id: 'street-construction-1',
  },
  {
    name: 'Street Hockey',
    alt: 'hockey',
    url: 'https://sounds.wes.io/s-h.mp3',
    id: 's-h',
  },
  {
    name: 'Street Traffic 1',
    alt: 'traffic',
    url: 'https://sounds.wes.io/street-traffic-1.mp3',
    id: 'street-traffic-1',
  },
  {
    name: 'Street Traffic 2',
    alt: 'traffic',
    url: 'https://sounds.wes.io/street-traffic-2.mp3',
    id: 'street-traffic-2',
  },
  {
    name: 'Water Fountain',
    alt: 'fountain',
    url: 'https://sounds.wes.io/water-fountain-1.mp3',
    id: 'water-fountain-1',
  },
  {
    name: 'Waterfall',
    alt: 'waterfall',
    url: 'https://sounds.wes.io/waterfall-1.mp3',
    id: 'waterfall-1',
  },
  {
    name: 'Water Stream (Small)',
    alt: 'river',
    url: 'https://sounds.wes.io/water-stream-1.mp3',
    id: 'water-stream-1',
  },
  {
    name: 'Wind Breeze',
    alt: 'wind',
    url: 'https://sounds.wes.io/wind-breeze-1.mp3',
    id: 'wind-breeze-1',
  },
  {
    name: 'Windy Forest',
    alt: 'wind',
    url: 'https://sounds.wes.io/windy-forest-1.mp3',
    id: 'windy-forest-1',
  },
];
