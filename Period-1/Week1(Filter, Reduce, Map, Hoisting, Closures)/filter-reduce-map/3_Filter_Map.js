//A
var numbers = [1, 3, 5, 10, 11];

var result = numbers.map((x, index) =>  x + numbers[index+1] || 0)

console.log(numbers)


//B
var persons = [{name:"Hassan",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Boline", phone: "79345"}];

const aLinks = "<nav>" + persons.map((person) => `
  <a href=””>${person.name}</a>
`).join("\n")  + "</nav>"
console.log(aLinks)


//C
const tableRows = persons.map((person) => `
<tr>
<td>${person.name}</td>
<td>${person.phone}</td>
</tr>
`).join("")
console.log(tableRows)
