import { of, noop, interval, timer, fromEvent, Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';



const source = of('World').pipe(
  map(x => `Hello ${x}!`) // added or maped World with it.
);

source.subscribe(x => console.log(x));


// const interval$ = interval(1000);

// stream 1
// interval$.subscribe(val => {
//   console.log(val);
// });

// stream 2
// interval$.subscribe(value => {
//   console.log("*"); // fraciton of sec
//   console.log(value);
// })

// timer method
// const timer$ = timer(2000, 1000);
// timer$.subscribe((val)=>{
//   console.log(val); 
// });


// Window resize
const resize$ = fromEvent(window, 'resize');
resize$.subscribe((val)=> {
  console.log(val);
});

// Click of document
const click_document$ = fromEvent(document, 'click');
click_document$.subscribe((val)=> {
  console.log(val);
});

function createHttpObservable() {
  return Observable.create( observer => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp => {
      return resp.json();
    }).then(body => {
       // observer and pass data to it
       observer.next(body);
       observer.complete();
    });
});
}



/// HTTP rquest using native fetch method of HTML 5
const $http = createHttpObservable();
// Subcribe 
$http.subscribe(resp => {
//  console.log(resp[0]); 
})

// Map operator with pipe()
//const post$ = createHttpObservable();
const post$ =  $http.pipe(
  map((val) => Object.values(val))
)

post$.subscribe(resp => {
  console.log(resp);
})



















