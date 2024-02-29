// class Sandwich {
//   name: string;

//   toppings: string[] = ['Lettuce', 'Cheese'];

//   bitesLeft = 10;

//   constructor(name: string) {
//     this.name = name;
//   }

//   bite() {
//     if (this.bitesLeft <= 0) {
//       throw Error('No more bites left!');
//     }
//     this.bitesLeft -= 1;
//     return this.bitesLeft;
//   }
// }

// const hammySammy = new Sandwich('Ham Sandwich');
// const bahnMi = new Sandwich('Pork Bahn Mi');

class SlideShow {
  // el: HTMLElement;

  // speed: number;

  // startingSlide: number;

  constructor(
    public el: HTMLElement,
    readonly speed: number,
    private startingSlide: number = 1
  ) {
    console.log('Starting');
    // this.el = el;
    // this.speed = speed;
    // this.startingSlide = startingSlide;
  }

  next() {
    // this.speed = 300;
  }
}

const myShow = new SlideShow(document.body, 100, 2);
