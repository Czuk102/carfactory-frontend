import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";
import Warehouse from "./routes/Warehouse";
import {Form} from "./routes/Form";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>

                <Route path="login" element={<Login/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="warehouse" element={<Warehouse/>}/>
                    <Route path="create" element={<Form/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;