// Truy cập vào các thành phần
const wordsEl = document.querySelector('#words');
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

let words;
let index;

// Thay đổi ngôn ngữ
languageEl.addEventListener('change', function () {
    init();
});

// Đổi vị trí các phần tử trong mảng
function randomWords(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}

// Highlight từ dựa vào index
function highlightWord(index) {
    let spans = document.querySelectorAll('#words span');
    Array.from(spans).map((span) => span.classList.remove('highlight'));
    spans[index].classList.add('highlight');
}

// Khởi tạo game
function init() {
    index = 0;

    // Chọn ngôn ngữ
    let languageValue = languageEl.value;
    words = language[languageValue].toLowerCase().split(' ');

    // Đổi vị trí các từ trong mảng
    words = randomWords(words);

    // Render từ
    renderWords(words);

    // Highlight từ đầu tiên
    highlightWord(index);
}

// Hiển thị các từ lên trên giao diện
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
