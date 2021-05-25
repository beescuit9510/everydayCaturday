import { catImgs, cityCountry, catSpecies, names, 
    // birthday 
} from './catData'

let randomIndex = (max, min)=> Math.floor(Math.random() * (max - min) + min);

function Cat(i) {
    this.name = names[i];
    this.age = randomIndex(21, 0);
    this.species = catSpecies[randomIndex(90,0)];
    this.address = cityCountry[randomIndex(158,0)];
    this.img = catImgs[i];
    this.id = `${this.name}${Math.floor(100000 + Math.random() * 900000)}`;
    this.euthanizeDay = Math.floor(Math.random() * (25 - 1) + 1);
}


let Cats = [];
for(let i=0;i<80;i++){
    let cat = new Cat(i)
    Cats.push(cat)
}

export {Cats}
