const testing = (e) => {
  // console.log('testing');
  console.log(e.target, 'click', 'added')
  console.log('hello')
}

const columns = document.querySelectorAll('.col')

columns.forEach(column => column.addEventListener('click', testing))



// class Car {

//   constructor(car, make) {
//     this.car = car
//     this.make = make

//     this.buildVehicle()
//   }

//   get vehicle() {
//     return this.buildVehicle()
//   }

//   buildVehicle() {
//     const car = `${this.car} ${this.make}`
//     document.querySelector('.wrapper').append(`You have this ${car} coming from Javascript`)
//     return car
//   }
// }

// const vehicle = new Car('Ford', 'F-150')
