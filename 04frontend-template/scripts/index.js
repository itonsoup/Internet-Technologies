// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  return cardElement;
}

function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card);
    placesList.append(cardElement);
  });
}

renderInitialCards(initialCards);

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Пример: кнопка открытия поп-апа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  openModal(profilePopup);
});

// Закрытие поп-апа
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
closeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
});

// Закрытие поп-апа по клику на фон
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});


const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

const profileForm = document.forms['edit-profile'];
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profilePopup);
});

const cardForm = document.forms['new-place'];
const placeNameInput = cardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = cardForm.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');

addCardButton.addEventListener('click', () => {
  openModal(cardPopup);
});

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newCard = createCard({ name: placeNameInput.value, link: placeLinkInput.value });
  placesList.prepend(newCard);
  cardForm.reset();
  closeModal(cardPopup);
});

placesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
      const popupImage = imagePopup.querySelector('.popup__image');
      const popupCaption = imagePopup.querySelector('.popup__caption');
      popupImage.src = event.target.src;
      popupImage.alt = event.target.alt;
      popupCaption.textContent = event.target.alt;
      openModal(imagePopup);
    }
  });