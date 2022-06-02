import logo from '../../AgUSD.svg';
import '../../App.css';

function Withdraw() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{
          maxWidth: '50vw'
        }}>
          AgUSD was created by an anonymous team of developers to allow anyone, anywhere to exit positions into a stable asset.<br /><a href="https://twitter.com/Aggregated_">Twitter</a>
        </p>
      </header>
    </div>
  );
}

export default Withdraw;
