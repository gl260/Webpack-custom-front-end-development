import { num } from './utils/index.js';
import './style/index.css';
import './style/index.scss';
import zznhImg from './assets/zznh.png';
// 创建div元素
const divEl = document.createElement('div');
divEl.classList.add('box');
divEl.textContent = '我适合一个盒子';
document.body.append(divEl);

// 创建h2元素
const h2El = document.createElement('h2');
h2El.classList.add('title');
h2El.textContent = '我是一个标题';
document.body.append(h2El);

const imgEl = document.createElement('img');
imgEl.src = zznhImg;
document.body.append(imgEl);

const divBgEl = document.createElement('div');
divBgEl.classList.add('bg');
document.body.append(divBgEl);

const num1 = 20;
const num2 = 30;

const result1 = num1 + num2;
const result2 = num(num1, num2);

console.log(result1, result2);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('展开运算: ', ...arr);
