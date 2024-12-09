import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

    // Добавляем обработчик для лайка
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
    });
  
    // Добавляем обработчик для удаления
    deleteButton.addEventListener('click', () => {
      cardElement.remove();
    });

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

// Кнопка открытия поп-апа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  openModal(profilePopup);
});

// Закрытие поп-апа
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
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

  // Функция отображения ошибки
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

// Функция скрытия ошибки
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
      if (inputElement.name === 'place-name') {
          showInputError(formElement, inputElement, 'Вы пропустили это поле', settings);
      } else if (inputElement.name === 'link') {
          showInputError(formElement, inputElement, 'Введите адрес сайта', settings);
      } else {
          showInputError(formElement, inputElement, inputElement.validationMessage, settings);
      }
  } else {
      hideInputError(formElement, inputElement, settings);
  }
}

// Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, settings) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

// Установка слушателей на форму
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
      });
  });
}

// Включение валидации для всех форм
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement, settings);
  });
}

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: '.popup__form',   // Селектор всех форм
  inputSelector: '.popup__input', // Селектор всех инпутов
  submitButtonSelector: '.popup__button', // Селектор кнопки отправки
  inactiveButtonClass: 'popup__button_disabled', // Класс для отключенной кнопки
  inputErrorClass: 'popup__input_type_error',  // Класс для инпута с ошибкой
  errorClass: 'popup__error_visible'  // Класс для видимой ошибки
};

// Включение валидации
enableValidation(validationSettings);
