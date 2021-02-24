
var randomNumber = Math.floor(Math.random() * 100) + 1; //수학적 알고리즘을 통해 1~100 사이의 임의의 수 지정

//각각 HTML에서 결과 문장을 저장하는 기준이고, 코드상에서 문장에 추가되도록 사용된다
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

//다음의 입력과 버튼을 받고, 추측값을 또 받도록 함
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1; //추측개수
var resetButton; //아직은 있지 않은 버튼 리셋 변수,,

function checkGuess() {
    var userGuess = Number(guessField.value); //Number 메소드로 텍스트 필드에서 입력된 값들을 userGuess로 지정

    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';

    
    if (userGuess === randomNumber){
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    } else { //사용자추측과 랜덤숫자가 맞지 않고 추측회수가 10번이 넘지 않았을 때
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus(); //커서
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true; //비활성화
    guessSubmit.disabled = true; //비활성화
    resetButton = document.createElement('button'); //새로운 버튼 추가
    resetButton.textContent = 'Start new game'; 
    document.body.appendChild(resetButton);// 새버튼을 HTML 아래쪽에 추가하도록 한다.
    resetButton.addEventListener('click', resetGame); 
    // 새 버튼으로 하여금 이벤트 리스너를 지정하여 
    //클릭되면 resetGame() 함수가 실행되도록 한다.
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    //const 선언은 블록 범위의 상수를 선언합니다. 
    //상수의 값은 재할당할 수 없으며 다시 선언할 수도 없습니다.
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = ''; //표시된 정보 모두 초기화
    }

    resetButton.parentNode.removeChild(resetButton); //초기화버튼 제거
    guessField.disabled = false; //활성화
    guessSubmit.disabled = false; //활성화
    guessField.value = ''; //추측값 제거
    guessField.focus(); //텍스트에 커서 
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1; //다시 1~100사이의 랜덤값 추출
}