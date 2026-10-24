// AOS animation
AOS.init({
  once: true
});

// work with form
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
    'https://script.google.com/macros/s/AKfycbyLOsvkALAmHx_raLo0tj4el1gGbAdgYvDdVahhagjIvDAIjVRgOoYTha1uLe-JDEun/exec',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      // Если все прошло успешно, перенаправляем на YouTube
      if (data.result === 'success') {
        window.location.href = 'https://prima-invitations.vercel.app/artem-anastasiya/thanks.html';
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

document.getElementById('form').addEventListener('submit', function (event) {
  var submitButton = document.getElementById('submitBtn');

  if (submitButton.disabled) {
    event.preventDefault(); // Если уже заблокировано, предотвращаем отправку
    return;
  }

  submitButton.disabled = true; // Блокируем кнопку
  submitButton.innerText = 'Отправка...'; // Меняем текст

  setTimeout(() => {
    submitButton.disabled = false; // Через 5 секунд снова разрешаем отправку
    submitButton.innerText = 'Отправить';
  }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
  const preloadImages = (imagePaths) => {
    return Promise.all(
      imagePaths.map((path) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  };

  const images = ['img/bg-top.png', 'img/bg-bottom.png'];

  const wrapper = document.querySelector('.wrapper');
  if (wrapper) {
    wrapper.style.visibility = 'hidden';
  }

  preloadImages(images)
    .then(() => {
      if (wrapper) {
        wrapper.style.visibility = 'visible';
      }
      document.body.classList.add('animation-ready');
    })
    .catch((error) => console.error('Ошибка загрузки изображения:', error));
});
