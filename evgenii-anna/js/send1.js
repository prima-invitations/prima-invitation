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
    'https://script.google.com/macros/s/AKfycbwWqsmzdpf-hUDkGYkEYfLJpHui3gRUIBMF8DY2CQDgPI9kIU5RE8asJs1rAEpb0gf0fw/exec',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      // Если все прошло успешно, перенаправляем на YouTube
      if (data.result === 'success') {
        window.location.href = 'https://prima-invitations.vercel.app/viacheslav-polina/thanks.html';
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
