import { Data } from './data.js'

// querySelector
const summaryBtn = document.querySelector('.summary');
const skillsBtn = document.querySelector('.skills');
const experienceBtn = document.querySelector('.experience');
const projectsBtn = document.querySelector('.projects');

const frontDiv = document.getElementById('front');
const backDiv = document.getElementById('back');

const backContent = document.querySelector('.back__content');

// EventListener
summaryBtn.addEventListener('click', () => { showContent('summary') });
skillsBtn.addEventListener('click', () => { showContent('skills') });
experienceBtn.addEventListener('click', () => { showContent('experience') });
projectsBtn.addEventListener('click', () => { showContent('projects') });

// tạo content ứng với mỗi link và thực hiện animation
function showContent(type) {
    // xóa các elements đc tạo trước đó khi nhấn vào link => sau đó tiếp tục tạo lại elements
    backContent.innerHTML = "";

    // rotate khi click vào link
    frontDiv.style.transform = `rotateY(180deg)`;
    backDiv.style.transform = `rotateY(360deg)`;

    // tiêu đề + nút back
    const title = document.createElement('h1');
    title.innerText = type;

    const backBtn = document.createElement('div');
    backBtn.classList.add('back-btn');
    backBtn.innerHTML = `<i class="fa fa-backward"></i>
    <span>Back</span>`;

    // append tiêu đề vào div back__content
    backContent.appendChild(title);

    // tạo element ứng với mỗi type => append element vào back__content
    handleTypeRecognize(type);

    // append nút back vào div back__content
    backContent.appendChild(backBtn);


    // thư viện aniamte
    VanillaTilt.init(document.querySelectorAll(".back__item"), {
        max: -10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });

    // clear timeout để xóa delay 
    //(nếu chưa đến hạn 1s mà tiếp tực nhấn vào link sẽ bị mất nội dung vì đã setTimeout clear nội dung)
    stopDelay();

    // dom tới nút back đã đc tạo phía trước để addEventListener
    const backWard = document.querySelector('.back-btn');
    backWard.addEventListener('click', onBackButton);
}

function onBackButton(type) {
    // rotate theo chiều ngược lại
    //console.log('back')
    frontDiv.style.transform = `rotateY(360deg)`;
    backDiv.style.transform = `rotateY(180deg)`;

    // xóa phần tử con khi back lại, tránh trường hợp tạo thêm phần tử mới
    clearContent();
}

var timer;

function clearContent() {
    // xóa content sau delay 1s ứng với transition hiệu ứng 1s
    timer = setTimeout(function() { backContent.innerHTML = ""; }, 1000);
}

function stopDelay() {
    clearTimeout(timer);
}



// function phân loại data dựa vào type
function handleTypeRecognize(type) {
    let data = Data;
    let list = "";
    let item = 0;
    let contentDiv = document.createElement('div');
    switch (type) {
        case 'summary':
            const summaryData = data.summaryData;
            contentDiv.classList.add('summary');
            for (item of summaryData) {
                list += `<div class="back__item">
                <div class="item-image">
                    <img src=${item.img} alt="img1">
                </div>
                <div class="item-content">
                    <h3>${item.content}</h3>
                </div>
            </div>`
            }
            contentDiv.innerHTML = list;
            backContent.appendChild(contentDiv);
            break;
        case 'skills':
            const skillsData = data.skillsData;
            contentDiv.classList.add('skills');
            for (item of skillsData) {
                list += `<div class="back__item">
                <div class="item-image">
                    <img src=${item.img} alt="img1">
                </div>
                <div class="item-content">
                    <h3>${item.skill}</h3>
                </div>
            </div>`
            }
            contentDiv.innerHTML = list;
            backContent.appendChild(contentDiv);
            break;
        case 'experience':
            const experienceData = data.experienceData;
            //console.log(experienceData);
            contentDiv.classList.add('experience');
            for (item of experienceData) {
                list += `<div class="back__item">
                <div class="item-content">
                    <h3>${item}</h3>
                </div>
            </div>`
            }
            contentDiv.innerHTML = list;
            backContent.appendChild(contentDiv);
            break;
        case 'projects':
            const projectsData = data.projectsData;
            //console.log(projectsData);
            contentDiv.classList.add('projects');
            for (item of projectsData) {
                list += `<div class="back__item">
                <div class="item-content">
                    <h3>${item.name}</h3>
                    ${item.inspiredBy ? `<p>Inspired by <b>${item.inspiredBy}</b></p>` : ""}
                    <div class="project-link">
                    ${item.link ? `<a class="link" href=${item.link} target='_blank'>
                    <span></span>
		            <span></span>
		            <span></span>
		            <span></span>
                    <i>View project</i></a>` : ""}
                    </div>
                </div>
            </div>`
            }
            contentDiv.innerHTML = list;
            backContent.appendChild(contentDiv);
            break;
        default:
            return;
    }
}