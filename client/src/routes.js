import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ViewPage} from './pages/View/ViewPage'
import {UserDashboardPage} from './pages/UserDashboard/UserDashboardPage'
import {DetailPage} from './pages/User/DetailPage'
import {AuthPage} from './pages/User/AuthPage'
import {AddClassPage} from './pages/Class/AddClassPage'
import {AdminOfficePage} from './pages/Admin/AdminOfficePage'
import {UsersPage} from "./pages/User/UsersPage";
import {AddUserPage} from "./pages/User/AddUserPage";
import {EditorPage} from "./pages/Editor/EditorPage";
import {AddTimePage} from "./pages/Time/AddTimePage";
import {ListAnnouncementPage} from "./pages/Announcement/ListAnnouncementPage";
import {AddAnnouncementPage} from "./pages/Announcement/AddAnnouncementPage";
import {DetailAnnouncementPage} from "./pages/Announcement/DetailAnnouncementPage";
import {SelectViewPage} from "./pages/View/SelectViewPage";
import {AddDirPage} from "./pages/Dir/AddDirPage";
import {AddAdPage} from "./pages/Ad/AddAdPage";
import {AdListPage} from "./pages/Ad/AdListPage";
import {AddYearSchoolPage} from "./pages/YearSchool/AddYearSchoolPage";
import {EditorSpecialCoursePage} from "./pages/EditorSpecialCoursePage/EditorSpecialCoursePage";


export const useRoutes = (isAuthenticated, userRole) => {
    if (userRole === 'ROLE_ADMIN') {
        return (
            <Switch>
                <Route path="/view/:id" exact>
                    <ViewPage/>
                </Route>
                <Route path="/select_view" exact>
                    <SelectViewPage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Route path="/announcement" exact>
                    <ListAnnouncementPage/>
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
                <Redirect to="/office_admin" exact/>
            </Switch>
        )
    } else if(isAuthenticated){
        return (
            <Switch>
                <Route path="/view/:id" exact>
                    <ViewPage/>
                </Route>
                <Route path="/select_view" exact>
                    <SelectViewPage/>
                </Route>
                <Route path="/main" exact>
                    <UserDashboardPage/>
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage/>
                </Route>
                <Route path="/announcement" exact>
                    <ListAnnouncementPage/>
                </Route>
                <Route path="/add_new_announcement" exact>
                    <AddAnnouncementPage/>
                </Route>
                <Route path="/detail_announcement/:id" exact>
                    <DetailAnnouncementPage/>
                </Route>
                <Route path="/editor" exact>
                    <EditorPage/>
                </Route>
                <Route path="/add_data" exact>
                    <AddClassPage/>
                </Route>
                <Route path="/add_time" exact>
                    <AddTimePage/>
                </Route>
                <Route path="/dir" exact>
                    <AddDirPage/>
                </Route>
                <Route path="/add_new_year" exact>
                    <AddYearSchoolPage/>
                </Route>
                <Route path="/editor_special_course" exact>
                    <EditorSpecialCoursePage/>
                </Route>
                <Redirect to="/main" exact/>
            </Switch>
        );
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
