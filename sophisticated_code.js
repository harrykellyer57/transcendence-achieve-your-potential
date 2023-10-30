/**
 * Filename: sophisticated_code.js
 * 
 * Description: This code demonstrates a sophisticated, elaborate, and complex JavaScript program
 *              that showcases various advanced concepts and techniques.
 */

// Custom class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Factory function
function createPerson(name, age) {
  return new Person(name, age);
}

// Async function using Promises
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error;
  }
}

// Event listener with a callback function
document.addEventListener('DOMContentLoaded', function() {
  // DOM manipulation
  const button = document.createElement('button');
  button.textContent = 'Click me!';
  button.addEventListener('click', function() {
    console.log('Button clicked!');
    button.style.backgroundColor = 'green';
  });
  document.body.appendChild(button);
});

// Advanced array manipulation
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(x => x * x);
console.log(squaredNumbers);

// Destructuring assignment and spread operator
const [a, b, ...rest] = numbers;
console.log(`a: ${a}, b: ${b}, rest: ${rest}`);

// Regular expression usage
const regex = /\d+/;
const str = 'Number: 12345';
console.log(str.match(regex));

// Error handling using try-catch
try {
  // Code that may throw an error
} catch (error) {
  console.log('An error occurred:', error);
}

// Complex algorithm - Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
  const primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  
  const result = [];
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }
  
  return result;
}

console.log(sieveOfEratosthenes(100));

// Advanced OOP concepts - Inheritance
class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }
  
  work() {
    console.log(`${this.name} is working as a ${this.position}.`);
  }
}

const john = new Employee('John', 30, 'Developer');
john.introduce();
john.work();