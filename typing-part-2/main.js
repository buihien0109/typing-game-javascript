// Truy cập vào các thành phần
const wordsEl = document.querySelector('#words');
const inputWordEl = document.querySelector('#input-word');
const timeEl = document.querySelector('#time');
const btnReload = document.querySelector('.btn-reload');
const languageEl = document.querySelector('#chose-language');

// Khai báo biến
let string_vietnamese =
    'Tôi trả tiền làm tượng nhưng cũng không hài lòng Anh Tú Thứ năm Chủ khu du lịch An sapa Sa Pa Lào Cai nghĩ cộng đồng mạng nên có cái nhìn chính xác hơn về sự cố liên quan đến tượng Nữ thần Tự do vừa qua Chia sẻ với Zing ông Nguyễn Ngọc Đông chủ khu An sapa thừa nhận rất mệt mỏi trong những ngày qua khi trở thành nạn nhân của cộng đồng mạng';

let string_english =
    'This shows us that the global nature needs our lives in the planet It involved all of us even if in many ways different and unequivocal And in this way it teaches us even more on what we have to do to create a just planet fair and safe from an environmental point of view In brief the Covid pandemic has taught us this interdependence this sharing together';

let language = {
    1: string_vietnamese,
    2: string_english,
};

let time;
let words;
let interval;
let index;
let isPlaying;

languageEl.addEventListener('change', function () {
    init();
});

btnReload.addEventListener('click', function () {
    init();
});

function randomWords(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}

function convertTime(num) {
    let minute = `0${Math.floor(num / 60)}`.slice(-2);
    let second = `0${num % 60}`.slice(-2);
    return `${minute}:${second}`;
}

function highlightWord(index) {
    let spans = document.querySelectorAll('#words span');
    Array.from(spans).map((span) => span.classList.remove('highlight'));
    spans[index].classList.add('highlight');
}

function init() {
    time = 60;
    index = 0;
    isPlaying = false;

    if (interval) {
        clearInterval(interval);
    }

    inputWordEl.disabled = false;
    inputWordEl.value = '';

    // Chọn ngôn ngữ
    let languageValue = languageEl.value;
    words = language[languageValue].toLowerCase().split(' ');

    // Đổi vị trí các từ trong mảng
    words = randomWords(words);

    // Render từ
    renderWords(words);

    // Hiển thị thời gian
    timeEl.innerText = convertTime(time);

    // Highlight từ đầu tiên
    highlightWord(index);
}

inputWordEl.addEventListener('keyup', function (e) {
    if (!isPlaying) {
        interval = setInterval(countdownTime, 1000);
        isPlaying = true;
    }
    // Kiểm tra từ tại thời điểm gõ
    checkCurrentWord(e.target.value.trim(), words[index]);

    if (e.keyCode == 32) {
        // Kiểm tra từ tại thời điểm next
        compareWord(e.target.value.trim(), words[index]);

        // Chuyển sang từ tiếp theo
        index++;
        highlightWord(index);

        e.target.value = '';
    }
});

function checkCurrentWord(inputValue, word) {
    let spans = document.querySelectorAll('#words span');

    // Từ không được bắt đầu bằng value trong ô input
    if (!word.startsWith(inputValue)) {
        spans[index].classList.add('highlight-wrong');
    } else {
        spans[index].classList.remove('highlight-wrong');
    }
}

function compareWord(inputValue, word) {
    let spans = document.querySelectorAll('#words span');
    Array.from(spans).map((span) => span.classList.remove('highlight-wrong'));

    // Từ không được bắt đầu bằng value trong ô input
    if (!word.startsWith(inputValue)) {
        spans[index].classList.add('wrong');
    }

    // Từ được bắt đầu bằng value trong ô input nhưng độ dài khác nhau
    if (word.startsWith(inputValue) && inputValue.length != word.length) {
        spans[index].classList.add('wrong');
    }

    // Từ và value trong ô input giống nhau
    if (inputValue == word) {
        spans[index].classList.add('correct');
    }
}

function countdownTime() {
    time--;
    timeEl.innerText = convertTime(time);

    if (time == 0) {
        clearInterval(interval);
        inputWordEl.disabled = true;
        inputWordEl.value = '';
    }
}

function renderWords(arr) {
    wordsEl.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const w = arr[i];
        wordsEl.innerHTML += `
            <span>${w}</span>
        `;
    }
}

window.onload = init;
