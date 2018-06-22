'use strict';
var COUNT_COMMENTS = 3;
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var getRandomNumberFromTo = function (min, max) {
  min = Number.isInteger(min) ? min : 0;
  max = Number.isInteger(max) ? max : 0;
  if (min > max) {
    throw new Error('min > max');
  }
  if (max !== 0) {
    max++;
  }
  return Math.floor(Math.random() * (max-min))+min;
};
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
  'Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomComment = function () {
  var count = getRandomNumberFromTo(1, 2);
  var comment = [];
  for (var i = 0; i < count; i++) {
    comment.push(getRandomElement(COMMENTS));
  }
  return comment.join(' ');
};
var getRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COUNT_COMMENTS; i++) {
    comments.push(getRandomComment());
  }
  return comments;
};

var generateData = function (count) {
  var data = [];
  for (var i = 1; i <= count; i++) {
    data.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumberFromTo(15, 200),
      comments: getRandomComments(),
      description: getRandomElement(DESCRIPTIONS)
    });
  }
  return data;
};

var getPictures = function (data) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content;
  data.forEach(function (obj) {
    var picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = obj.url;
    picture.querySelector('.picture__stat--likes').textContent = obj.likes;
    picture.querySelector('.picture__stat--comments').textContent = obj.comments.length;
    fragment.appendChild(picture);
  });
  return fragment;
};

var renderBigPicture = function (data) {
  bigPicture.querySelector('.big-picture__img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;

  var fragment = document.createDocumentFragment();
  var socialComment = bigPicture.querySelector('.social__comment');
  data.comments.forEach(function (comment) {
    var node = socialComment.cloneNode(true);
    node.classList.add('social__comment--text');
    node.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumberFromTo(1, 6) + '.svg';
    node.textContent = comment;
    fragment.appendChild(node);
  });
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';
  bigPicture.querySelector('.social__comments').appendChild(fragment);
};

var mockData = generateData(25);
var picturesFragment = getPictures(mockData);
var pictures = document.querySelector('.pictures');
pictures.appendChild(picturesFragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
renderBigPicture(mockData[0]);

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');


