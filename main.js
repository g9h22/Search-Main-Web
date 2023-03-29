const ampm = document.querySelector(".ampm");
const time = document.querySelector(".time");
const date = document.querySelector(".date");

function getToday() {
  const newDate = new Date();
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  const day = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const year = String(newDate.getFullYear());

  // if (newDate.getHours() > 12) {
  //   const pmHours = String(newDate.getHours() - 12).padStart(2, "0");
  //   time.innerText = `${pmHours}:${minutes}:${seconds}`;
  //   ampm.innerText = `PM`;
  // } else {
  //   ampm.innerText = "AM";
  //   time.innerText = `${hours}:${minutes}:${seconds}`;
  // }
  time.innerText = `${hours}:${minutes}:${seconds}`;
  date.innerText = `${year}.${month}.${day}`;
}

getToday();
setInterval(getToday, 1000);

function onClickToggleNft(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");
  if (value) {
    nft.style.display = "inline-block";
    // nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    // nftView.style.display = "inline-block";
  }
}

function onClickToggleMemo(value) {
  const toDo = document.querySelector(".toDoSet");
  const memoView = document.querySelector(".memoView");
  if (value) {
    toDo.style.display = "inline-block";
    // memoView.style.display = "none";
  } else {
    toDo.style.display = "none";
    // memoView.style.display = "inline-block";
  }
}

function onClickToggleWeather(value) {
  const weather = document.querySelector(".weather");
  const weatherView = document.querySelector(".weatherView");
  if (value) {
    weather.style.display = "inline-block";
    // weatherView.style.display = "none";
  } else {
    weather.style.display = "none";
    // weatherView.style.display = "inline-block";
  }
}

const LIST = "list";
function getToDoList() {
  const toDo = document.querySelector(".toDo");
  let savedList = localStorage.getItem(LIST);

  if (!savedList) {
    localStorage.setItem(
      LIST,
      JSON.stringify(["BlockChain 강의", "React 강의", "TIL작성"])
    );
    savedList = localStorage.getItem(LIST);
  }
  let listArray = JSON.parse(savedList);
  // const ulElFirst = `<ul>`;
  // const ulElLast = `</ul>`;

  const liElFirst = `<li>`;
  const liElLast = `</li>`;

  const liArray = listArray.map((v) => {
    return `${liElFirst}${v}${liElLast}`;
  });

  toDo.innerHTML = liArray;
}
getToDoList();

function onClickNew() {
  const newToDo = document.querySelector(".newToDo");
  newToDo.style.display = "inline-block";
}

function onClickRegister() {
  const toDo = document.querySelector(".toDo");
  const newList = document.querySelector(".newList");
  const newToDo = document.querySelector(".newToDo");
  let savedList = localStorage.getItem(LIST);

  if (!newList.value) {
    alert("할 일을 입력해주세요!");
    return;
  }

  let ListArray = JSON.parse(savedList);
  ListArray.push(newList.value);
  localStorage.setItem(LIST, JSON.stringify(ListArray));

  const liElFirst = `<li>`;
  const liElLast = `</li>`;

  const liArray = ListArray.map((v) => {
    return `${liElFirst}${v}${liElLast}`;
  });

  toDo.innerHTML = liArray;

  newToDo.style.display = "none";
  newList.value = "";
}

let isLoading = false;

async function onClickGpt() {
  const searchInput = document.querySelector(".search");
  const searchResult = document.querySelector(".result");
  if (!searchInput.value) {
    alert("검색할 내용을 입력하세요");
    return;
  }
  if (isLoading) return;

  isLoading = true;
  const question = searchInput.value;
  searchInput.value = "검색 중 입니다. 잠시만 기다려 주세요.";
  //서버에 접속 요청
  console.log("작동중");
  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question: question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }
  searchInput.value = "";
  isLoading = false;
}

// const API_KEY = "";
const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemp = document.querySelector(".weatherTemp");

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    // http 요청 promis 사용 - Fetch사용해서 비동기화
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        weatherTemp.innerText =
          data.name + ", " + parseInt(data.main.temp) + "°C";

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      });
  },
  () => alert("Not allowed!")
);
