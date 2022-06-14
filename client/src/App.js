import {UserList, Layout, UserModal, CreateTask, TaskList,UpdateTask } from './app/component'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {NotificationContainer} from 'react-notifications';

const App = () => {

    const auth = JSON.parse(localStorage.getItem('auth'));

    return (
        <div className="App">
            <NotificationContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={auth?.isAuth ? <Navigate to="/home" /> : <UserModal />} />
                    <Route path="/home" element={auth?.isAuth ? <Layout Data={UserList} /> : <Navigate to="/" />} />
                    <Route path="/create/task" element={auth?.isAuth ? <Layout Data={CreateTask} /> : <Navigate to="/" />} />
                    <Route path="/task/update/:taskID" element={auth?.isAuth ? <Layout Data={UpdateTask} /> : <Navigate to="/" />} />
                    <Route path="/task/list" element={auth?.isAuth ? <Layout Data={TaskList} /> : <Navigate to="/" />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
