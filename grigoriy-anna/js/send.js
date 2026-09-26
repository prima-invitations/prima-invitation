document.querySelector('.registration-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Отменяем стандартную отправку формы

  const form = event.target;
  const submitButton = form.querySelector('.registration-btn');

  // Получаем текущую дату и время
  const currentDate = new Date();
  const dateString = currentDate.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Устанавливаем значение поля date
  form.querySelector('input[name="дата"]').value = dateString;

  // Делаем кнопку неактивной и меняем текст
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  // Создаем объект для отправки данных формы
  const formData = new FormData(form);

  // Отправляем данные на Google Таблицы
  fetch(
    'https://script.google.com/macros/s/AKfycbz207R4l3LK9XXi9HZgpxxwA2hsbo5HCccPvCl0JzkLdC6B-s7si7ElP3B7--0wi9Ez/exec',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      // Если все прошло успешно, перенаправляем на YouTube
      if (data.result === 'success') {
        window.location.href = 'https://prima-invitations.vercel.app/grigoriy-anna/thanks.html';
      } else {
        // Если ошибка, восстанавливаем кнопку и показываем сообщение об ошибке
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить';
        alert('Произошла ошибка при отправке данных');
      }
    })
    .catch((error) => {
      // В случае ошибки
      submitButton.disabled = false;
      submitButton.textContent = 'Отправить';
      alert('Произошла ошибка при отправке данных');
    });
});
