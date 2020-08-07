import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ViewPage} from './pages/ViewPage'
import {MainPage} from './pages/MainPage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {AddDataPage} from './pages/AddDataPage'
import {AdminOfficePage} from './pages/AdminOfficePage'
import {AddSchoolPage} from "./pages/AddSchoolPage";
import {UsersPage} from "./pages/UsersPage";
import {AddUserPage} from "./pages/AddUserPage";
import {EditorPage} from "./pages/EditorPage";
import {AddTimePage} from "./pages/AddTimePage";
import {AllAnnouncementPage} from "./pages/AllAnnouncementPage";
import {AddAnnouncementPage} from "./pages/AddAnnouncementPage";
import {DetailAnnouncementPage} from "./pages/DetailAnnouncementPage";
import {SelectViewPage} from "./pages/SelectViewPage";
import {AddDirPage} from "./pages/AddDirPage";
import {AddAdPage} from "./pages/AddAdPage";


export const useRoutes = (isAuthenticated, userRole) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/view/:id" exact>
                    <ViewPage/>
                </Route>
                <Route path="/select_view" exact>
                    <SelectViewPage/>
                </Route>
                <Route path="/main" exact>
                    <MainPage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Route path="/announcement" exact>
                    <AllAnnouncementPage/>
                </Route>
                <Route path="/add_new_announcement" exact>
                    <AddAnnouncementPage/>
                </Route>
                <Route path="/detail_announcement/:id" exact>
                    <DetailAnnouncementPage/>
                </Route>
                <Route path="/add_new_user" exact>
                    <AddUserPage/>
                </Route>
                <Route path="/editor" exact>
                    <EditorPage/>
                </Route>
                <Route path="/add_data" exact>
                    <AddDataPage/>
                </Route>
                <Route path="/office_admin" exact>
                    <AdminOfficePage/>
                </Route>
                <Route path="/users" exact>
                    <UsersPage/>
                </Route>
                <Route path="/detail_user/:id" exact>
                    <DetailPage/>
                </Route>
                <Route path="/add_time" exact>
                    <AddTimePage/>
                </Route>
                <Route path="/dir" exact>
                    <AddDirPage/>
                </Route>
                <Route path="/ad" exact>
                    <AddAdPage/>
                </Route>
                <Redirect to="/main" exact/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route path="/select_view" exact>
                <SelectViewPage/>
            </Route>
            <Route path="/view/:id" exact>
                <ViewPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
