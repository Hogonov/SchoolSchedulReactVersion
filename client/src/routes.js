import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ViewPage} from './pages/View/ViewPage'
import {UserDashboardPage} from './pages/UserDashboard/UserDashboardPage'
import {AuthPage} from './pages/Auth/AuthPage'
import {AddClassAndSubjectPage} from './pages/ClassAndSubjects/AddClassAndSubjectPage'
import {AdminOfficePage} from './pages/Admin/AdminOfficePage'
import {UsersPage} from "./pages/User/UsersPage";
import {EditorPage} from "./pages/Editor/EditorPage";
import {AddTimePage} from "./pages/Time/AddTimePage";
import {AnnouncementsPage} from "./pages/Announcement/AnnouncementsPage";
import {SelectViewPage} from "./pages/View/SelectViewPage";
import {AddDirPage} from "./pages/Dir/AddDirPage";
import {AddAdPage} from "./pages/Ad/AddAdPage";
import {AdListPage} from "./pages/Ad/AdListPage";
import {AddYearSchoolPage} from "./pages/YearSchool/AddYearSchoolPage";
import {EditorSpecialCoursePage} from "./pages/EditorSpecialCoursePage/EditorSpecialCoursePage";
import {SelectTheme} from "./pages/SelectTheme/SelectTheme";


export const useRoutes = (isAuthenticated, userRole) => {
    if (userRole === 'ROLE_ADMIN') {
        return (
            <Switch>
                <Route path="/view/:id" exact>
                    <ViewPage/>
                </Route>
                <Route path="/select_theme" exact>
                    <SelectTheme/>
                </Route>
                <Route path="/select_view" exact>
                    <SelectViewPage/>
                </Route>
                <Route path="/announcement" exact>
                    <AnnouncementsPage/>
                </Route>
                <Route path="/editor" exact>
                    <EditorPage/>
                </Route>
                <Route path="/add_data" exact>
                    <AddClassAndSubjectPage/>
                </Route>
                <Route path="/office_admin" exact>
                    <AdminOfficePage/>
                </Route>
                <Route path="/users" exact>
                    <UsersPage/>
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
                <Route path="/add_new_ad" exact>
                    <AddAdPage/>
                </Route>
                <Route path="/editor_special_course" exact>
                    <EditorSpecialCoursePage/>
                </Route>
                <Route path="/add_new_year" exact>
                    <AddYearSchoolPage/>
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
                <Route path="/select_theme" exact>
                    <SelectTheme/>
                </Route>
                <Route path="/select_view" exact>
                    <SelectViewPage/>
                </Route>
                <Route path="/main" exact>
                    <UserDashboardPage/>
                </Route>
                <Route path="/announcement" exact>
                    <AnnouncementsPage/>
                </Route>
                <Route path="/editor" exact>
                    <EditorPage/>
                </Route>
                <Route path="/add_data" exact>
                    <AddClassAndSubjectPage/>
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
            <Route path="/login" exact>
                <AuthPage/>
            </Route>
            <Route path="/select_view" exact>
                <SelectViewPage/>
            </Route>
            <Route path="/view/:id" exact>
                <ViewPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
};
