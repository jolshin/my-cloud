import Header from "../components/Header";

function Welcome() {
  return (
    <div>
      <Header method="welcome" />
      <div className="welcome-wrapper">
        <span>Добро пожаловать!</span>
        <p className="mox">MOX</p>
        <span>Моё облачное хранилище</span><br />
        <span>загружай, качай, делись</span>
      </div>
    </div>
  );
}

export default Welcome;
