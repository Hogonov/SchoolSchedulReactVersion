import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ViewPage} from './pages/View/ViewPage'
import {MainPage} from './pages/MainPage'
import {DetailPage} from './pages/User/DetailPage'
import {AuthPage} from './pages/User/AuthPage'
import {AddClassPage} from './pages/Class/AddClassPage'
import {AdminOfficePage} from './pages/Admin/AdminOfficePage'
import {AddSchoolPage} from "./pages/School/AddSchoolPage";
import {UsersPage} from "./pages/User/UsersPage";
import {AddUserPage} from "./pages/User/AddUserPage";
import {EditorPage} from "./pages/EditorPage";
import {AddTimePage} from "./pages/Time/AddTimePage";
import {AllAnnouncementPage} from "./pages/Announcement/AllAnnouncementPage";
import {AddAnnouncementPage} from "./pages/Announcement/AddAnnouncementPage";
import {DetailAnnouncementPage} from "./pages/Announcement/DetailAnnouncementPage";
import {SelectViewPage} from "./pages/View/SelectViewPage";
import {AddDirPage} from "./pages/Dir/AddDirPage";
import {AddAdPage} from "./pages/Ad/AddAdPage";
import {AdListPage} from "./pages/Ad/AdListPage";


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
                    <AddClassPage/>
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
                    <AdListPage/>
                </Route>
                <Route path="/add_new_ad" exact>
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
