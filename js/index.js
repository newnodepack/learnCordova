// id 대상과 연결
const search_icon = document.getElementById(`index_1_search_icon`);
search_icon.addEventListener(`click`,() => {
    alert(`검색하기 영역 클릭`);
});

// class 대상과 연결
const page_texts = document.getElementsByClassName(`index_2_big_text`);
for(let i=0; i<page_texts.length; i++){
    page_texts[i].addEventListener(`click`,() => {
        alert(`${i} 번 글자를 클릭`);
    });
}

// 슬라이드 배너
const banner_frame = document.getElementById(`index_slide_banner_frame`);
const count = document.getElementsByClassName(`index_slide_image_frame`);
const banner_index = document.getElementById(`index_slide_number_now`);
let now_index = 1;
const image_count = count.length;

// 이미지 이동 함수
const move_banner = (number) => {
    now_index = now_index + number;

    if(now_index > image_count){
        now_index = 1;
    } else if(now_index < 1){
        now_index = image_count;
    }
    banner_index.innerText = now_index;

    if(number == -1){
        banner_frame.classList.toggle(`slide_action_bw`);
        setTimeout(()=>{
            banner_frame.prepend(count[image_count-1]);
            banner_frame.classList.toggle(`slide_action_bw`);
        },600);
    } else {
        banner_frame.classList.toggle(`slide_action_fw`);
        setTimeout(()=>{
            banner_frame.append(count[0]);
            banner_frame.classList.toggle(`slide_action_fw`);
        },600);
    }
};

// 3초에 한번씩 이미지 이동하도록 설정
let interval = setInterval(()=>{
    move_banner(-1);
}, 3000);


let start_point;

//터치를 지원하지 않는 PC 전용 
banner_frame.addEventListener(`dragstart`, (event) => {
    start_point = event.pageX;
});

banner_frame.addEventListener(`dragend`, (event) => {
    const end_point = event.pageX;
    const calculate = end_point - start_point;

    clearInterval(interval);
    if (calculate > 0) {
        //우측으로 드래그 했을 때
        move_banner(-1);
    } else if (calculate < 0) {
        //좌측으로 드래그 했을 때
        move_banner(1);
    }
    interval = setInterval(()=>{
        move_banner(1);
    }, 3000);
});

//터치를 지원하는 모바일, 태블릿 전용 
banner_frame.addEventListener(`touchstart`, (event) => {
    start_point = event.touches[0].clientX;
});

banner_frame.addEventListener(`touchend`, (event) => {
    const end_point = event.changedTouches[0].clientX;
    const calculate = end_point - start_point;

    clearInterval(interval);
    if (calculate > 0) {
        //우측으로 드래그 했을 때
        move_banner(-1);
    } else if (calculate < 0) {
        //좌측으로 드래그 했을 때
        move_banner(1);
    }
    interval = setInterval(()=>{
        move_banner(1);
    }, 3000);
});

// 이미지 업로드
const img_preview = document.getElementById(`index_5_image_preview`);
const img_input = document.getElementById(`index_5_file_input`);

img_input.addEventListener(`change`,(event)=>{
    const file_array = event.target.files;

    for(let i=0; i<file_array.length; i++){
        console.log(file_array[i]);
        let makeImg = document.createElement(`img`);
        makeImg.className = `index_5_image_tag`;
        const reader = new FileReader();

        if (file_array[i]) {
            reader.readAsDataURL(file_array[i]);
        } else {
            makeImg.src = "";
        }

        reader.onloadend = () => {
            makeImg.src = reader.result;
            img_preview.append(makeImg);
        };
    }
});

// 팝업 닫기
const close_popup = document.getElementById(`index_popup_1_close`);

close_popup.addEventListener(`click`,() => {
    const popup_bg = document.getElementById(`index_popup_1_bg`);
    popup_bg.classList.toggle(`hidden_space`);
});


const send_button = document.getElementById(`index_5_data_send`);
const word_input = document.getElementById(`index_5_text_input`);

send_button.addEventListener(`click`,()=>{
    const data = {
        words: word_input.value,
    };

    fetch(`https://prefab-range-407105.du.r.appspot.com`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.result);
    })
    .catch(error => {
        console.error(`전송 오류:`, error)
    });
});

document.addEventListener(`deviceready`, onDeviceReady, false);
// 스마트폰 사용 기능 준비가 완료되면 이벤트 연결

function onDeviceReady() {
    const call_camera = document.getElementById(`index_6_call_camera`);
    call_camera.addEventListener(`click`,()=>{
        navigator.camera.getPicture(()=>{
            // 사진 찍고 난 후
            alert(`촬영 성공`);
        }, ()=>{
            // 사진을 찍지 않고 나왔을 때
            alert(`촬영 실패`)
        });
    });
};


