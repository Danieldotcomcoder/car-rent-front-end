import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import NewReservation from './components/Reservations/NewReserve';
import NewCar from './components/cars/newcar';
import fetchAllCars from './Redux/cars/fetch/fetchcars';
import DOWN from './assets/images/down.png';
import './app.css';

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.current_user);
  let userPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYOyr5Ec8JLXH9PnLVHZ2QKcW43XQs47vnQ&usqp=CAU';
  if (currentUser.photo) {
    userPhoto = currentUser.photo;
  }
  const adjustSize = () => {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.menu-icon');
    const profile = document.querySelector('.profile-icon');
    const w = window.innerWidth;
    if (w >= 1024) {
      header.style.padding = '1.25% 0';
      menu.style.display = 'none';
      header.style.justifyContent = 'flex-end';
      profile.style.width = '4%';
    }
  };
  const profileMenu = (e) => {
    let { target } = e;
    while (target.className !== 'profile-icon') {
      target = target.parentNode;
    }
    let signOut = document.querySelector('.sign-out-wrapper');
    if (!signOut) {
      const div = document.createElement('div');
      div.className = 'sign-out-wrapper';
      div.innerHTML = `<p class='sign-in-as'> Signed in as </p><p class='user-name'>${currentUser.username}</p><hr/><a href="/" class="sign-out">Sign out</a>`;
      const wrapper = document.querySelector('.wrapper-app');
      wrapper.appendChild(div);
      wrapper.zIndex = 1;
      div.zIndex = 999;
    }
    signOut = document.querySelector('.sign-out-wrapper');
    signOut.style.display = 'flex';
    const leaveBtn = document.querySelector('.sign-out');
    leaveBtn.addEventListener('click', () => {
      localStorage.clear();
      dispatch({
        type: 'LOGOUT',
      });
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.profile-icon')) {
        return;
      }
      if (e.target.closest('.sign-out-wrapper')) {
        return;
      }
      signOut.style.display = 'none';
    });
  };
  useEffect(() => dispatch(thunkUser()), []);
  useEffect(() => dispatch(fetchAllCars()), []);
  useEffect(() => adjustSize());
  return (
    <div className="wrapper-app">
      <header
        className="header"
        style={{
          display: session ? 'flex' : 'none',
          backgroundColor: 'rgb(152, 191, 25)',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5% 0',
        }}
      >

        <div className="dropdown menu-icon">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
            <li><a className="dropdown-item active" href="/">All Cars</a></li>
            <li><a className="dropdown-item" href="/Reserve">Reserve</a></li>
            <li><a className="dropdown-item" href="/Myreservation">My Reservations</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/NewCar">Add a Car</a></li>
            <li className="dropdown-item">Delete a Car</li>
          </ul>
        </div>
        <div
          className="profile-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '2.5%',
            width: '10%',
          }}
          onClick={profileMenu}
          onKeyDown={profileMenu}
          aria-hidden="true"
        >
          <img
            src={userPhoto}
            className="user-photo"
            alt="profile"
            width="75%"
            style={{
              border: '1px solid rgb(152, 191, 25)',
              borderRadius: '50%',
              height: '32px',
            }}
          />
          <img src={DOWN} className="down-option" alt="account-option" width="25%" height="8px" />
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Details" element={<Detail />} />
          <Route path="/Myreservations" element={<MyReservations />} />
          <Route path="/Newcar" element={<NewCar />} />
          <Route path="/Reserve" element={<NewReservation />} />
          <Route path="/Detail" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
