import {UserList, Layout, UserModal, CreateTask, TaskList} from './app/component'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

const App = () => {

    const auth = JSON.parse(localStorage.getItem('auth'));

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={auth?.isAuth ? <Navigate to="/home" /> : <UserModal />} />
                    <Route path="/home" element={auth?.isAuth ? <Layout Data={UserList} /> : <Navigate to="/" />} />
                    <Route path="/create/task" element={auth?.isAuth ? <Layout Data={CreateTask} /> : <Navigate to="/" />} />
                    <Route path="/task/list" element={auth?.isAuth ? <Layout Data={TaskList} /> : <Navigate to="/" />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
