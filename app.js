const query = document.getElementById("search")
const submitBtn = document.getElementById('submit')
const BASE_URL = 'http://localhost:5000/api/dicts'

function checkIfStringHasSpecialCharacters(str) {
    const re = /[-=+#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]/;
    return re.test(str);
}

function checkIfStringHasNumbers(str) {
    return /\d/.test(str);
}

function checkIfStringHasLetters(str) {
    return /[a-z]/i.test(str);
}

// 검색 버튼 활성화
function ableSubmitBtn(state) { 
    submitBtn.abled = state
}

// 서버 데이터 가져오기
function getData(baseUrl, query){
    ableSubmitBtn(false)
    // 사용자 유효성 검증
    if(checkIfStringHasSpecialCharacters(query)){
        ableSubmitBtn(true)
        container.innerHTML = "검색한 단어에 특수문자가 포함되어 있습니다."
        return;
    }
    if(checkIfStringHasNumbers(query)){
        ableSubmitBtn(true)
        container.innerHTML = "검색한 단어에 숫자가 포함되어 있습니다."
        return;
    }
    
    if(checkIfStringHasLetters(query)){
        ableSubmitBtn(true)
        container.innerHTML = "검색한 단어에 영어가 포함되어 있습니다."
        return;
    }

    fetch(`${baseUrl}/${query}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( res => res.json() )
    .then( data => {
        // 검색 버튼 활성화
        ableSubmitBtn(true)
        console.log(data)
        const {dicts} = data;
        
        // 데이터 유효성 검증
        if(dicts.length === 0){
            container.innerHTML = "검색된 단어가 없습니다."
            return;
        }

        const template = dicts.map(dict => {
            return (
            `
                <div class="item">
                    <div class="word">${dict.r_word}
                        <sup class="seq">${dict.r_seq != undefined ? dict.r_seq : ""}</sup>
                        <div class="hanja">${dict.r_hanja != undefined ? dict.r_hanja : ""}</div>
                        <div class="pos">${dict.r_pos}</div>
                    </div>
                    
                    <p class="description">${dict.r_des}</p>
                </div>
            `
            )         
        })
        container.innerHTML = template.join("");
    })
}

submitBtn.addEventListener("click", function(){
    console.log(query.value)
    getData(BASE_URL, query.value)
})
query.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        getData(BASE_URL, query.value)
    }
})
window.addEventListener('DOMContentLoaded', function(){
    getData(BASE_URL, query.value)
})