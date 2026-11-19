const jobInfo = {
  name: "Arun Kumar Singh",
  age: 27,
  profession: "Software Engineer",
  location: "Hyderabad",
  phoneNumber: "8427825355",
};

// console.log(jobInfo.age);
// for(let keys in jobInfo){
//     console.log(jobInfo[keys])
// }

let keys = Object.keys(jobInfo);
let values = Object.values(jobInfo);

let createObject = Object.create();

createObject.row = "Arun Singh";

console.log(createObject);
console.log(keys);
console.log(values);
