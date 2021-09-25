import './App.css';
import Main from './pages/main';
import { Provider } from 'react-redux'
import { createReduxStore } from './redux';

function App() {
  return (
    <Provider store={createReduxStore()}>
      <Main />
    </Provider>
  )
}

export default App;
