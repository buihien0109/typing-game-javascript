// Truy cập vào các thành phần
const wordsEl = document.querySelector('#words');
const inputWordEl = document.querySelector('#input-word');
const timeEl = document.querySelector('#time');
const btnReload = document.querySelector('.btn-reload');
const languageEl = document.querySelector('#chose-language');

// Thông tin người chơi
const wordsCorrectEl = document.querySelector('.words-correct');
const wordsWrongEl = document.querySelector('.words-wrong');
const wpsCountEl = document.querySelector('.wps-count');
const characterCorrectCountEl = document.querySelector(
    '.character-correct-count'
);
const characterWrongCountEl = document.querySelector('.character-wrong-count');
const characterCountEl = document.querySelector('.character-count');
const percentCorrectEl = document.querySelector('.percent-correct');

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
    time = 10;
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
    if (word.startsWith(inputValue) && inputValue.length < word.length) {
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

        updateInfoPlayer();

        insertInfoPlayerToRanking()
    }
}

function updateInfoPlayer() {
    let spans = document.querySelectorAll('#words span');

    let totalCorrectWords = 0;
    let totalWrongWords = 0;
    let totalCorrectCharacters = 0;
    let totalWrongCharacters = 0;

    for (let i = 0; i < spans.length; i++) {
        // Đếm số từ và ký tự đúng
        if (spans[i].classList.contains('correct')) {
            totalCorrectWords++;
            totalCorrectCharacters += spans[i].innerText.length;
        }
        // Đếm số từ và ký tự sai
        if (spans[i].classList.contains('wrong')) {
            totalWrongWords++;
            totalWrongCharacters += spans[i].innerText.length;
        }
    }
    // Cập nhật số từ đúng - sai
    wordsCorrectEl.innerText = totalCorrectWords;
    wordsWrongEl.innerText = totalWrongWords;
    wpsCountEl.innerText = `${totalCorrectWords + totalWrongWords} WPS`;
    // Cập nhật số ký tự đúng - sai
    characterCorrectCountEl.innerText = totalCorrectCharacters;
    characterWrongCountEl.innerText = totalWrongCharacters;
    characterCountEl.innerText = totalCorrectCharacters + totalWrongCharacters;
    // Cập nhật phần trăm từ gõ chính xác
    percentCorrectEl.innerText = `${(
        (totalCorrectWords * 100) /
        (totalCorrectWords + totalWrongWords)
    ).toFixed(2)}%`;
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

// Mockup rank
// Mock up mảng rank
let ranking = [
    {
        avatar:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmhhJTIwdHJhbmclMjBiZWFjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        username: 'Nguyen Van A',
        wpm: 10,
        time: formatDate(new Date(2021, 3, 27, 11, 33, 30)),
    },
    {
        avatar:
            'https://ec.europa.eu/jrc/sites/jrcsh/files/styles/normal-responsive/public/fotolia-92027264european-day-forest-green-forest.jpg?itok=biCWJPQQ',
        username: 'Tran Van B',
        wpm: 500,
        time: formatDate(new Date(2021, 3, 26, 16, 33, 30)),
    },
    {
        avatar: 'https://ychef.files.bbci.co.uk/624x351/p0973lkk.jpg',
        username: 'Phan Thi C',
        wpm: 151,
        time: formatDate(new Date(2021, 3, 27, 02, 33, 30)),
    },
];

const tableEl = document.querySelector('tbody');

// render ranking
function renderRanking(arr) {
    let arrSort = arr.sort(function (a, b) {
        return b.wps - a.wps;
    });

    tableEl.innerHTML = '';

    for (let i = 0; i < arrSort.length; i++) {
        tableEl.innerHTML += `
		<tr>
			<td>${i + 1}</td>
			<td>
				<img src=${arrSort[i].avatar}
					alt="">
			</td>
			<td>${arrSort[i].username}</td>
			<td class="font-weight-bold">${arrSort[i].wpm}</td>
			<td class="font-italic">${arrSort[i].time}</td>
		</tr>
    `;
    }
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let day = `0${date.getDate()}`.slice(-2);

    let hour = `0${date.getHours()}`.slice(-2);
    let minute = `0${date.getMinutes()}`.slice(-2);
    let second = `0${date.getSeconds()}`.slice(-2);

    return `${hour}:${minute}:${second} - ${day}/${month}/${year}`
}

function insertInfoPlayerToRanking() {
    
}

// Gọi function, truyền vào mảng mock up
renderRanking(ranking);

window.onload = init;
