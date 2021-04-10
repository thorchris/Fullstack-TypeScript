//A
var all= ["Hassan", "Peter", "Carla", "Boline"];

const allPrint = all.map(x => x).join("#");

console.log(allPrint);

//B
var numbers = [2, 3, 67, 33]; 

var sum = numbers.reduce( function(total, amount){
    return total + amount
  });

  console.log(sum);


//C
var members = [
  {name : "Peter", age: 18},
  {name : "Jan", age: 35},
  {name : "Janne", age: 25},
  {name : "Martin", age: 22}]

  var reducer = function(accumulator, member,index,members ){
      var calculatedValue = accumulator + member.age;

      if (index === members.length - 1) {
          return calculatedValue / members.length;
        }

        return calculatedValue;
      }
      var result = members.reduce(reducer, 0);

  console.log(result)

//D

  const votes = [ "Biden","Trump","Biden","Biden","Trump","Trump","Biden","None"];

  var votesAmount = votes.reduce(function(obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

  console.log(votesAmount);