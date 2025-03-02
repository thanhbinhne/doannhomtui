function showPage(page) {
    if (page === 'giaoduc') {
        loadEducationNews();
    }
}

// Câu 8: Tin tức giáo dục
function showEducationNews() {
    document.getElementById('newsContent').style.display = 'block';
    loadEducationNews();
}

function loadEducationNews() {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = 'https://vnexpress.net/rss/giao-duc.rss';
    const url = proxyUrl + encodeURIComponent(targetUrl);

    fetch(url)
        .then(response => response.json())
        .then(data => parseRSS(data.contents))
        .catch(error => {
            document.getElementById('newsList').innerHTML = `<li>Lỗi tải dữ liệu: ${error}</li>`;
        });
}

function parseRSS(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    const items = xml.querySelectorAll('item');
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // Clear dữ liệu cũ

    items.forEach((item, index) => {
        if (index < 5) { // Lấy 5 tin đầu tiên
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><a href="${link}" target="_blank">${title}</a></td>
            `;
            newsList.appendChild(row);
        }
    });
}




// Câu 10: Div tự động di chuyển
function moveDiv() {
    let div = document.getElementById("movingDiv");
    let pos = 0;
    let direction = 1;

    setInterval(() => {
        pos += direction;
        div.style.top = pos + "px";

        if (pos >= window.innerHeight - div.offsetHeight || pos <= 0) {
            direction *= -1;  // Đảo ngược hướng
        }
    }, 20);
}

window.onload = moveDiv;
